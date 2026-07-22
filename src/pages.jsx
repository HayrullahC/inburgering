import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TURNSTILE_SITE_KEY } from './config.js';
import { supa, speak, stopSpeak, getP, setP, MODULES, PASS_PCT, hasSTT, listenOnce } from './lib.js';
import { useLang, useT, useUser } from './App.jsx';
import { VOCAB, CATS } from './data/vocab.js';
import { GRAMMAR } from './data/grammar.js';

const examFiles = import.meta.glob('./data/exams/*.json');

export function Speaker({ text, rate }) {
  return (
    <button className="spk" onClick={(e) => { e.stopPropagation(); speak(text, rate); }} title="🔊">
      🔊
    </button>
  );
}

// ---------------- Home ----------------
export function Home() {
  const lang = useLang();
  const t = useT();
  const fc = getP('fc', {});
  const known = Object.values(fc).filter((b) => b >= 3).length;
  const gramDone = GRAMMAR.filter((g) => getP('gram:' + g.id)).length;

  return (
    <div className="page">
      <div className="hero">
        <h1>{t({ en: 'Inburgering A2 Course', tr: 'Inburgering A2 Kursu' })}</h1>
        <p>
          {t({
            en: 'Free full preparation for the Dutch civic integration exam: 600 words, complete A2 grammar, 100 practice exams with audio, and word games. Progress is saved on this device — log in to sync across devices.',
            tr: 'Hollanda uyum sınavına ücretsiz tam hazırlık: 600 kelime, eksiksiz A2 grameri, sesli 100 deneme sınavı ve kelime oyunları. İlerleme bu cihazda kaydedilir — cihazlar arası senkron için giriş yapın.',
          })}
        </p>
      </div>

      <div className="stat-row">
        <div className="stat"><b>{known}</b><span>/{VOCAB.length} {t({ en: 'words learned', tr: 'öğrenilen kelime' })}</span></div>
        <div className="stat"><b>{gramDone}</b><span>/{GRAMMAR.length} {t({ en: 'grammar topics', tr: 'gramer konusu' })}</span></div>
        <div className="stat">
          <b>{MODULES.reduce((n, m) => n + countPassed(m.id), 0)}</b>
          <span>/100 {t({ en: 'exams passed', tr: 'geçilen sınav' })}</span>
        </div>
      </div>

      <h2>{t({ en: 'Exam modules', tr: 'Sınav modülleri' })}</h2>
      <div className="grid">
        {MODULES.map((m) => (
          <Link key={m.id} to={'/exams/' + m.id} className="card mod-card">
            <div className="mod-icon">{m.icon}</div>
            <h3>{m.nl}</h3>
            <p>{m[lang]}</p>
            <div className="bar"><div style={{ width: countPassed(m.id) * 5 + '%' }} /></div>
            <small>{countPassed(m.id)}/20</small>
          </Link>
        ))}
      </div>

      <h2>{t({ en: 'Quick start', tr: 'Hızlı başlangıç' })}</h2>
      <div className="grid">
        <Link className="card" to="/vocab"><h3>📚 {t({ en: '600 Words', tr: '600 Kelime' })}</h3><p>{t({ en: 'With pictures, audio and examples', tr: 'Görsel, ses ve örneklerle' })}</p></Link>
        <Link className="card" to="/grammar"><h3>🧩 {t({ en: 'Full A2 Grammar', tr: 'Tam A2 Grameri' })}</h3><p>{t({ en: GRAMMAR.length + ' complete lessons', tr: GRAMMAR.length + ' eksiksiz ders' })}</p></Link>
        <Link className="card" to="/games/flashcards"><h3>🃏 {t({ en: 'Flashcards', tr: 'Kelime Kartları' })}</h3><p>{t({ en: 'Smart repetition game', tr: 'Akıllı tekrar oyunu' })}</p></Link>
      </div>
    </div>
  );
}

function countPassed(mod) {
  let n = 0;
  for (let i = 1; i <= 20; i++) {
    const r = getP(`exam:${mod}:${i}`);
    if (r && (r.s / r.t) * 100 >= PASS_PCT) n++;
  }
  return n;
}

