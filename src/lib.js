import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

// ---------- Supabase (null when not configured => local-only mode) ----------
export const supa =
  SUPABASE_URL && SUPABASE_ANON_KEY ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

// ---------- auth-redirect token capture ----------
// Email links (password recovery, signup confirmation) return with tokens in the URL
// fragment: '#access_token=…&type=recovery'. HashRouter normalizes that fragment and
// supabase-js parses it asynchronously — a race that loses the tokens. So: grab them
// synchronously at module load (before the router exists), set the session explicitly,
// and rewrite the URL to the right page ourselves.
if (typeof window !== 'undefined' && supa) {
  const h = window.location.hash.replace(/^#\/?/, '');
  if (h.includes('access_token=')) {
    const p = new URLSearchParams(h);
    const access_token = p.get('access_token');
    const refresh_token = p.get('refresh_token');
    const isRecovery = p.get('type') === 'recovery';
    history.replaceState(null, '', window.location.pathname + (isRecovery ? '#/reset' : '#/'));
    if (access_token && refresh_token) {
      supa.auth.setSession({ access_token, refresh_token });
    }
  }
}

// ---------- Progress store (localStorage + optional cloud sync) ----------
const LS_KEY = 'inb.progress';
let state = {};
try {
  state = JSON.parse(localStorage.getItem(LS_KEY) || '{}');
} catch {
  state = {};
}
const listeners = new Set();

function persistLocal() {
  localStorage.setItem(LS_KEY, JSON.stringify(state));
}

let saveTimer = null;
let cloudUser = null;

async function pushCloud() {
  if (!supa || !cloudUser) return;
  await supa.from('progress').upsert({
    user_id: cloudUser.id,
    email: cloudUser.email ?? null, // shown in the admin user list
    data: state,
    updated_at: new Date().toISOString(),
  });
}

export function setP(key, value) {
  state = { ...state, [key]: value };
  persistLocal();
  listeners.forEach((fn) => fn());
  clearTimeout(saveTimer);
  saveTimer = setTimeout(pushCloud, 1500);
}

export function getP(key, fallback = null) {
  return key in state ? state[key] : fallback;
}

export function getAll() {
  return state;
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

// Merge cloud data on login: keep best exam scores, union the rest.
function mergeProgress(cloud) {
  const merged = { ...cloud, ...state };
  for (const k of Object.keys(cloud)) {
    if (k.startsWith('exam:') && state[k] && cloud[k]) {
      merged[k] = cloud[k].s > state[k].s ? cloud[k] : state[k];
    }
    if (k === 'fc' && state.fc) {
      merged.fc = { ...cloud.fc, ...state.fc };
    }
  }
  state = merged;
  persistLocal();
  listeners.forEach((fn) => fn());
}

export async function onLogin(user) {
  cloudUser = user;
  if (!supa || !user) return;
  const { data } = await supa.from('progress').select('data').eq('user_id', user.id).maybeSingle();
  if (data?.data) mergeProgress(data.data);
  pushCloud();
}

export function onLogout() {
  cloudUser = null;
}

// ---------- Text-to-speech (Dutch) ----------
// Browsers stall on utterances longer than roughly 15 seconds: no 'end' event fires,
// and on Android the engine restarts the text from the top — which is why a listening
// script used to loop forever with no way to silence it. So a text is split into
// sentence-sized chunks spoken one after another, which also gives real pause/stop
// control and a progress indicator.
const MAX_CHUNK = 160; // characters, about 8-10 seconds of speech

let nlVoice = null;
let queue = [];
let chunkIdx = 0;
let curRate = 0.9;
let runId = 0; // guards callbacks of a run that was stopped or replaced
let watchdog = null;

// The snapshot identity only changes when the state changes, so it is safe to use
// with useSyncExternalStore.
let snap = { on: false, paused: false, i: 0, n: 0, nl: false };
const speechListeners = new Set();

function setSnap(patch) {
  snap = { ...snap, ...patch };
  speechListeners.forEach((fn) => fn());
}

export function subscribeSpeech(fn) {
  speechListeners.add(fn);
  return () => speechListeners.delete(fn);
}
export const getSpeech = () => snap;

function pickVoice() {
  const voices = window.speechSynthesis?.getVoices() || [];
  nlVoice = voices.find((v) => v.lang?.toLowerCase().startsWith('nl')) || null;
  if (!!nlVoice !== snap.nl) setSnap({ nl: !!nlVoice });
}
if (typeof window !== 'undefined' && window.speechSynthesis) {
  pickVoice();
  window.speechSynthesis.onvoiceschanged = pickVoice;
}

// A device without a Dutch voice reads Dutch with a foreign accent — worth warning about.
export function hasDutchVoice() {
  return snap.nl;
}

function splitChunks(text) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  if (!clean) return [];
  const sentences = clean.match(/[^.!?…]+[.!?…]*/g) || [clean];
  const out = [];
  let buf = '';
  const flushLong = () => {
    // a single sentence longer than the cap: break it at a comma, else at a space
    while (buf.length > MAX_CHUNK * 1.5) {
      const comma = buf.lastIndexOf(', ', MAX_CHUNK);
      const at = comma > 40 ? comma + 1 : buf.lastIndexOf(' ', MAX_CHUNK);
      if (at <= 0) break;
      out.push(buf.slice(0, at).trim());
      buf = buf.slice(at).trim();
    }
  };
  for (const s of sentences) {
    const piece = s.trim();
    if (!piece) continue;
    if (buf && (buf + ' ' + piece).length > MAX_CHUNK) {
      out.push(buf);
      buf = piece;
    } else {
      buf = buf ? buf + ' ' + piece : piece;
    }
    flushLong();
  }
  if (buf) out.push(buf);
  return out;
}

function clearWatchdog() {
  clearTimeout(watchdog);
  watchdog = null;
}

function playChunk() {
  const my = runId;
  if (chunkIdx >= queue.length) {
    clearWatchdog();
    setSnap({ on: false, paused: false, i: 0, n: 0 });
    return;
  }
  const text = queue[chunkIdx];
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'nl-NL';
  if (nlVoice) u.voice = nlVoice;
  u.rate = curRate;

  const advance = () => {
    if (my !== runId) return; // stopped or restarted meanwhile
    clearWatchdog();
    chunkIdx += 1;
    setSnap({ i: chunkIdx });
    playChunk();
  };

  u.onend = advance;
  u.onerror = (e) => {
    // 'interrupted' / 'canceled' mean we stopped on purpose; anything else: skip on
    if (e.error === 'interrupted' || e.error === 'canceled') return;
    advance();
  };

  window.speechSynthesis.speak(u);
  setSnap({ on: true, paused: false, i: chunkIdx, n: queue.length });

  // ponytail: if the engine swallows a chunk and never fires 'end', move on anyway
  // instead of hanging forever. Rough estimate: ~12 characters per second at rate 1.
  const estMs = ((text.length / 12) / curRate) * 1000;
  clearWatchdog();
  watchdog = setTimeout(advance, estMs * 2 + 5000);
}

export function speak(text, rate = 0.9) {
  if (!window.speechSynthesis) return;
  stopSpeak();
  const parts = splitChunks(text);
  if (!parts.length) return;
  runId += 1;
  queue = parts;
  chunkIdx = 0;
  curRate = rate;
  playChunk();
}

export function stopSpeak() {
  runId += 1;
  clearWatchdog();
  queue = [];
  chunkIdx = 0;
  window.speechSynthesis?.cancel();
  if (snap.on || snap.paused) setSnap({ on: false, paused: false, i: 0, n: 0 });
}

export function pauseSpeak() {
  const s = window.speechSynthesis;
  if (!s || !snap.on) return;
  clearWatchdog();
  s.pause();
  // Android often ignores pause(); fall back to stopping and replaying this chunk later
  setTimeout(() => {
    if (!snap.on) return;
    if (!s.paused) {
      runId += 1; // silence the callbacks of the utterance we are about to cancel
      s.cancel();
    }
    setSnap({ paused: true });
  }, 250);
}

export function resumeSpeak() {
  const s = window.speechSynthesis;
  if (!s || !snap.paused) return;
  if (s.paused) {
    s.resume();
    setSnap({ paused: false });
  } else {
    runId += 1; // restart the chunk we were interrupted on
    playChunk();
  }
}

export function hasTTS() {
  return typeof window !== 'undefined' && !!window.speechSynthesis;
}

// ---------- Speech-to-text (Dutch) for the Spreken exam ----------
export function hasSTT() {
  return typeof window !== 'undefined' && !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}

// Listen once and resolve with the transcript ('' when nothing was heard).
export function listenOnce() {
  return new Promise((resolve, reject) => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return reject(new Error('no-stt'));
    const r = new SR();
    r.lang = 'nl-NL';
    r.interimResults = false;
    r.maxAlternatives = 3;
    let done = false;
    r.onresult = (e) => {
      done = true;
      // join alternatives so keyword matching gets more chances
      resolve([...e.results[0]].map((a) => a.transcript).join(' | '));
    };
    r.onerror = (e) => { if (!done) { done = true; reject(new Error(e.error)); } };
    r.onend = () => { if (!done) resolve(''); };
    r.start();
  });
}

