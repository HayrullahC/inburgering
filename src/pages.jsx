import React, { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TURNSTILE_SITE_KEY } from './config.js';
import {
  supa, speak, stopSpeak, pauseSpeak, resumeSpeak, subscribeSpeech, getSpeech,
  getP, setP, MODULES, PASS_PCT, hasSTT, listenOnce,
  LEVELS, getLevel, levelModules, examCount, examKey,
} from './lib.js';
import { useLang, useT, useUser } from './App.jsx';
import { GRAMMAR, CATS, vocabFor, grammarFor, catsFor } from './data/index.js';
import { buildRoute } from './data/startroute.js';
import { useExamples, exText } from './data/ex/index.js';

const examFiles = import.meta.glob('./data/exams/*/*.json');

const useActiveLevel = () => getP('level', 'A2');

function countPassed(level, mod) {
  let n = 0;
  for (let i = 1; i <= examCount(level); i++) {
    const r = getP(examKey(level, mod, i));
    if (r && (r.s / r.t) * 100 >= PASS_PCT) n++;
  }
  return n;
}

// While this button is the one speaking it turns into a stop button — a reading text
// can be minutes long and you must be able to silence it.
export function Speaker({ text, rate }) {
  const sp = useSyncExternalStore(subscribeSpeech, getSpeech);
  const mine = sp.on && sp.src === text;
  return (
    <button
      className={'spk' + (mine ? ' on' : '')}
      title={mine ? 'stop' : 'play'}
      onClick={(e) => {
        e.stopPropagation();
        mine ? stopSpeak() : speak(text, rate);
      }}
    >
      {mine ? '⏹' : '🔊'}
    </button>
  );
}

// Play / pause / stop for a listening fragment, with a "sentence 3/8" progress line.
export function AudioPlayer({ text, rate = 0.85, playLabel }) {
  const t = useT();
  const sp = useSyncExternalStore(subscribeSpeech, getSpeech);
  useEffect(() => stopSpeak, []);

  return (
    <div className="listen-box">
      {!sp.on ? (
        <button className="btn big" onClick={() => speak(text, rate)}>
          ▶ {playLabel || t({ en: 'Play audio', tr: 'Sesi çal' })}
        </button>
      ) : (
        <>
          <div className="player-btns">
            <button className="btn big" onClick={() => (sp.paused ? resumeSpeak() : pauseSpeak())}>
              {sp.paused ? '▶ ' + t({ en: 'Continue', tr: 'Devam et' }) : '⏸ ' + t({ en: 'Pause', tr: 'Duraklat' })}
            </button>
            <button className="btn ghost" onClick={stopSpeak}>
              ⏹ {t({ en: 'Stop', tr: 'Durdur' })}
            </button>
          </div>
          <div className="play-progress">
            <span>{t({ en: 'sentence', tr: 'cümle' })} {Math.min(sp.i + 1, sp.n)}/{sp.n}</span>
            <div className="bar"><div style={{ width: ((sp.i + 1) / sp.n) * 100 + '%' }} /></div>
          </div>
        </>
      )}
      {!sp.nl && (
        <p className="voice-warn">
          ⚠️ {t({
            en: 'No Dutch voice is installed on this device, so the audio may sound off. On Android: Settings → Language & input → Text-to-speech → install Nederlands.',
            tr: 'Bu cihazda Hollandaca ses paketi yok, ses yanlış aksanla okunabilir. Android: Ayarlar → Dil ve giriş → Metin okuma → Nederlands kur.',
          })}
        </p>
      )}
    </div>
  );
}

// The "what do I do next" card: the single most useful thing on the home page for
// someone who has just arrived and is staring at 1100 words.
function RouteCard() {
  const t = useT();
  const { steps, doneCount, current } = useRoute();
  const next = current?.tasks.find((task) => !task.done);

  return (
    <Link to="/start" className="route-card">
      <div className="route-card-head">
        <span>🚩 {t({ en: 'Start route', tr: 'Başlangıç yolu' })}</span>
        <span>{doneCount}/{steps.length}</span>
      </div>
      <div className="bar"><div style={{ width: (doneCount / steps.length) * 100 + '%' }} /></div>
      {current ? (
        <>
          <div className="route-card-next">
            {t({ en: 'Next', tr: 'Sıradaki' })}: <b>{t(current.title)}</b>
          </div>
          {next && (
            <div className="route-card-task">
              {next.icon} {next.label ? t(next.label) : ''} {next.progress && !next.done ? `(${next.progress})` : ''}
            </div>
          )}
        </>
      ) : (
        <div className="route-card-next">
          🎉 {t({ en: 'Route complete — keep practising exams.', tr: 'Rota tamamlandı — sınav pratiğine devam.' })}
        </div>
      )}
    </Link>
  );
}

// ---------------- Home ----------------
export function Home() {
  const lang = useLang();
  const t = useT();
  const level = useActiveLevel();
  const cfg = getLevel(level);
  const mods = levelModules(level);
  const words = vocabFor(level);
  const lessons = grammarFor(level);
  const fc = getP('fc', {});
  const wordIds = new Set(words.map((w) => w.id));
  const known = Object.entries(fc).filter(([id, b]) => b >= 3 && wordIds.has(Number(id))).length;
  const gramDone = lessons.filter((g) => getP('gram:' + g.id)).length;
  const totalExams = mods.length * examCount(level);
  const passed = mods.reduce((n, m) => n + countPassed(level, m.id), 0);

  return (
    <div className="page">
      <div className="hero">
        <h1>{t({ en: `Dutch ${level} course`, tr: `Hollandaca ${level} kursu` })}</h1>
        <p className="hero-exam">🎯 {t(cfg.exam)}</p>
        <p>{t(cfg.goal)}</p>
        <p>
          {t({
            en: `${words.length} words, ${lessons.length} grammar lessons and ${totalExams} practice exams with audio at this level. Your progress syncs across your devices.`,
            tr: `Bu seviyede ${words.length} kelime, ${lessons.length} gramer dersi ve sesli ${totalExams} deneme sınavı var. İlerlemen cihazların arasında senkronlanır.`,
          })}
        </p>
      </div>

      <div className="stat-row">
        <div className="stat"><b>{known}</b><span>/{words.length} {t({ en: 'words learned', tr: 'öğrenilen kelime' })}</span></div>
        <div className="stat"><b>{gramDone}</b><span>/{lessons.length} {t({ en: 'grammar topics', tr: 'gramer konusu' })}</span></div>
        <div className="stat"><b>{passed}</b><span>/{totalExams} {t({ en: 'exams passed', tr: 'geçilen sınav' })}</span></div>
      </div>

      <RouteCard />

      <h2>{t({ en: 'Exam modules', tr: 'Sınav modülleri' })}</h2>
      <div className="grid">
        {mods.map((m) => (
          <Link key={m.id} to={'/exams/' + m.id} className="card mod-card">
            <div className="mod-icon">{m.icon}</div>
            <h3>{m.nl}</h3>
            <p>{m[lang]}</p>
            <div className="bar"><div style={{ width: (countPassed(level, m.id) * 100) / examCount(level) + '%' }} /></div>
            <small>{countPassed(level, m.id)}/{examCount(level)}</small>
          </Link>
        ))}
      </div>

      <h2>{t({ en: 'Quick start', tr: 'Hızlı başlangıç' })}</h2>
      <div className="grid">
        <Link className="card" to="/vocab"><h3>📚 {t({ en: words.length + ' Words', tr: words.length + ' Kelime' })}</h3><p>{t({ en: 'With pictures, audio and examples', tr: 'Görsel, ses ve örneklerle' })}</p></Link>
        <Link className="card" to="/grammar"><h3>🧩 {t({ en: `Full ${level} Grammar`, tr: `Tam ${level} Grameri` })}</h3><p>{t({ en: lessons.length + ' complete lessons', tr: lessons.length + ' eksiksiz ders' })}</p></Link>
        <Link className="card" to="/games"><h3>🎮 {t({ en: '9 Games', tr: '9 Oyun' })}</h3><p>{t({ en: 'Flashcards, sentence builder, dictation…', tr: 'Kartlar, cümle kurma, dikte…' })}</p></Link>
      </div>
    </div>
  );
}