// ---------------- Vocab ----------------
export function Vocab() {
  const lang = useLang();
  const t = useT();
  const [cat, setCat] = useState('all');
  const [q, setQ] = useState('');

  const words = useMemo(() => {
    let w = VOCAB;
    if (cat !== 'all') w = w.filter((x) => x.cat === cat);
    if (q) {
      const s = q.toLowerCase();
      w = w.filter((x) => x.nl.toLowerCase().includes(s) || x.en.toLowerCase().includes(s) || x.tr.toLowerCase().includes(s));
    }
    return w;
  }, [cat, q]);

  return (
    <div className="page">
      <h1>📚 {t({ en: 'Vocabulary', tr: 'Kelime Haznesi' })} <small>({VOCAB.length})</small></h1>
      <div className="filter-row">
        <input placeholder={t({ en: 'Search…', tr: 'Ara…' })} value={q} onChange={(e) => setQ(e.target.value)} />
        <select value={cat} onChange={(e) => setCat(e.target.value)}>
          <option value="all">{t({ en: 'All categories', tr: 'Tüm kategoriler' })}</option>
          {CATS.map((c) => (
            <option key={c.id} value={c.id}>{c.icon} {c[lang]}</option>
          ))}
        </select>
      </div>
      <div className="grid vocab-grid">
        {words.map((w) => (
          <div key={w.id} className="card word-card" onClick={() => speak(w.nl)}>
            <div className="word-emoji">{w.emoji}</div>
            <div className="word-nl">{w.nl} <Speaker text={w.nl} /></div>
            <div className="word-tr">{lang === 'tr' ? w.tr : w.en}</div>
            <div className="word-ex">{w.ex} <Speaker text={w.ex} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------- Grammar ----------------
export function Grammar() {
  const t = useT();
  return (
    <div className="page">
      <h1>🧩 {t({ en: 'A2 Grammar — complete', tr: 'A2 Grameri — eksiksiz' })}</h1>
      <div className="lesson-list">
        {GRAMMAR.map((g, i) => (
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
  return (
    <div className="page">
      <h1>📝 {t({ en: 'Practice exams', tr: 'Deneme sınavları' })}</h1>
      <p>{t({ en: '5 modules × 20 exams × 25 questions. Pass mark: ' + PASS_PCT + '%.', tr: '5 modül × 20 sınav × 25 soru. Geçme notu: %' + PASS_PCT + '.' })}</p>
      <div className="grid">
        {MODULES.map((m) => (
          <Link key={m.id} to={'/exams/' + m.id} className="card mod-card">
            <div className="mod-icon">{m.icon}</div>
            <h3>{m.nl}</h3>
            <p>{m[lang]}</p>
            <div className="bar"><div style={{ width: countPassed(m.id) * 5 + '%' }} /></div>
            <small>{countPassed(m.id)}/20 {t({ en: 'passed', tr: 'geçildi' })}</small>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function ExamList() {
  const { mod } = useParams();
  const t = useT();
  const m = MODULES.find((x) => x.id === mod);
  if (!m) return null;
  return (
    <div className="page">
      <Link to="/exams">← {t({ en: 'Modules', tr: 'Modüller' })}</Link>
      <h1>{m.icon} {m.nl}</h1>
      <div className="exam-grid">
        {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => {
          const r = getP(`exam:${mod}:${n}`);
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
  const [qs, setQs] = useState(null);
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [sel, setSel] = useState(null);
  const [done, setDone] = useState(false);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    const loader = examFiles[`./data/exams/${mod}.json`];
    if (!loader) return;
    loader().then((m) => setQs(m.default[Number(n) - 1]));
    return stopSpeak;
  }, [mod, n]);

  if (!qs) return <div className="page">…</div>;
  if (mod === 'schrijven' || mod === 'spreken') return <OpenRunner key={mod + n} mod={mod} n={n} qs={qs} />;

  const q = qs[i];
  const isListening = !!q.l;

  function pick(idx) {
    setSel(idx);
  }
  function next() {
    const a2 = [...answers, sel];
    setAnswers(a2);
    setSel(null);
    setPlayed(false);
    stopSpeak();
    if (i + 1 < qs.length) setI(i + 1);
    else finish(a2);
  }
  function finish(a2) {
    const score = a2.filter((a, j) => a === qs[j].a).length;
    const key = `exam:${mod}:${n}`;
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
            {qq.p && <div className="passage small">{qq.p}</div>}
            {qq.l && <div className="passage small">🎧 {qq.l}</div>}
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

      {q.p && <div className="passage">{q.p} <Speaker text={q.p} /></div>}
      {isListening && (
        <div className="listen-box">
          <button className="btn big" onClick={() => { speak(q.l, 0.85); setPlayed(true); }}>
            ▶ {t({ en: 'Play audio', tr: 'Sesi çal' })}
          </button>
          {!played && <p><small>{t({ en: 'Listen first, then answer.', tr: 'Önce dinle, sonra cevapla.' })}</small></p>}
        </div>
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

function OpenRunner({ mod, n, qs }) {
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
      const key = `exam:${mod}:${n}`;
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
      {q.sc && <div className="scene">{q.sc}</div>}
      {q.l && (
        <div className="listen-box">
          <button className="btn big" onClick={() => speak(q.l, 0.85)}>▶ {t({ en: 'Play', tr: 'Dinle' })}</button>
        </div>
      )}

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
          {!fb.self && <p><b>{fb.ok ? '✔ ' + t({ en: 'Looks good!', tr: 'İyi görünüyor!' }) : '✘ ' + t({ en: 'Not all criteria found.', tr: 'Bazı kriterler eksik.' })}</b></p>}
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
        const redirectTo = location.origin + location.pathname + '#/reset';
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

  async function submit(e) {
    e.preventDefault();
    const { error } = await supa.auth.updateUser({ password: pw });
    if (error) setMsg(error.message);
    else nav('/');
  }

  if (!supa) return null;
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

// ---------------- Info (exam structure + ONA) ----------------
export function Info() {
  const t = useT();
  const S = ({ en, tr }) => <p>{t({ en, tr })}</p>;
  return (
    <div className="page narrow">
      <h1>ℹ️ {t({ en: 'The Inburgering exam', tr: 'Inburgering sınavı' })}</h1>
      <S en="The civic integration exam (inburgeringsexamen) at A2 level consists of these parts:" tr="A2 seviyesindeki uyum sınavı (inburgeringsexamen) şu bölümlerden oluşur:" />
      <ul>
        <li><b>Lezen</b> — {t({ en: 'reading short texts (letters, signs, ads)', tr: 'kısa metinleri okuma (mektup, tabela, ilan)' })}</li>
        <li><b>Luisteren</b> — {t({ en: 'listening to announcements and conversations', tr: 'duyuru ve konuşmaları dinleme' })}</li>
        <li><b>Schrijven</b> — {t({ en: 'writing: filling forms, short messages', tr: 'yazma: form doldurma, kısa mesajlar' })}</li>
        <li><b>Spreken</b> — {t({ en: 'speaking: answering everyday questions', tr: 'konuşma: günlük sorulara cevap verme' })}</li>
        <li><b>KNM</b> — {t({ en: 'knowledge of Dutch society', tr: 'Hollanda toplumu bilgisi' })}</li>
        <li><b>ONA / MAP</b> — {t({ en: 'orientation on the Dutch labour market (portfolio or exemption via work). Under the 2021 law (Wi2021) this is the MAP module arranged with your municipality.', tr: 'Hollanda iş piyasası oryantasyonu (portfolyo veya çalışma yoluyla muafiyet). 2021 yasasında (Wi2021) bu, belediyenle ayarlanan MAP modülüdür.' })}</li>
      </ul>
      <S en="Exams are taken at DUO exam locations on a computer. You can register and see fees at inburgeren.nl. Each part is scored separately; you can retake single parts." tr="Sınavlar DUO sınav merkezlerinde bilgisayarda yapılır. Kayıt ve ücretler için inburgeren.nl adresine bakın. Her bölüm ayrı puanlanır; tek tek yeniden girilebilir." />
      <S en="Tips: practice every day for 30 minutes, listen to Dutch radio/TV (NOS Jeugdjournaal is great for A2), and read letters from your gemeente carefully — the exam uses exactly that kind of text." tr="İpuçları: her gün 30 dakika çalışın, Hollandaca radyo/TV dinleyin (NOS Jeugdjournaal A2 için ideal), belediyeden gelen mektupları dikkatle okuyun — sınavda tam olarak bu tür metinler çıkar." />
      <S en="This site is free practice material and is not an official exam site." tr="Bu site ücretsiz alıştırma materyalidir, resmi sınav sitesi değildir." />
    </div>
  );
}