// ---------- helpers ----------
export function shuffle(arr, rnd = Math.random) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const MODULES = [
  { id: 'lezen', icon: '📖', nl: 'Lezen', en: 'Reading', tr: 'Okuma' },
  { id: 'luisteren', icon: '🎧', nl: 'Luisteren', en: 'Listening', tr: 'Dinleme' },
  { id: 'schrijven', icon: '✍️', nl: 'Schrijven', en: 'Writing', tr: 'Yazma' },
  { id: 'spreken', icon: '🗣️', nl: 'Spreken', en: 'Speaking', tr: 'Konuşma' },
  { id: 'knm', icon: '🇳🇱', nl: 'KNM', en: 'Dutch society (KNM)', tr: 'Hollanda toplumu (KNM)' },
];

export const PASS_PCT = 60; // indicative pass mark shown to the user

// The three courses. `exams` must stay in sync with scripts/gen-exams.mjs.
// B2 (Staatsexamen NT2 Programma II) has no KNM module — that is inburgering only.
export const LEVELS = [
  {
    id: 'A2',
    exams: 50,
    modules: ['lezen', 'luisteren', 'schrijven', 'spreken', 'knm'],
    exam: { en: 'Inburgeringsexamen A2', tr: 'Inburgering sınavı A2' },
    goal: {
      en: 'The civic integration exam. Enough Dutch for everyday life: shops, doctor, school, the municipality.',
      tr: 'Uyum sınavı. Günlük hayat için yeterli Hollandaca: alışveriş, doktor, okul, belediye.',
    },
  },
  {
    id: 'B1',
    exams: 40,
    modules: ['lezen', 'luisteren', 'schrijven', 'spreken', 'knm'],
    exam: { en: 'Inburgering B1-route / Staatsexamen NT2 I', tr: 'Inburgering B1 rotası / Staatsexamen NT2 I' },
    goal: {
      en: 'The standard route under the 2021 integration law, and the level for work or an mbo course.',
      tr: '2021 uyum yasasının standart rotası; iş veya mbo eğitimi için gereken seviye.',
    },
  },
  {
    id: 'B2',
    exams: 30,
    modules: ['lezen', 'luisteren', 'schrijven', 'spreken'],
    exam: { en: 'Staatsexamen NT2 Programma II', tr: 'Staatsexamen NT2 Programma II' },
    goal: {
      en: 'The level universities and hbo programmes ask for: abstract texts, argument and nuance.',
      tr: 'Üniversite ve hbo programlarının istediği seviye: soyut metinler, argüman ve nüans.',
    },
  },
];

export const getLevel = (id) => LEVELS.find((l) => l.id === id) || LEVELS[0];
export const levelModules = (id) => getLevel(id).modules.map((m) => MODULES.find((x) => x.id === m));
export const examCount = (id) => getLevel(id).exams;

// A2 keys keep their original shape so existing progress is never lost.
export const examKey = (level, mod, n) => (level === 'A2' ? `exam:${mod}:${n}` : `exam:${level}:${mod}:${n}`);

export function activeLevel() {
  return getP('level', 'A2');
}