// ---------------- Vocab ----------------
export function Vocab() {
  const lang = useLang();
  const t = useT();
  const level = useActiveLevel();
  const [cat, setCat] = useState('all');
  const [q, setQ] = useState('');
  const [known, setKnown] = useState('all'); // all | hard | learned
  // 1000 cards at once is 50.000 pixels of scrolling and a sluggish phone, so grow on demand
  const [limit, setLimit] = useState(60);
  const levelWords = vocabFor(level);
  const cats = catsFor(level);
  const ex = useExamples(level);
  const fc = getP('fc', {});

  const words = useMemo(() => {
    let w = levelWords;
    if (cat !== 'all') w = w.filter((x) => x.cat === cat);
    if (known === 'hard') w = w.filter((x) => (fc[x.id] ?? -1) >= 0 && fc[x.id] < 3);
    if (known === 'learned') w = w.filter((x) => (fc[x.id] || 0) >= 3);
    if (q) {
      const s = q.toLowerCase();
      w = w.filter((x) => x.nl.toLowerCase().includes(s) || x.en.toLowerCase().includes(s) || x.tr.toLowerCase().includes(s));
    }
    return w;
  }, [cat, q, level, known, fc]);

  useEffect(() => setLimit(60), [cat, q, level, known]); // a new filter starts at the top

  return (
    <div className="page">
      <h1>📚 {t({ en: 'Vocabulary', tr: 'Kelime Haznesi' })} <small>{level} · {levelWords.length}</small></h1>
      <div className="filter-row">
        <input placeholder={t({ en: 'Search…', tr: 'Ara…' })} value={q} onChange={(e) => setQ(e.target.value)} />
        <select value={cat} onChange={(e) => setCat(e.target.value)}>
          <option value="all">{t({ en: 'All categories', tr: 'Tüm kategoriler' })}</option>
          {cats.map((c) => (
            <option key={c.id} value={c.id}>{c.icon} {c[lang]}</option>
          ))}
        </select>
      </div>
      <div className="chip-row">
        {[
          ['all', t({ en: 'All', tr: 'Tümü' })],
          ['hard', '🔴 ' + t({ en: 'Difficult', tr: 'Zorlandıklarım' })],
          ['learned', '✅ ' + t({ en: 'Learned', tr: 'Öğrendiklerim' })],
        ].map(([k, label]) => (
          <button key={k} className={'chip' + (known === k ? ' on' : '')} onClick={() => setKnown(k)}>
            {label}
          </button>
        ))}
        <span className="chip-count">{words.length}</span>
      </div>
      {words.length === 0 && (
        <div className="notice">
          {known === 'hard' && t({
            en: 'Nothing here yet — words land in this list once you mark them "Again" in the flashcard game.',
            tr: 'Burası henüz boş — kelime kartı oyununda "Tekrar" dediğin kelimeler buraya düşer.',
          })}
          {known === 'learned' && t({
            en: 'Nothing here yet — a word counts as learned after you get it right three times in the flashcard game.',
            tr: 'Burası henüz boş — bir kelime, kart oyununda üç kez doğru bilince öğrenilmiş sayılır.',
          })}
          {known === 'all' && t({ en: 'No word matches your search.', tr: 'Aramanla eşleşen kelime yok.' })}
        </div>
      )}
      <div className="grid vocab-grid">
        {words.slice(0, limit).map((w) => (
          <div key={w.id} className="card word-card" onClick={() => speak(w.nl)}>
            {fc[w.id] !== undefined && (
              <span className="word-badge" title={t({ en: 'flashcard progress', tr: 'kart ilerlemesi' })}>
                {fc[w.id] >= 3 ? '✅' : '🔴'}
              </span>
            )}
            <div className="word-emoji">{w.emoji}</div>
            <div className="word-nl">{w.nl} <Speaker text={w.nl} /></div>
            <div className="word-tr">{lang === 'tr' ? w.tr : w.en}</div>
            <div className="word-ex">{w.ex} <Speaker text={w.ex} /></div>
            {exText(ex, w, lang) && <div className="word-ex-tr">{exText(ex, w, lang)}</div>}
          </div>
        ))}
      </div>
      {words.length > limit && (
        <div style={{ textAlign: 'center' }}>
          <button className="btn ghost" onClick={() => setLimit(limit + 120)}>
            {t({ en: `Show more (${words.length - limit} left)`, tr: `Daha fazla göster (${words.length - limit} kaldı)` })}
          </button>
        </div>
      )}
    </div>
  );
}

