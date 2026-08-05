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
let nlVoice = null;
function pickVoice() {
  const voices = window.speechSynthesis?.getVoices() || [];
  nlVoice = voices.find((v) => v.lang?.toLowerCase().startsWith('nl')) || null;
}
if (typeof window !== 'undefined' && window.speechSynthesis) {
  pickVoice();
  window.speechSynthesis.onvoiceschanged = pickVoice;
}

export function speak(text, rate = 0.9) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'nl-NL';
  if (nlVoice) u.voice = nlVoice;
  u.rate = rate;
  window.speechSynthesis.speak(u);
}

export function stopSpeak() {
  window.speechSynthesis?.cancel();
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
export const EXAM_COUNT = 50; // exams per module (keep in sync with scripts/gen-exams.mjs)
