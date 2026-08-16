import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { speak, stopSpeak, getP, setP, shuffle } from './lib.js';
import { useLang, useT } from './App.jsx';
import { vocabFor, grammarFor } from './data/index.js';
import { VERBS } from './data/verbs.js';

// Every game works on the words of the level the user is currently studying.
const lw = () => vocabFor(getP('level', 'A2'));

export function GamesHome() {
  const t = useT();
  const level = getP('level', 'A2');
  const games = [
    { to: '/games/flashcards', icon: '🃏', en: 'Flashcards', tr: 'Kelime Kartları', den: 'Smart repetition: cards you miss come back more often.', dtr: 'Akıllı tekrar: bilemediğin kartlar daha sık gelir.' },
    { to: '/games/match', icon: '🧩', en: 'Match pairs', tr: 'Eşleştirme', den: 'Match Dutch words with their translation.', dtr: 'Hollandaca kelimeyi çevirisiyle eşleştir.' },
    { to: '/games/sprint', icon: '⚡', en: 'Word sprint', tr: 'Kelime Sprinti', den: '60 seconds, as many correct answers as you can.', dtr: '60 saniyede olabildiğince çok doğru.' },
    { to: '/games/spell', icon: '⌨️', en: 'Type the word', tr: 'Kelimeyi Yaz', den: 'See the picture, type the Dutch word.', dtr: 'Görseli gör, Hollandacasını yaz.' },
    { to: '/games/sentence', icon: '🔤', en: 'Sentence builder', tr: 'Cümle Kurma', den: 'Put the words in the right Dutch order.', dtr: 'Kelimeleri doğru Hollandaca sıraya diz.' },
    { to: '/games/article', icon: '🚦', en: 'De or het?', tr: 'De mi het mi?', den: 'The fastest way to drill Dutch articles.', dtr: 'Tanımlıkları çalışmanın en hızlı yolu.' },
    { to: '/games/verbs', icon: '🔀', en: 'Verb forms', tr: 'Fiil Çekimleri', den: 'Irregular past tenses and participles.', dtr: 'Düzensiz geçmiş zaman ve sıfat-fiiller.' },
    { to: '/games/dictation', icon: '🎧', en: 'Dictation', tr: 'Dikte', den: 'Listen and type exactly what you hear.', dtr: 'Dinle ve duyduğunu birebir yaz.' },
    { to: '/games/idioms', icon: '💬', en: 'Meaning match', tr: 'Anlam Eşleştirme', den: 'Expressions and difficult words: pick the meaning.', dtr: 'Deyimler ve zor kelimeler: anlamını seç.' },
  ];
  return (
    <div className="page">
      <h1>🎮 {t({ en: 'Games', tr: 'Oyunlar' })} <small>{level}</small></h1>
      <div className="grid">
        {games.map((g) => (
          <Link key={g.to} to={g.to} className="card">
            <div className="mod-icon">{g.icon}</div>
            <h3>{t({ en: g.en, tr: g.tr })}</h3>
            <p>{t({ en: g.den, tr: g.dtr })}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ---------------- Flashcards (spaced repetition lite) ----------------
export function Flashcards() {
  const lang = useLang();
  const t = useT();
  const [queue, setQueue] = useState(null);
  const [flip, setFlip] = useState(false);
  const [doneCount, setDoneCount] = useState(0);

  useEffect(() => {
    const fc = getP('fc', {});
    // lowest box first, then shuffle within, take 20
    const sorted = shuffle(lw()).sort((a, b) => (fc[a.id] || 0) - (fc[b.id] || 0));
    setQueue(sorted.slice(0, 20));
  }, []);

  if (!queue) return null;
  if (queue.length === 0) {
    return (
      <div className="page narrow" style={{ textAlign: 'center' }}>
        <h1>🎉 {t({ en: 'Session done!', tr: 'Oturum bitti!' })}</h1>
        <p>{doneCount} {t({ en: 'cards reviewed.', tr: 'kart çalışıldı.' })}</p>
        <button className="btn" onClick={() => location.reload()}>{t({ en: 'New session', tr: 'Yeni oturum' })}</button>
      </div>
    );
  }

  const w = queue[0];
  function grade(good) {
    const fc = { ...getP('fc', {}) };
    fc[w.id] = good ? Math.min((fc[w.id] || 0) + 1, 5) : 0;
    setP('fc', fc);
    setFlip(false);
    setDoneCount(doneCount + 1);
    // wrong cards go to the back of this session's queue
    setQueue(good ? queue.slice(1) : [...queue.slice(1), w]);
  }

  return (
    <div className="page narrow">
      <div className="exam-head"><span>🃏 Flashcards</span><span>{queue.length} {t({ en: 'left', tr: 'kaldı' })}</span></div>
      <div className="fc-card" onClick={() => { setFlip(!flip); if (!flip) speak(w.nl); }}>
        {!flip ? (
          <>
            <div className="fc-emoji">{w.emoji}</div>
            <div className="fc-word">{w.nl}</div>
            <div className="fc-hint">{t({ en: 'tap to flip', tr: 'çevirmek için dokun' })}</div>
          </>
        ) : (
          <>
            <div className="fc-emoji">{w.emoji}</div>
            <div className="fc-word">{lang === 'tr' ? w.tr : w.en}</div>
            <div>{w.ex}</div>
            <div className="fc-hint">{w.nl}</div>
          </>
        )}
      </div>
      {flip && (
        <div className="fc-btns">
          <button className="btn again" onClick={() => grade(false)}>✘ {t({ en: 'Again', tr: 'Tekrar' })}</button>
          <button className="btn good" onClick={() => grade(true)}>✔ {t({ en: 'I knew it', tr: 'Bildim' })}</button>
        </div>
      )}
    </div>
  );
}

// ---------------- Match pairs ----------------
export function MatchGame() {
  const lang = useLang();
  const t = useT();
  const [tiles, setTiles] = useState([]);
  const [sel, setSel] = useState(null);
  const [wrong, setWrong] = useState(null);
  const [matched, setMatched] = useState(new Set());
  const [start, setStart] = useState(Date.now());
  const [now, setNow] = useState(Date.now());

  function newGame() {
    const words = shuffle(lw()).slice(0, 8);
    const ts = shuffle([
      ...words.map((w) => ({ pair: w.id, label: w.nl, key: 'nl' + w.id })),
      ...words.map((w) => ({ pair: w.id, label: lang === 'tr' ? w.tr : w.en, key: 'tr' + w.id })),
    ]);
    setTiles(ts);
    setMatched(new Set());
    setSel(null);
    setStart(Date.now());
  }
  useEffect(newGame, [lang]);
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(id);
  }, []);

  const doneAll = tiles.length > 0 && matched.size === tiles.length;
  const secs = Math.floor(((doneAll ? now : Date.now()) - start) / 1000);

  function click(tile) {
    if (matched.has(tile.key)) return;
    if (!sel) return setSel(tile);
    if (sel.key === tile.key) return setSel(null);
    if (sel.pair === tile.pair) {
      const m = new Set(matched);
      m.add(sel.key);
      m.add(tile.key);
      setMatched(m);
      setSel(null);
      speak(lw().find((w) => w.id === tile.pair).nl);
    } else {
      setWrong([sel.key, tile.key]);
      setTimeout(() => setWrong(null), 400);
      setSel(null);
    }
  }

  return (
    <div className="page narrow">
      <div className="exam-head"><span>🧩 {t({ en: 'Match pairs', tr: 'Eşleştirme' })}</span><span>⏱ {secs}s</span></div>
      {doneAll ? (
        <div style={{ textAlign: 'center' }}>
          <h1>🎉 {secs}s</h1>
          <button className="btn" onClick={newGame}>{t({ en: 'Play again', tr: 'Tekrar oyna' })}</button>
        </div>
      ) : (
        <div className="match-grid">
          {tiles.map((tile) => (
            <div
              key={tile.key}
              className={
                'match-tile ' +
                (matched.has(tile.key) ? 'done ' : '') +
                (sel?.key === tile.key ? 'sel ' : '') +
                (wrong?.includes(tile.key) ? 'wrong' : '')
              }
              onClick={() => click(tile)}
            >
              {tile.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------- Word sprint (60s) ----------------
export function Sprint() {
  const lang = useLang();
  const t = useT();
  const [time, setTime] = useState(60);
  const [score, setScore] = useState(0);
  const [q, setQ] = useState(null);
  const [over, setOver] = useState(false);

  function nextQ() {
    const w = lw()[Math.floor(Math.random() * lw().length)];
    const wrong = shuffle(lw().filter((x) => x.id !== w.id)).slice(0, 3);
    setQ({ w, opts: shuffle([w, ...wrong]) });
  }
  useEffect(nextQ, []);
  useEffect(() => {
    if (over) return;
    const id = setInterval(() => setTime((s) => {
      if (s <= 1) { setOver(true); clearInterval(id); return 0; }
      return s - 1;
    }), 1000);
    return () => clearInterval(id);
  }, [over]);

  useEffect(() => {
    if (over) {
      const best = getP('game:sprint', 0);
      if (score > best) setP('game:sprint', score);
    }
  }, [over]);

  if (!q) return null;
  if (over) {
    return (
      <div className="page narrow" style={{ textAlign: 'center' }}>
        <h1>⚡ {score}</h1>
        <p>{t({ en: 'Best', tr: 'Rekor' })}: {Math.max(score, getP('game:sprint', 0))}</p>
        <button className="btn" onClick={() => { setScore(0); setTime(60); setOver(false); nextQ(); }}>
          {t({ en: 'Play again', tr: 'Tekrar oyna' })}
        </button>
      </div>
    );
  }

  function answer(opt) {
    if (opt.id === q.w.id) { setScore(score + 1); speak(q.w.nl); }
    nextQ();
  }

  return (
    <div className="page narrow">
      <div className="sprint-head"><span>⏱ {time}</span><span>⚡ {score}</span></div>
      <div className="fc-card" style={{ cursor: 'default', minHeight: 160 }}>
        <div className="fc-emoji">{q.w.emoji}</div>
        <div className="fc-word">{lang === 'tr' ? q.w.tr : q.w.en}</div>
      </div>
      <div className="opts" style={{ marginTop: 14 }}>
        {q.opts.map((o) => (
          <button key={o.id} className="opt" onClick={() => answer(o)}>{o.nl}</button>
        ))}
      </div>
    </div>
  );
}

// ---------------- Type the word ----------------
export function Spell() {
  const lang = useLang();
  const t = useT();
  const [round, setRound] = useState(0);
  const [w, setW] = useState(() => lw()[Math.floor(Math.random() * lw().length)]);
  const [val, setVal] = useState('');
  const [state, setState] = useState(null); // null | 'ok' | 'err'
  const [score, setScore] = useState(0);
  const inputRef = useRef(null);

  // lowercase, strip accents, collapse spaces — 'een' matches 'één'
  function norm(s) {
    return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ').trim();
  }
  function check() {
    if (state) return;
    const target = norm(w.nl);
    // accept the word with its correct article or without one; a wrong article is wrong
    const ok = norm(val) === target || norm(val) === target.replace(/^(de|het) /, '');
    setState(ok ? 'ok' : 'err');
    if (ok) setScore(score + 1);
    speak(w.nl);
    setTimeout(() => {
      setState(null);
      setVal('');
      setW(lw()[Math.floor(Math.random() * lw().length)]);
      setRound(round + 1);
      inputRef.current?.focus();
    }, ok ? 900 : 2000);
  }

  if (round >= 10) {
    return (
      <div className="page narrow" style={{ textAlign: 'center' }}>
        <h1>⌨️ {score}/10</h1>
        <button className="btn" onClick={() => { setRound(0); setScore(0); }}>{t({ en: 'Play again', tr: 'Tekrar oyna' })}</button>
      </div>
    );
  }

  return (
    <div className="page narrow" style={{ textAlign: 'center' }}>
      <div className="exam-head"><span>⌨️ {t({ en: 'Type the word', tr: 'Kelimeyi yaz' })}</span><span>{round + 1}/10 · ⭐ {score}</span></div>
      <div className="fc-card" style={{ cursor: 'default', minHeight: 150 }}>
        <div className="fc-emoji">{w.emoji}</div>
        <div className="fc-word">{lang === 'tr' ? w.tr : w.en}</div>
        {state === 'err' && <div style={{ color: 'var(--err)', fontWeight: 700 }}>{w.nl}</div>}
      </div>
      <div style={{ marginTop: 14 }}>
        <input
          ref={inputRef}
          className={'spell-input ' + (state || '')}
          value={val}
          placeholder="…"
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && check()}
          autoFocus
        />
      </div>
      <button className="btn" style={{ marginTop: 12 }} onClick={check}>OK</button>
    </div>
  );
}

// ---------------- shared helpers for the newer games ----------------
const norm = (s) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

function Score({ score, total, best }) {
  return (
    <div className="sprint-head">
      <span>✅ {score}/{total}</span>
      {best != null && <span>🏆 {best}</span>}
    </div>
  );
}

// ---------------- Sentence builder (word order) ----------------
export function Sentence() {
  const t = useT();
  const lang = useLang();
  const level = getP('level', 'A2');
  const [item, setItem] = useState(null);
  const [pick, setPick] = useState([]);
  const [pool, setPool] = useState([]);
  const [state, setState] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  const bank = useMemo(() => {
    const fromGrammar = grammarFor(level).flatMap((g) =>
      g.ex.filter((e) => e.nl.split(' ').length >= 4 && e.nl.split(' ').length <= 10)
        .map((e) => ({ nl: e.nl, en: e.en, tr: e.tr })));
    const fromWords = lw()
      .filter((w) => w.ex.split(' ').length >= 4 && w.ex.split(' ').length <= 10)
      .map((w) => ({ nl: w.ex }));
    return [...fromGrammar, ...fromWords];
  }, [level]);

  function nextRound() {
    const s = bank[Math.floor(Math.random() * bank.length)];
    setItem(s);
    setPool(shuffle(s.nl.replace(/\s+/g, ' ').trim().split(' ')));
    setPick([]);
    setState(null);
  }
  useEffect(() => { if (bank.length) nextRound(); }, [bank]);

  if (!item) return <div className="page">…</div>;

  function check() {
    const ok = pick.join(' ') === item.nl.replace(/\s+/g, ' ').trim();
    setState(ok ? 'ok' : 'err');
    setTotal(total + 1);
    if (ok) { setScore(score + 1); speak(item.nl); }
  }

  return (
    <div className="page narrow">
      <Link to="/games">← {t({ en: 'Games', tr: 'Oyunlar' })}</Link>
      <h1>🔤 {t({ en: 'Sentence builder', tr: 'Cümle Kurma' })}</h1>
      <Score score={score} total={total} />
      <p>{t({ en: 'Tap the words in the correct order.', tr: 'Kelimelere doğru sırayla dokun.' })}</p>
      {(item.en || item.tr) && <p className="fc-hint">{lang === 'tr' ? item.tr : item.en}</p>}

      <div className={'build-line ' + (state || '')}>
        {pick.length === 0 ? <span className="fc-hint">…</span> : pick.map((w, i) => (
          <button key={i} className="chip" onClick={() => !state && setPick(pick.filter((_, j) => j !== i))}>{w}</button>
        ))}
      </div>

      <div className="chip-pool">
        {pool.map((w, i) => (
          <button
            key={i}
            className="chip"
            disabled={!!state || pick.filter((x) => x === w).length >= pool.filter((x) => x === w).length}
            onClick={() => setPick([...pick, w])}
          >
            {w}
          </button>
        ))}
      </div>

      {!state ? (
        <button className="btn" disabled={pick.length !== pool.length} onClick={check}>
          {t({ en: 'Check', tr: 'Kontrol et' })}
        </button>
      ) : (
        <div>
          <div className={'notice ' + (state === 'ok' ? 'ok' : 'err')}>
            {state === 'ok'
              ? '✔ ' + t({ en: 'Correct!', tr: 'Doğru!' })
              : '✘ ' + item.nl}
          </div>
          <button className="btn" onClick={nextRound}>{t({ en: 'Next', tr: 'Sonraki' })} →</button>
        </div>
      )}
    </div>
  );
}

// ---------------- De or het ----------------
export function Article() {
  const t = useT();
  const lang = useLang();
  const level = getP('level', 'A2');
  const nouns = useMemo(() => lw().filter((w) => /^(de|het) \S+$/i.test(w.nl)), [level]);
  const [w, setW] = useState(null);
  const [state, setState] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const best = getP('hs:article', 0);

  const next = () => { setW(nouns[Math.floor(Math.random() * nouns.length)]); setState(null); };
  useEffect(() => { if (nouns.length) next(); }, [nouns]);

  if (!w) return <div className="page">…</div>;
  const correct = w.nl.split(' ')[0].toLowerCase();

  function answer(a) {
    if (state) return;
    const ok = a === correct;
    setState(ok ? 'ok' : 'err');
    setTotal(total + 1);
    if (ok) {
      const s = score + 1;
      setScore(s);
      if (s > best) setP('hs:article', s);
      speak(w.nl);
    } else {
      setScore(0);
    }
    setTimeout(next, ok ? 500 : 1600);
  }

  return (
    <div className="page narrow" style={{ textAlign: 'center' }}>
      <Link to="/games">← {t({ en: 'Games', tr: 'Oyunlar' })}</Link>
      <h1>🚦 {t({ en: 'De or het?', tr: 'De mi het mi?' })}</h1>
      <div className="sprint-head">
        <span>🔥 {score}</span>
        <span>{total} {t({ en: 'played', tr: 'soru' })}</span>
        <span>🏆 {best}</span>
      </div>
      <div className="fc-card" style={{ minHeight: 180 }}>
        <div className="fc-emoji">{w.emoji}</div>
        <div className="fc-word">{w.nl.replace(/^(de|het) /i, '')}</div>
        <div className="fc-hint">{lang === 'tr' ? w.tr : w.en}</div>
        {state && (
          <div className={state === 'ok' ? 'art-ok' : 'art-err'}>
            {state === 'ok' ? '✔' : '✘ ' + w.nl}
          </div>
        )}
      </div>
      <div className="art-btns">
        <button className="btn big" onClick={() => answer('de')}>de</button>
        <button className="btn big ghost" onClick={() => answer('het')}>het</button>
      </div>
      <p><small>{t({ en: 'About two thirds of Dutch nouns take "de".', tr: 'Hollandaca isimlerin yaklaşık üçte ikisi "de" alır.' })}</small></p>
    </div>
  );
}

// ---------------- Verb forms ----------------
export function VerbGame() {
  const t = useT();
  const lang = useLang();
  const level = getP('level', 'A2');
  // verbs are cumulative: at B2 you still need the A2 irregulars
  const pool = useMemo(() => {
    const upto = { A2: ['A2'], B1: ['A2', 'B1'], B2: ['A2', 'B1', 'B2'] }[level] || ['A2'];
    return VERBS.filter((v) => upto.includes(v.level) && v.part !== '—');
  }, [level]);
  const [q, setQ] = useState(null);
  const [sel, setSel] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  function next() {
    const v = pool[Math.floor(Math.random() * pool.length)];
    const field = Math.random() < 0.5 ? 'imp' : 'part';
    const wrongs = shuffle(pool.filter((x) => x.inf !== v.inf && x[field] !== v[field]))
      .slice(0, 3)
      .map((x) => x[field]);
    setQ({ v, field, options: shuffle([v[field], ...wrongs]) });
    setSel(null);
  }
  useEffect(() => { if (pool.length) next(); }, [pool]);

  if (!q) return <div className="page">…</div>;
  const correct = q.v[q.field];

  function answer(o) {
    if (sel) return;
    setSel(o);
    setTotal(total + 1);
    if (o === correct) {
      setScore(score + 1);
      speak(q.field === 'imp' ? correct : `${q.v.aux === 'zijn' ? 'is' : 'heeft'} ${correct}`);
    }
  }

  return (
    <div className="page narrow">
      <Link to="/games">← {t({ en: 'Games', tr: 'Oyunlar' })}</Link>
      <h1>🔀 {t({ en: 'Verb forms', tr: 'Fiil Çekimleri' })}</h1>
      <Score score={score} total={total} />
      <div className="fc-card" style={{ minHeight: 150 }}>
        <div className="fc-word">{q.v.inf}</div>
        <div className="fc-hint">{lang === 'tr' ? q.v.tr : q.v.en}</div>
        <div className="verb-ask">
          {q.field === 'imp'
            ? t({ en: 'simple past (imperfectum): ik …', tr: 'geçmiş zaman (imperfectum): ik …' })
            : t({ en: `past participle: ik ${q.v.aux === 'zijn' ? 'ben' : 'heb'} …`, tr: `sıfat-fiil (participium): ik ${q.v.aux === 'zijn' ? 'ben' : 'heb'} …` })}
        </div>
      </div>
      <div className="opts">
        {q.options.map((o) => (
          <button
            key={o}
            className={'opt' + (sel ? (o === correct ? ' good-opt' : o === sel ? ' bad-opt' : '') : '')}
            onClick={() => answer(o)}
          >
            {o}
          </button>
        ))}
      </div>
      {sel && (
        <div>
          <div className="notice">
            {q.v.inf} — {q.v.imp} / {q.v.impPl} — {q.v.aux === 'zijn' ? 'is' : 'heeft'} {q.v.part}
          </div>
          <button className="btn" onClick={next}>{t({ en: 'Next', tr: 'Sonraki' })} →</button>
        </div>
      )}
    </div>
  );
}

// ---------------- Dictation ----------------
export function Dictation() {
  const t = useT();
  const level = getP('level', 'A2');
  const bank = useMemo(() => {
    const g = grammarFor(level).flatMap((x) => x.ex.map((e) => e.nl));
    const v = lw().map((w) => w.ex);
    return [...g, ...v].filter((s) => s.split(' ').length >= 4);
  }, [level]);
  const [s, setS] = useState('');
  const [val, setVal] = useState('');
  const [state, setState] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const ref = useRef(null);

  function next() {
    const pickOne = bank[Math.floor(Math.random() * bank.length)];
    setS(pickOne);
    setVal('');
    setState(null);
    setTimeout(() => { speak(pickOne, 0.85); ref.current?.focus(); }, 200);
  }
  useEffect(() => { if (bank.length) next(); return stopSpeak; }, [bank]);

  function check() {
    if (state) return;
    const ok = norm(val) === norm(s);
    setState(ok ? 'ok' : 'err');
    setTotal(total + 1);
    if (ok) setScore(score + 1);
  }

  return (
    <div className="page narrow" style={{ textAlign: 'center' }}>
      <Link to="/games">← {t({ en: 'Games', tr: 'Oyunlar' })}</Link>
      <h1>🎧 {t({ en: 'Dictation', tr: 'Dikte' })}</h1>
      <Score score={score} total={total} />
      <p>{t({ en: 'Listen and type the sentence. Spelling counts, punctuation does not.', tr: 'Dinle ve cümleyi yaz. Yazım önemli, noktalama değil.' })}</p>
      <div className="row-btns" style={{ justifyContent: 'center' }}>
        <button className="btn big" onClick={() => speak(s, 0.85)}>▶ {t({ en: 'Play', tr: 'Çal' })}</button>
        <button className="btn ghost" onClick={() => speak(s, 0.6)}>🐢 {t({ en: 'Slower', tr: 'Yavaş' })}</button>
      </div>
      <textarea
        ref={ref}
        className={'write-area dictee ' + (state || '')}
        rows={3}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); state ? next() : check(); } }}
        placeholder={t({ en: 'Type what you hear…', tr: 'Duyduğunu yaz…' })}
      />
      {!state ? (
        <button className="btn" disabled={!val.trim()} onClick={check}>{t({ en: 'Check', tr: 'Kontrol et' })}</button>
      ) : (
        <div>
          <div className={'notice ' + (state === 'ok' ? 'ok' : 'err')}>
            {state === 'ok' ? '✔ ' + t({ en: 'Exactly right!', tr: 'Tam doğru!' }) : '✘ ' + s}
          </div>
          <button className="btn" onClick={next}>{t({ en: 'Next', tr: 'Sonraki' })} →</button>
        </div>
      )}
    </div>
  );
}

// ---------------- Meaning match (idioms & hard words) ----------------
export function Idioms() {
  const t = useT();
  const lang = useLang();
  const level = getP('level', 'A2');
  const pool = useMemo(() => {
    const words = lw();
    const focus = words.filter((w) => ['idioms', 'social', 'connectors', 'abstract', 'academic'].includes(w.cat));
    return focus.length >= 8 ? focus : words;
  }, [level]);
  const [q, setQ] = useState(null);
  const [sel, setSel] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  const meaning = (w) => (lang === 'tr' ? w.tr : w.en);

  function next() {
    const w = pool[Math.floor(Math.random() * pool.length)];
    const wrongs = shuffle(pool.filter((x) => x.id !== w.id)).slice(0, 3);
    setQ({ w, options: shuffle([w, ...wrongs]) });
    setSel(null);
  }
  useEffect(() => { if (pool.length) next(); }, [pool]);

  if (!q) return <div className="page">…</div>;

  function answer(o) {
    if (sel) return;
    setSel(o);
    setTotal(total + 1);
    if (o.id === q.w.id) setScore(score + 1);
    speak(q.w.nl);
  }

  return (
    <div className="page narrow">
      <Link to="/games">← {t({ en: 'Games', tr: 'Oyunlar' })}</Link>
      <h1>💬 {t({ en: 'Meaning match', tr: 'Anlam Eşleştirme' })}</h1>
      <Score score={score} total={total} />
      <div className="fc-card" style={{ minHeight: 140 }}>
        <div className="fc-emoji">{q.w.emoji}</div>
        <div className="fc-word">{q.w.nl}</div>
      </div>
      <div className="opts">
        {q.options.map((o) => (
          <button
            key={o.id}
            className={'opt' + (sel ? (o.id === q.w.id ? ' good-opt' : o.id === sel.id ? ' bad-opt' : '') : '')}
            onClick={() => answer(o)}
          >
            {meaning(o)}
          </button>
        ))}
      </div>
      {sel && (
        <div>
          <div className="notice"><i>{q.w.ex}</i> <button className="spk" onClick={() => speak(q.w.ex)}>🔊</button></div>
          <button className="btn" onClick={next}>{t({ en: 'Next', tr: 'Sonraki' })} →</button>
        </div>
      )}
    </div>
  );
}