// ---------------- Grammar ----------------
export function Grammar() {
  const t = useT();
  const level = useActiveLevel();
  return (
    <div className="page">
      <h1>🧩 {t({ en: `${level} Grammar — complete`, tr: `${level} Grameri — eksiksiz` })}</h1>
      <div className="lesson-list">
        {grammarFor(level).map((g, i) => (
          <Link key={g.id} to={'/grammar/' + g.id} className="lesson-row">
            <span className="lesson-n">{i + 1}</span>
            <span className="lesson-title">{t(g.title)}</span>
            <span className="lesson-done">{getP('gram:' + g.id) ? '✅' : ''}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function GrammarTopic() {
  const { id } = useParams();
  const t = useT();
  const g = GRAMMAR.find((x) => x.id === id);
  if (!g) return <div className="page">Not found</div>;
  const done = !!getP('gram:' + g.id);

  return (
    <div className="page narrow">
      <Link to="/grammar">← {t({ en: 'All topics', tr: 'Tüm konular' })}</Link>
      <h1>{t(g.title)}</h1>
      {g.body.map((p, i) => (
        <p key={i} className="gram-p">{t(p)}</p>
      ))}
      {g.tables?.map((tb, i) => (
        <table key={i} className="gram-table">
          <thead><tr>{tb.head.map((h, j) => <th key={j}>{typeof h === 'object' ? t(h) : h}</th>)}</tr></thead>
          <tbody>
            {tb.rows.map((r, j) => (
              <tr key={j}>{r.map((c, k) => <td key={k}>{c}</td>)}</tr>
            ))}
          </tbody>
        </table>
      ))}
      <h3>{t({ en: 'Examples', tr: 'Örnekler' })}</h3>
      <div className="ex-list">
        {g.ex.map((e, i) => (
          <div key={i} className="ex-row">
            <div className="ex-nl">{e.nl} <Speaker text={e.nl} /></div>
            <div className="ex-tr">{t({ en: e.en, tr: e.tr })}</div>
          </div>
        ))}
      </div>
      <button className="btn" onClick={() => setP('gram:' + g.id, !done)}>
        {done ? t({ en: '✅ Completed — undo', tr: '✅ Tamamlandı — geri al' }) : t({ en: 'Mark as completed', tr: 'Tamamlandı işaretle' })}
      </button>
    </div>
  );
}

// ---------------- Exams ----------------
export function Exams() {
  const lang = useLang();
  const t = useT();
  const level = useActiveLevel();
  const mods = levelModules(level);
  const n = examCount(level);
  return (
    <div className="page">
      <h1>📝 {t({ en: 'Practice exams', tr: 'Deneme sınavları' })} <small>{level}</small></h1>
      <p>{t({
        en: `${mods.length} modules × ${n} exams × 25 questions. Pass mark: ${PASS_PCT}%.`,
        tr: `${mods.length} modül × ${n} sınav × 25 soru. Geçme notu: %${PASS_PCT}.`,
      })}</p>
      <div className="grid">
        {mods.map((m) => (
          <Link key={m.id} to={'/exams/' + m.id} className="card mod-card">
            <div className="mod-icon">{m.icon}</div>
            <h3>{m.nl}</h3>
            <p>{m[lang]}</p>
            <div className="bar"><div style={{ width: (countPassed(level, m.id) * 100) / n + '%' }} /></div>
            <small>{countPassed(level, m.id)}/{n} {t({ en: 'passed', tr: 'geçildi' })}</small>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function ExamList() {
  const { mod } = useParams();
  const t = useT();
  const level = useActiveLevel();
  const m = MODULES.find((x) => x.id === mod);
  if (!m) return null;
  return (
    <div className="page">
      <Link to="/exams">← {t({ en: 'Modules', tr: 'Modüller' })}</Link>
      <h1>{m.icon} {m.nl} <small>{level}</small></h1>
      <div className="exam-grid">
        {Array.from({ length: examCount(level) }, (_, i) => i + 1).map((n) => {
          const r = getP(examKey(level, mod, n));
          const pct = r ? Math.round((r.s / r.t) * 100) : null;
          const cls = pct === null ? '' : pct >= PASS_PCT ? 'ok' : 'fail';
          return (
            <Link key={n} to={`/exam/${mod}/${n}`} className={'exam-tile ' + cls}>
              <b>{n}</b>
              <small>{pct === null ? '—' : pct + '%'}</small>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function ExamRunner() {
  const { mod, n } = useParams();
  const t = useT();
  const nav = useNavigate();
  const level = useActiveLevel();
  const [data, setData] = useState(null); // { texts, exams }
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [sel, setSel] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setData(null);
    const loader = examFiles[`./data/exams/${level}/${mod}.json`];
    if (!loader) return;
    loader().then((m) => setData(m.default));
    return stopSpeak;
  }, [level, mod, n]);

  if (!data) return <div className="page">…</div>;
  const qs = data.exams[Number(n) - 1];
  if (!qs) return <div className="page">…</div>;
  if (mod === 'schrijven' || mod === 'spreken') {
    return <OpenRunner key={level + mod + n} level={level} mod={mod} n={n} qs={qs} />;
  }

  // passages and listening scripts live once in data.texts and are referenced by index
  const txt = (q, field) => (q[field] != null ? data.texts[q[field]] : null);
  const q = qs[i];
  const passage = txt(q, 'pi');
  const script = txt(q, 'li');
  const isListening = !!script;

  function pick(idx) {
    setSel(idx);
  }
  function next() {
    const a2 = [...answers, sel];
    setAnswers(a2);
    setSel(null);
    stopSpeak();
    if (i + 1 < qs.length) setI(i + 1);
    else finish(a2);
  }
  function finish(a2) {
    const score = a2.filter((a, j) => a === qs[j].a).length;
    const key = examKey(level, mod, n);
    const prev = getP(key);
    if (!prev || score > prev.s) setP(key, { s: score, t: qs.length, d: new Date().toISOString() });
    setDone(true);
  }

  if (done) {
    const score = answers.filter((a, j) => a === qs[j].a).length;
    const pct = Math.round((score / qs.length) * 100);
    return (
      <div className="page narrow">
        <h1>{pct >= PASS_PCT ? '🎉' : '😕'} {score}/{qs.length} ({pct}%)</h1>
        <p>
          {pct >= PASS_PCT
            ? t({ en: 'Passed! Well done.', tr: 'Geçtin! Tebrikler.' })
            : t({ en: 'Below ' + PASS_PCT + '% — review and try again.', tr: '%' + PASS_PCT + ' altı — tekrar dene.' })}
        </p>
        <div className="row-btns">
          <button className="btn" onClick={() => { setI(0); setAnswers([]); setDone(false); }}>
            {t({ en: 'Retry', tr: 'Tekrar' })}
          </button>
          <button className="btn ghost" onClick={() => nav('/exams/' + mod)}>
            {t({ en: 'Exam list', tr: 'Sınav listesi' })}
          </button>
        </div>
        <h3>{t({ en: 'Review', tr: 'İnceleme' })}</h3>
        {qs.map((qq, j) => (
          <div key={j} className={'rev ' + (answers[j] === qq.a ? 'ok' : 'fail')}>
            {txt(qq, 'pi') && <div className="passage small">{txt(qq, 'pi')}</div>}
            {txt(qq, 'li') && <div className="passage small">🎧 {txt(qq, 'li')}</div>}
            <b>{j + 1}. {qq.q}</b>
            <div>✔ {qq.o[qq.a]}</div>
            {answers[j] !== qq.a && <div>✘ {qq.o[answers[j]] ?? '—'}</div>}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="page narrow">
      <div className="exam-head">
        <span>{MODULES.find((m) => m.id === mod)?.nl} — {t({ en: 'Exam', tr: 'Sınav' })} {n}</span>
        <span>{i + 1}/{qs.length}</span>
      </div>
      <div className="bar"><div style={{ width: ((i) / qs.length) * 100 + '%' }} /></div>

      {passage && <div className="passage">{passage} <Speaker text={passage} /></div>}
      {isListening && (
        <>
          <AudioPlayer key={mod + n + i} text={script} />
          <p className="listen-hint"><small>
            {t({ en: 'You can pause while you read the options.', tr: 'Şıkları okurken duraklatabilirsin.' })}
          </small></p>
        </>
      )}

      <h2 className="qtext">{q.q} {!isListening && <Speaker text={q.q} />}</h2>
      <div className="opts">
        {q.o.map((o, idx) => (
          <button key={idx} className={'opt ' + (sel === idx ? 'sel' : '')} onClick={() => pick(idx)}>
            {String.fromCharCode(65 + idx)}. {o}
          </button>
        ))}
      </div>
      <button className="btn" disabled={sel === null} onClick={next}>
        {i + 1 === qs.length ? t({ en: 'Finish', tr: 'Bitir' }) : t({ en: 'Next', tr: 'Sonraki' })} →
      </button>
    </div>
  );
}

// ---------------- Open-answer runner (Schrijven: type, Spreken: microphone) ----------------
function normTxt(s) {
  return (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
function hitAny(text, groups) {
  const tx = normTxt(text);
  return (groups || []).some((g) => g.length > 0 && g.every((w) => tx.includes(normTxt(w))));
}
// Heuristic grading per task type; the user can always override (real exams are human-graded).
function evalOpen(q, text) {
  const words = normTxt(text).split(' ').filter(Boolean).length;
  if (q.t === 'form') return { ok: q.acc.some((a) => normTxt(text).includes(normTxt(a))), words };
  if (q.t === 'msg') {
    const hits = q.pts.map((p) => hitAny(text, p.kw));
    return { ok: hits.filter(Boolean).length >= q.pts.length - 1 && words >= q.min, hits, words };
  }
  if (q.t === 'sp') return { ok: hitAny(text, q.kw), words };
  return { ok: words >= (q.min || 3), words }; // zin / open
}

function OpenRunner({ level, mod, n, qs }) {
  const t = useT();
  const nav = useNavigate();
  const speaking = mod === 'spreken';
  const [i, setI] = useState(0);
  const [ans, setAns] = useState('');
  const [fb, setFb] = useState(null); // null | {ok, hits?, self?}
  const [results, setResults] = useState([]);
  const [rec, setRec] = useState(false);
  const [sttFail, setSttFail] = useState(!hasSTT());
  const [done, setDone] = useState(false);

  useEffect(() => stopSpeak, []);
  const q = qs[i];

  async function record() {
    setRec(true);
    setFb(null);
    try {
      const text = await listenOnce();
      setAns(text);
      if (text) setFb(evalOpen(q, text));
    } catch {
      setSttFail(true); // no mic / no permission -> self-grading mode
    }
    setRec(false);
  }

  function next(okOverride) {
    const ok = okOverride ?? fb?.ok ?? false;
    const res = [...results, { ok, ans }];
    setResults(res);
    setAns('');
    setFb(null);
    stopSpeak();
    if (i + 1 < qs.length) setI(i + 1);
    else {
      const score = res.filter((r) => r.ok).length;
      const key = examKey(level, mod, n);
      const prev = getP(key);
      if (!prev || score > prev.s) setP(key, { s: score, t: qs.length, d: new Date().toISOString() });
      setDone(true);
    }
  }

  if (done) {
    const score = results.filter((r) => r.ok).length;
    const pct = Math.round((score / qs.length) * 100);
    return (
      <div className="page narrow">
        <h1>{pct >= PASS_PCT ? '🎉' : '😕'} {score}/{qs.length} ({pct}%)</h1>
        <div className="row-btns">
          <button className="btn" onClick={() => { setI(0); setResults([]); setDone(false); }}>{t({ en: 'Retry', tr: 'Tekrar' })}</button>
          <button className="btn ghost" onClick={() => nav('/exams/' + mod)}>{t({ en: 'Exam list', tr: 'Sınav listesi' })}</button>
        </div>
        <h3>{t({ en: 'Review', tr: 'İnceleme' })}</h3>
        {qs.map((qq, j) => (
          <div key={j} className={'rev ' + (results[j].ok ? 'ok' : 'fail')}>
            <b>{j + 1}. {qq.l || qq.q}</b>
            {results[j].ans && <div>🗣 {results[j].ans}</div>}
            <div>💡 {qq.model}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="page narrow">
      <div className="exam-head">
        <span>{MODULES.find((m) => m.id === mod)?.nl} — {t({ en: 'Exam', tr: 'Sınav' })} {n}</span>
        <span>{i + 1}/{qs.length}</span>
      </div>
      <div className="bar"><div style={{ width: (i / qs.length) * 100 + '%' }} /></div>

      <p className="gram-p"><b>{q.q}</b></p>
      {!speaking && q.min && (
        <p><small>
          {t({ en: 'Criterion: at least ' + q.min + ' words', tr: 'Kriter: en az ' + q.min + ' kelime' })}
          {q.pts ? t({ en: ' + the 3 content points above', tr: ' + yukarıdaki 3 içerik maddesi' }) : ''}
        </small></p>
      )}
      {speaking && q.sec && (
        <p><small>⏱ {t({
          en: `In the real exam you get about ${q.sec} seconds for this task.`,
          tr: `Gerçek sınavda bu görev için yaklaşık ${q.sec} saniyen olur.`,
        })}</small></p>
      )}
      {q.sc && <div className="scene">{q.sc}</div>}
      {q.l && <AudioPlayer key={mod + n + i} text={q.l} playLabel={t({ en: 'Play', tr: 'Dinle' })} />}

      {speaking ? (
        <div className="listen-box">
          {!sttFail ? (
            <>
              <button className="btn big mic" onClick={record} disabled={rec}>
                {rec ? '🎤 …' : '🎤 ' + t({ en: 'Speak your answer', tr: 'Cevabını söyle' })}
              </button>
              {ans && <div className="transcript">🗣 {ans}</div>}
              {ans === '' && fb === null && !rec && (
                <p><small>{t({ en: 'Press the microphone and answer out loud in Dutch.', tr: 'Mikrofona bas ve Hollandaca sesli cevap ver.' })}</small></p>
              )}
            </>
          ) : (
            <>
              <p><small>{t({ en: 'Microphone not available in this browser — answer out loud, then grade yourself.', tr: 'Bu tarayıcıda mikrofon kullanılamıyor — sesli cevap ver, sonra kendini puanla.' })}</small></p>
              {!fb && <button className="btn" onClick={() => setFb({ self: true })}>{t({ en: 'I answered out loud', tr: 'Sesli cevap verdim' })}</button>}
            </>
          )}
        </div>
      ) : (
        <div className="auth-form" style={{ maxWidth: 'none' }}>
          {q.t === 'msg' || q.t === 'open' ? (
            <textarea className="write-area" rows={5} value={ans} onChange={(e) => setAns(e.target.value)} placeholder={t({ en: 'Write your answer in Dutch…', tr: 'Cevabını Hollandaca yaz…' })} />
          ) : (
            <input value={ans} onChange={(e) => setAns(e.target.value)} placeholder={t({ en: 'Your answer…', tr: 'Cevabın…' })} />
          )}
          {!fb && (
            <button className="btn" disabled={!ans.trim()} onClick={() => setFb(evalOpen(q, ans))}>
              {t({ en: 'Check', tr: 'Kontrol et' })}
            </button>
          )}
        </div>
      )}

      {fb && (
        <div className={'notice ' + (fb.self ? '' : fb.ok ? 'ok' : 'err')}>
          {!fb.self && <p><b>{fb.ok ? '✔ ' + t({ en: 'Looks good!', tr: 'İyi görünüyor!' }) : '✘ ' + t({ en: 'Not all criteria met.', tr: 'Bazı kriterler eksik.' })}</b></p>}
          {!fb.self && !fb.ok && q.min && fb.words < q.min && (
            <p><small>{t({ en: 'You wrote ' + fb.words + ' word(s); at least ' + q.min + ' needed.', tr: fb.words + ' kelime yazdın; en az ' + q.min + ' gerekli.' })}</small></p>
          )}
          {fb.hits && q.pts && (
            <ul className="chk">
              {q.pts.map((p, j) => <li key={j}>{fb.hits[j] ? '✅' : '❌'} {p.d}</li>)}
            </ul>
          )}
          <p>💡 <i>{t({ en: 'Example answer', tr: 'Örnek cevap' })}:</i> {q.model} <Speaker text={q.model} /></p>
          <div className="row-btns">
            {fb.self ? (
              <>
                <button className="btn good" onClick={() => next(true)}>✔ {t({ en: 'I said it well', tr: 'Doğru söyledim' })}</button>
                <button className="btn again" onClick={() => next(false)}>✘ {t({ en: 'Not quite', tr: 'Söyleyemedim' })}</button>
              </>
            ) : (
              <>
                <button className="btn" onClick={() => next()}>{i + 1 === qs.length ? t({ en: 'Finish', tr: 'Bitir' }) : t({ en: 'Next', tr: 'Sonraki' })} →</button>
                {!fb.ok && (
                  <button className="btn ghost" onClick={() => next(true)}>
                    {t({ en: 'My answer was fine — count it', tr: 'Cevabım doğruydu — say' })}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------- Auth ----------------
// Cloudflare Turnstile widget; renders nothing when no site key is configured.
function Captcha({ onToken }) {
  const ref = useRef(null);
  const cbRef = useRef(onToken);
  cbRef.current = onToken;

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !ref.current) return;
    let cancelled = false;
    const el = ref.current;
    function render() {
      if (cancelled || !window.turnstile || el.childNodes.length) return;
      window.turnstile.render(el, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (tok) => cbRef.current(tok),
        'expired-callback': () => cbRef.current(''),
        'error-callback': () => cbRef.current(''),
      });
    }
    if (window.turnstile) {
      render();
    } else {
      let s = document.getElementById('cf-turnstile-script');
      if (!s) {
        s = document.createElement('script');
        s.id = 'cf-turnstile-script';
        s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        s.async = true;
        document.head.appendChild(s);
      }
      s.addEventListener('load', render);
    }
    return () => { cancelled = true; };
  }, []);

  if (!TURNSTILE_SITE_KEY) return null;
  return <div ref={ref} className="captcha" />;
}

export function Auth() {
  const t = useT();
  const user = useUser();
  const [mode, setMode] = useState('login'); // login | signup | forgot
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [city, setCity] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);

  if (!supa) {
    return (
      <div className="page narrow">
        <h1>🔐 {t({ en: 'Account', tr: 'Hesap' })}</h1>
        <div className="notice">
          {t({
            en: 'This site is for members only, but login is not configured yet. The site owner must fill in src/config.js with the Supabase project keys (see README).',
            tr: 'Bu site üyelere özeldir ama giriş sistemi henüz yapılandırılmadı. Site sahibi src/config.js dosyasına Supabase anahtarlarını girmeli (README’ye bak).',
          })}
        </div>
      </div>
    );
  }

  if (user) {
    const meta = user.user_metadata || {};
    return (
      <div className="page narrow">
        <h1>👤 {meta.full_name || user.email}</h1>
        <p>
          {user.email}
          {meta.city ? ' · ' + meta.city : ''}
        </p>
        <p>{t({ en: 'Your progress syncs to the cloud automatically.', tr: 'İlerlemen otomatik olarak buluta senkronlanıyor.' })}</p>
        <button className="btn" onClick={() => supa.auth.signOut()}>{t({ en: 'Log out', tr: 'Çıkış yap' })}</button>
      </div>
    );
  }

  async function submit(e) {
    e.preventDefault();
    if (TURNSTILE_SITE_KEY && !captchaToken) {
      setMsg({ ok: false, text: t({ en: 'Please complete the captcha first.', tr: 'Lütfen önce captcha doğrulamasını tamamla.' }) });
      return;
    }
    setBusy(true);
    setMsg(null);
    const captcha = captchaToken || undefined;
    try {
      if (mode === 'signup') {
        const { error } = await supa.auth.signUp({
          email,
          password: pw,
          options: {
            captchaToken: captcha,
            emailRedirectTo: location.origin + location.pathname,
            data: {
              first_name: first.trim(),
              last_name: last.trim(),
              full_name: (first.trim() + ' ' + last.trim()).trim(),
              city: city.trim() || null,
            },
          },
        });
        if (error) throw error;
        setMsg({ ok: true, text: t({ en: 'Check your email to confirm your account.', tr: 'Hesabını onaylamak için e-postanı kontrol et.' }) });
      } else if (mode === 'login') {
        const { error } = await supa.auth.signInWithPassword({ email, password: pw, options: { captchaToken: captcha } });
        if (error) throw error;
      } else {
        // no #/reset fragment: Supabase appends its tokens as a fragment, which would
        // collide with the HashRouter path; App routes to /reset on PASSWORD_RECOVERY
        const redirectTo = location.origin + location.pathname;
        const { error } = await supa.auth.resetPasswordForEmail(email, { redirectTo, captchaToken: captcha });
        if (error) throw error;
        setMsg({ ok: true, text: t({ en: 'Password reset link sent to your email.', tr: 'Şifre sıfırlama bağlantısı e-postana gönderildi.' }) });
      }
    } catch (err) {
      setMsg({ ok: false, text: err.message });
    }
    // captcha tokens are single-use: reset the widget after every attempt
    window.turnstile?.reset();
    setCaptchaToken('');
    setBusy(false);
  }

  return (
    <div className="page narrow">
      <h1>🔐 {mode === 'signup' ? t({ en: 'Sign up', tr: 'Kayıt ol' }) : mode === 'forgot' ? t({ en: 'Reset password', tr: 'Şifre sıfırla' }) : t({ en: 'Log in', tr: 'Giriş yap' })}</h1>
      <p>{t({ en: 'This course is free, but for members only. Create an account with just your email address.', tr: 'Bu kurs ücretsizdir ama üyelere özeldir. Sadece e-posta adresinle hesap oluşturabilirsin.' })}</p>
      <p><small>{t({ en: 'Only an email address is needed — nothing else.', tr: 'Sadece e-posta adresi yeterli — başka bilgi yok.' })}</small></p>
      <form onSubmit={submit} className="auth-form">
        {mode === 'signup' && (
          <>
            <input required minLength={2} placeholder={t({ en: 'first name', tr: 'ad' })} value={first} onChange={(e) => setFirst(e.target.value)} />
            <input required minLength={2} placeholder={t({ en: 'last name', tr: 'soyad' })} value={last} onChange={(e) => setLast(e.target.value)} />
            <input placeholder={t({ en: 'city in NL (optional)', tr: 'Hollanda’daki şehrin (isteğe bağlı)' })} value={city} onChange={(e) => setCity(e.target.value)} />
          </>
        )}
        <input type="email" required placeholder={t({ en: 'email', tr: 'e-posta' })} value={email} onChange={(e) => setEmail(e.target.value)} />
        {mode !== 'forgot' && (
          <input type="password" required minLength={6} placeholder={t({ en: 'password (min 6)', tr: 'şifre (en az 6)' })} value={pw} onChange={(e) => setPw(e.target.value)} />
        )}
        <Captcha onToken={setCaptchaToken} />
        <button className="btn" disabled={busy || (TURNSTILE_SITE_KEY && !captchaToken)}>
          {mode === 'signup' ? t({ en: 'Create account', tr: 'Hesap oluştur' }) : mode === 'forgot' ? t({ en: 'Send reset link', tr: 'Bağlantı gönder' }) : t({ en: 'Log in', tr: 'Giriş yap' })}
        </button>
      </form>
      {msg && <div className={'notice ' + (msg.ok ? 'ok' : 'err')}>{msg.text}</div>}
      <div className="auth-links">
        {mode !== 'login' && <button className="linklike" onClick={() => setMode('login')}>{t({ en: 'Log in', tr: 'Giriş yap' })}</button>}
        {mode !== 'signup' && <button className="linklike" onClick={() => setMode('signup')}>{t({ en: 'Create account', tr: 'Hesap oluştur' })}</button>}
        {mode !== 'forgot' && <button className="linklike" onClick={() => setMode('forgot')}>{t({ en: 'Forgot password?', tr: 'Şifremi unuttum' })}</button>}
      </div>
    </div>
  );
}

export function ResetPassword() {
  const t = useT();
  const nav = useNavigate();
  const [pw, setPw] = useState('');
  const [msg, setMsg] = useState(null);
  const [hasSession, setHasSession] = useState(null); // null = checking

  useEffect(() => {
    if (!supa) return;
    // small delay: the recovery session from the email link is being set at page load
    const id = setTimeout(() => {
      supa.auth.getSession().then(({ data }) => setHasSession(!!data.session));
    }, 800);
    return () => clearTimeout(id);
  }, []);

  async function submit(e) {
    e.preventDefault();
    const { error } = await supa.auth.updateUser({ password: pw });
    if (error) setMsg(error.message);
    else nav('/');
  }

  if (!supa) return null;
  if (hasSession === false) {
    return (
      <div className="page narrow">
        <h1>{t({ en: 'Choose a new password', tr: 'Yeni şifre belirle' })}</h1>
        <div className="notice err">
          {t({
            en: 'This reset link is invalid, expired or already used. Request a new one — each link works only once.',
            tr: 'Bu sıfırlama bağlantısı geçersiz, süresi dolmuş veya zaten kullanılmış. Yeni bir bağlantı iste — her bağlantı yalnızca bir kez çalışır.',
          })}
        </div>
        <button className="btn" onClick={() => nav('/auth')}>
          {t({ en: 'Request a new link', tr: 'Yeni bağlantı iste' })}
        </button>
      </div>
    );
  }
  return (
    <div className="page narrow">
      <h1>{t({ en: 'Choose a new password', tr: 'Yeni şifre belirle' })}</h1>
      <form onSubmit={submit} className="auth-form">
        <input type="password" required minLength={6} placeholder={t({ en: 'new password', tr: 'yeni şifre' })} value={pw} onChange={(e) => setPw(e.target.value)} />
        <button className="btn">{t({ en: 'Save', tr: 'Kaydet' })}</button>
      </form>
      {msg && <div className="notice err">{msg}</div>}
    </div>
  );
}

// ---------------- Start route: the answer to "where do I begin?" ----------------
const GAME_LABEL = {
  flashcards: { icon: '🃏', en: 'Flashcards', tr: 'Kelime Kartları' },
  match: { icon: '🧩', en: 'Match pairs', tr: 'Eşleştirme' },
  sprint: { icon: '⚡', en: 'Word sprint', tr: 'Kelime Sprinti' },
  spell: { icon: '⌨️', en: 'Type the word', tr: 'Kelimeyi Yaz' },
  sentence: { icon: '🔤', en: 'Sentence builder', tr: 'Cümle Kurma' },
  article: { icon: '🚦', en: 'De or het?', tr: 'De mi het mi?' },
  verbs: { icon: '🔀', en: 'Verb forms', tr: 'Fiil Çekimleri' },
  dictation: { icon: '🎧', en: 'Dictation', tr: 'Dikte' },
  idioms: { icon: '💬', en: 'Meaning match', tr: 'Anlam Eşleştirme' },
};

// How far along a single task is. Nothing is ticked by hand: a task is done when the
// work behind it is done, so the route cannot be clicked through without learning.
function taskState(task, level, words, lessons) {
  if (task.k === 'grammar') {
    const lesson = lessons.find((l) => l.id === task.lesson);
    return { done: !!getP('gram:' + task.lesson), to: '/grammar/' + task.lesson, icon: '🧩', label: lesson?.title };
  }
  if (task.k === 'game') {
    const g = GAME_LABEL[task.game] || { icon: '🎮', en: task.game, tr: task.game };
    return { done: !!getP('played:' + task.game), to: '/games/' + task.game, icon: g.icon, label: { en: g.en, tr: g.tr } };
  }
  if (task.k === 'exam') {
    const m = MODULES.find((x) => x.id === task.mod);
    return {
      done: !!getP(examKey(level, task.mod, task.n)),
      to: `/exam/${task.mod}/${task.n}`,
      icon: m?.icon || '📝',
      label: { en: `${m?.nl} — exam ${task.n}`, tr: `${m?.nl} — sınav ${task.n}` },
    };
  }
  // words: counted as learned once a card has been answered right a couple of times
  const fc = getP('fc', {});
  const ids = words.filter((w) => w.cat === task.cat).map((w) => w.id);
  const known = ids.filter((id) => (fc[id] || 0) >= 2).length;
  const cat = CATS.find((c) => c.id === task.cat);
  return {
    done: known >= task.n,
    to: `/games/flashcards?cat=${task.cat}`,
    icon: cat?.icon || '📚',
    label: {
      en: `${task.n} words — ${cat?.en || task.cat}`,
      tr: `${task.n} kelime — ${cat?.tr || task.cat}`,
    },
    progress: `${Math.min(known, task.n)}/${task.n}`,
  };
}

export function useRoute() {
  const level = useActiveLevel();
  const words = vocabFor(level);
  const lessons = grammarFor(level);
  const steps = buildRoute(level, lessons, catsFor(level));
  const withState = steps.map((s) => {
    const tasks = s.tasks.map((t) => ({ ...t, ...taskState(t, level, words, lessons) }));
    return { ...s, tasks, done: tasks.every((t) => t.done) };
  });
  const doneCount = withState.filter((s) => s.done).length;
  const current = withState.find((s) => !s.done) || null;
  return { steps: withState, doneCount, current, level };
}

export function StartRoute() {
  const t = useT();
  const { steps, doneCount, current, level } = useRoute();
  const [open, setOpen] = useState(current?.id || steps[0]?.id);

  let lastPhase = null;

  return (
    <div className="page narrow">
      <h1>🚩 {t({ en: 'Start route', tr: 'Başlangıç yolu' })} <small>{level}</small></h1>
      <p>
        {t({
          en: 'The whole course in order, in small steps. Work through them one by one — each step ticks itself off when the work behind it is actually done.',
          tr: 'Bütün kurs, sırayla ve küçük adımlarla. Tek tek ilerle — her adım, altındaki iş gerçekten yapılınca kendiliğinden tamamlanır.',
        })}
      </p>

      <div className="route-top">
        <div className="bar"><div style={{ width: (doneCount / steps.length) * 100 + '%' }} /></div>
        <small>{doneCount}/{steps.length} {t({ en: 'steps done', tr: 'adım tamam' })}</small>
      </div>

      <div className="route-list">
        {steps.map((s, i) => {
          const phaseChanged = t(s.phase) !== lastPhase;
          lastPhase = t(s.phase);
          const isOpen = open === s.id;
          return (
            <div key={s.id}>
              {phaseChanged && <h3 className="route-phase">{t(s.phase)}</h3>}
              <div className={'route-step' + (s.done ? ' done' : '') + (s.id === current?.id ? ' current' : '')}>
                <button className="route-head" onClick={() => setOpen(isOpen ? null : s.id)}>
                  <span className="route-n">{s.done ? '✓' : i + 1}</span>
                  <span className="route-title">{t(s.title)}</span>
                  <span className="route-caret">{isOpen ? '▾' : '▸'}</span>
                </button>
                {isOpen && (
                  <div className="route-body">
                    <p className="route-why">{t(s.why)}</p>
                    {s.tasks.map((task, j) => (
                      <Link key={j} to={task.to} className={'route-task' + (task.done ? ' done' : '')}>
                        <span className="task-check">{task.done ? '✅' : '⬜'}</span>
                        <span className="task-icon">{task.icon}</span>
                        <span className="task-label">{task.label ? t(task.label) : ''}</span>
                        {task.progress && !task.done && <span className="task-prog">{task.progress}</span>}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {doneCount === steps.length && (
        <div className="notice ok">
          🎉 {t({
            en: 'Route complete. From here, keep taking practice exams until you pass them comfortably.',
            tr: 'Rota tamamlandı. Buradan sonra rahatça geçene kadar deneme sınavlarına devam et.',
          })}
        </div>
      )}
    </div>
  );
}

// ---------------- Placement test: which level should I study? ----------------
export function Placement() {
  const t = useT();
  const nav = useNavigate();
  const [qs, setQs] = useState(null);
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [sel, setSel] = useState(null);

  useEffect(() => {
    // five reading questions per level, in increasing difficulty
    Promise.all(
      LEVELS.map((l) =>
        examFiles[`./data/exams/${l.id}/lezen.json`]().then((m) => {
          const data = m.default;
          return data.exams[0].slice(0, 5).map((q) => ({
            ...q,
            level: l.id,
            passage: q.pi != null ? data.texts[q.pi] : null,
          }));
        })
      )
    ).then((per) => setQs(per.flat()));
  }, []);

  if (!qs) return <div className="page">…</div>;

  const done = i >= qs.length;
  if (done) {
    const byLevel = LEVELS.map((l) => {
      const idx = qs.map((q, j) => (q.level === l.id ? j : -1)).filter((j) => j >= 0);
      const right = idx.filter((j) => answers[j] === qs[j].a).length;
      return { id: l.id, right, total: idx.length };
    });
    // highest level you got at least 3 of 5 right on
    const best = [...byLevel].reverse().find((x) => x.right >= 3) || byLevel[0];

    return (
      <div className="page narrow">
        <h1>🎯 {t({ en: 'Your result', tr: 'Sonucun' })}</h1>
        <div className="stat-row">
          {byLevel.map((b) => (
            <div key={b.id} className="stat"><b>{b.right}/{b.total}</b><span>{b.id}</span></div>
          ))}
        </div>
        <div className="notice ok">
          <b>{t({ en: `Start at ${best.id}.`, tr: `${best.id} ile başla.` })}</b>{' '}
          {t({
            en: 'This is only an indication from 15 reading questions — if it feels too easy or too hard, just switch level in the header.',
            tr: 'Bu sadece 15 okuma sorusundan çıkan bir tahmin — kolay ya da zor gelirse üstteki seviye düğmesinden değiştir.',
          })}
        </div>
        <div className="row-btns">
          <button className="btn" onClick={() => { setP('level', best.id); nav('/'); }}>
            {t({ en: `Study at ${best.id}`, tr: `${best.id} seviyesinde çalış` })}
          </button>
          <button className="btn ghost" onClick={() => { setI(0); setAnswers([]); setSel(null); }}>
            {t({ en: 'Try again', tr: 'Tekrar dene' })}
          </button>
        </div>
      </div>
    );
  }

  const q = qs[i];
  return (
    <div className="page narrow">
      <div className="exam-head">
        <span>🎯 {t({ en: 'Placement test', tr: 'Seviye testi' })}</span>
        <span>{i + 1}/{qs.length}</span>
      </div>
      <div className="bar"><div style={{ width: (i / qs.length) * 100 + '%' }} /></div>
      {q.passage && <div className="passage">{q.passage}</div>}
      <h2 className="qtext">{q.q}</h2>
      <div className="opts">
        {q.o.map((o, idx) => (
          <button key={idx} className={'opt ' + (sel === idx ? 'sel' : '')} onClick={() => setSel(idx)}>
            {String.fromCharCode(65 + idx)}. {o}
          </button>
        ))}
      </div>
      <button
        className="btn"
        disabled={sel === null}
        onClick={() => { setAnswers([...answers, sel]); setSel(null); setI(i + 1); }}
      >
        {i + 1 === qs.length ? t({ en: 'See result', tr: 'Sonucu gör' }) : t({ en: 'Next', tr: 'Sonraki' })} →
      </button>
    </div>
  );
}

// ---------------- Info: what each real exam looks like ----------------
export function Info() {
  const t = useT();
  const level = useActiveLevel();
  const S = ({ en, tr }) => <p>{t({ en, tr })}</p>;

  return (
    <div className="page narrow">
      <h1>ℹ️ {t({ en: 'Which exam do you need?', tr: 'Hangi sınava gireceksin?' })}</h1>
      <Link className="btn" to="/placement" style={{ display: 'inline-block', marginBottom: 12 }}>
        🎯 {t({ en: 'Not sure? Take the 15-question placement test', tr: 'Emin değil misin? 15 soruluk seviye testini çöz' })}
      </Link>
      <S
        en="There are two different Dutch exam systems. The inburgeringsexamen is the one the government requires after you move here; the Staatsexamen NT2 is the language certificate schools and employers ask for. This site prepares you for all three levels."
        tr="İki farklı Hollandaca sınav sistemi var. Inburgeringsexamen, Hollanda'ya yerleştikten sonra devletin zorunlu tuttuğu sınav; Staatsexamen NT2 ise okulların ve işverenlerin istediği dil sertifikası. Bu site her üç seviyeye de hazırlar."
      />

      <div className="lvl-cards">
        {LEVELS.map((l) => (
          <div key={l.id} className={'lvl-card' + (l.id === level ? ' on' : '')}>
            <h3>{l.id} <small>{t(l.exam)}</small></h3>
            <p>{t(l.goal)}</p>
            <p><small>
              {t({
                en: `Modules here: ${l.modules.join(', ')} · ${l.exams} practice exams each.`,
                tr: `Buradaki modüller: ${l.modules.join(', ')} · her biri ${l.exams} deneme sınavı.`,
              })}
            </small></p>
          </div>
        ))}
      </div>

      <h2>{t({ en: 'A2 — inburgeringsexamen', tr: 'A2 — inburgeringsexamen' })}</h2>
      <ul>
        <li><b>Lezen</b> — {t({ en: 'short texts: letters, signs, ads', tr: 'kısa metinler: mektup, tabela, ilan' })}</li>
        <li><b>Luisteren</b> — {t({ en: 'announcements and everyday conversations', tr: 'duyurular ve günlük konuşmalar' })}</li>
        <li><b>Schrijven</b> — {t({ en: 'forms and short messages', tr: 'form doldurma ve kısa mesajlar' })}</li>
        <li><b>Spreken</b> — {t({ en: 'answering everyday questions aloud', tr: 'günlük sorulara sesli cevap verme' })}</li>
        <li><b>KNM</b> — {t({ en: 'knowledge of Dutch society', tr: 'Hollanda toplumu bilgisi' })}</li>
        <li><b>MAP</b> — {t({ en: 'labour-market module, arranged with your municipality (the old ONA)', tr: 'iş piyasası modülü, belediyenle ayarlanır (eski ONA)' })}</li>
      </ul>

      <h2>{t({ en: 'B1 — the standard route since 2022', tr: 'B1 — 2022’den beri standart rota' })}</h2>
      <S
        en="Under the 2021 integration law (Wi2021) the B1-route is the default: you take the same four language parts plus KNM, but at B1 level, and you have three years. A2 is only allowed if you have made a demonstrable effort and B1 turns out to be out of reach. B1 also equals Staatsexamen NT2 Programma I, which is what mbo courses and most employers ask for."
        tr="2021 uyum yasasında (Wi2021) varsayılan rota B1: aynı dört dil bölümü artı KNM, ama B1 seviyesinde ve üç yıl süren. A2, ancak gösterilebilir çaba sonrası B1'e ulaşılamıyorsa mümkün. B1 aynı zamanda Staatsexamen NT2 Programma I demek — mbo eğitimlerinin ve çoğu işverenin istediği seviye."
      />

      <h2>{t({ en: 'B2 — Staatsexamen NT2 Programma II', tr: 'B2 — Staatsexamen NT2 Programma II' })}</h2>
      <S
        en="Programma II is the level hbo and university programmes require. There is no KNM part. The texts are abstract, the vocabulary is harder, and reflective and argumentative texts dominate: you are asked what the writer thinks, why a paragraph is there, what follows from an argument."
        tr="Programma II, hbo ve üniversite programlarının istediği seviyedir. KNM bölümü yoktur. Metinler soyut, kelime dağarcığı daha zor; beschouwende ve betogende (yorum ve tez) metinler ağır basar: yazarın ne düşündüğü, bir paragrafın işlevi, argümandan ne sonuç çıktığı sorulur."
      />

      <h2>{t({ en: 'The real Staatsexamen in numbers', tr: 'Gerçek Staatsexamen sayılarla' })}</h2>
      <table className="gram-table">
        <thead>
          <tr>
            <th>{t({ en: 'Part', tr: 'Bölüm' })}</th>
            <th>{t({ en: 'Time', tr: 'Süre' })}</th>
            <th>{t({ en: 'What you get', tr: 'Ne çıkar' })}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Lezen</td><td>100–110 min</td><td>{t({ en: '6 texts, 35–36 multiple-choice questions', tr: '6 metin, 35–36 çoktan seçmeli soru' })}</td></tr>
          <tr><td>Luisteren</td><td>90 min</td><td>{t({ en: 'about 40 questions, audio and video, played once', tr: 'yaklaşık 40 soru, ses ve video, tek sefer çalınır' })}</td></tr>
          <tr><td>Schrijven</td><td>100 min</td><td>{t({ en: 'sentence tasks + short and medium writing tasks', tr: 'cümle görevleri + kısa ve orta uzunlukta yazma görevleri' })}</td></tr>
          <tr><td>Spreken</td><td>~25 min</td><td>{t({ en: '16–17 spoken tasks of 20 sec to 2 min', tr: '20 saniye ile 2 dakika arası 16–17 konuşma görevi' })}</td></tr>
        </tbody>
      </table>
      <S
        en="You take every part on a computer at a DUO exam location. A dictionary is allowed for Lezen and Schrijven, not for the other parts. Each part is scored separately, so you can retake just the one you failed. Register and check the fees at duo.nl or inburgeren.nl."
        tr="Tüm bölümler DUO sınav merkezinde bilgisayarda yapılır. Lezen ve Schrijven'de sözlük serbest, diğerlerinde değil. Her bölüm ayrı puanlanır; sadece kalınan bölüme tekrar girilebilir. Kayıt ve ücretler için duo.nl veya inburgeren.nl."
      />

      <h2>{t({ en: 'Deadlines, fees and retakes', tr: 'Süreler, ücretler ve tekrar hakkı' })}</h2>
      <ul>
        <li>
          <b>{t({ en: 'Three years', tr: 'Üç yıl' })}</b> — {t({
            en: 'that is the integration deadline under the 2021 law. It starts when the municipality tells you your obligation begins.',
            tr: '2021 yasasına göre uyum süresi budur. Belediye yükümlülüğünün başladığını bildirdiğinde işlemeye başlar.',
          })}
        </li>
        <li>
          <b>{t({ en: 'Extension', tr: 'Uzatma' })}</b> — {t({
            en: 'DUO can extend the deadline for illness, pregnancy, a death in the family, a literacy course or other serious personal circumstances. Ask for it before the fine is final.',
            tr: 'DUO; hastalık, hamilelik, ailede vefat, okuma-yazma kursu ya da başka ciddi kişisel durumlar için süreyi uzatabilir. Cezan kesinleşmeden önce başvur.',
          })}
        </li>
        <li>
          <b>{t({ en: 'If you are late', tr: 'Geç kalırsan' })}</b> — {t({
            en: 'the fine starts around €340 and you get roughly two extra years to finish. Repeated delay costs more. A loan you took for lessons can be reclaimed.',
            tr: 'ceza yaklaşık 340 €’dan başlar ve bitirmek için yaklaşık iki yıl daha verilir. Tekrarlanan gecikme daha pahalıya mal olur. Ders için aldığın kredi geri istenebilir.',
          })}
        </li>
        <li>
          <b>{t({ en: 'Retakes', tr: 'Tekrar hakkı' })}</b> — {t({
            en: 'unlimited: you can resit a part as often as you need, but you pay the fee again each time, and a free exam slot can be more than six weeks away. Book early.',
            tr: 'sınırsız: bir bölüme istediğin kadar tekrar girebilirsin ama her seferinde ücreti tekrar ödersin ve boş sınav tarihi altı haftadan uzak olabilir. Erken randevu al.',
          })}
        </li>
        <li>
          <b>{t({ en: 'Fees', tr: 'Ücretler' })}</b> — {t({
            en: 'Staatsexamen NT2 costs about €50 per part, €200 for all four. If you are under the integration obligation you may have a free attempt or be able to pay from your DUO loan — Mijn DUO shows this automatically. Always check duo.nl for the current amounts.',
            tr: 'Staatsexamen NT2 bölüm başına yaklaşık 50 €, dördü birden 200 €. Uyum yükümlülüğün varsa ücretsiz hakkın olabilir veya DUO kredinden ödeyebilirsin — Mijn DUO bunu otomatik gösterir. Güncel tutarlar için duo.nl’ye bak.',
          })}
        </li>
        <li>
          <b>{t({ en: 'Where', tr: 'Nerede' })}</b> — {t({
            en: 'NT2 exams are held in Amsterdam, Eindhoven, Rijswijk, Rotterdam, Utrecht and Zwolle; inburgering exams at DUO locations across the country.',
            tr: 'NT2 sınavları Amsterdam, Eindhoven, Rijswijk, Rotterdam, Utrecht ve Zwolle’de; inburgering sınavları ülke genelindeki DUO merkezlerinde yapılır.',
          })}
        </li>
      </ul>
      <S
        en="Rules and prices change. This page is a summary to orient you, not legal advice — check duo.nl and inburgeren.nl, and ask your municipality or Het Juridisch Loket (free legal help) if something about your own situation is unclear."
        tr="Kurallar ve fiyatlar değişir. Bu sayfa yol göstermek içindir, hukuki tavsiye değildir — duo.nl ve inburgeren.nl’yi kontrol et; kendi durumunla ilgili belirsizlik varsa belediyene ya da Het Juridisch Loket’e (ücretsiz hukuki yardım) sor."
      />

      <h2>{t({ en: 'How to use this site', tr: 'Bu site nasıl kullanılır' })}</h2>
      <S
        en="Pick your level at the top of the page — words, grammar, exams and games all follow it. Start with the vocabulary and the grammar lessons, then do practice exams until you pass them comfortably. Speaking uses your microphone and Listening reads the text aloud, so use headphones and a quiet room."
        tr="Sayfanın üstünden seviyeni seç — kelimeler, gramer, sınavlar ve oyunlar buna göre değişir. Önce kelime ve gramer derslerini çalış, sonra rahatça geçene kadar deneme sınavı yap. Konuşma bölümü mikrofonunu kullanır, dinleme bölümü metni sesli okur; kulaklık ve sessiz bir ortam iyi olur."
      />
      <S
        en="Tips that work: 30 minutes every day beats three hours on Sunday. Listen to NOS Jeugdjournaal at A2/B1 and NOS Journaal or a Dutch podcast at B2. Read the letters your gemeente sends you word by word — the exam uses exactly that kind of text."
        tr="İşe yarayan ipuçları: her gün 30 dakika, pazar günü üç saatten iyidir. A2/B1 için NOS Jeugdjournaal, B2 için NOS Journaal veya Hollandaca bir podcast dinle. Belediyenden gelen mektupları kelime kelime oku — sınavda tam olarak bu tür metinler çıkar."
      />
      <S en="This site is free practice material and is not an official exam site." tr="Bu site ücretsiz alıştırma materyalidir, resmi sınav sitesi değildir." />
    </div>
  );
}
