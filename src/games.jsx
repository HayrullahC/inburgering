import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { speak, getP, setP, shuffle } from './lib.js';
import { useLang, useT } from './App.jsx';
import { VOCAB } from './data/vocab.js';

export function GamesHome() {
  const t = useT();
  const games = [
    { to: '/games/flashcards', icon: '🃏', en: 'Flashcards', tr: 'Kelime Kartları', den: 'Smart repetition: cards you miss come back more often.', dtr: 'Akıllı tekrar: bilemediğin kartlar daha sık gelir.' },
    { to: '/games/match', icon: '🧩', en: 'Match pairs', tr: 'Eşleştirme', den: 'Match Dutch words with their translation.', dtr: 'Hollandaca kelimeyi çevirisiyle eşleştir.' },
    { to: '/games/sprint', icon: '⚡', en: 'Word sprint', tr: 'Kelime Sprinti', den: '60 seconds, as many correct answers as you can.', dtr: '60 saniyede olabildiğince çok doğru.' },
    { to: '/games/spell', icon: '⌨️', en: 'Type the word', tr: 'Kelimeyi Yaz', den: 'See the picture, type the Dutch word.', dtr: 'Görseli gör, Hollandacasını yaz.' },
  ];
  return (
    <div className="page">
      <h1>🎮 {t({ en: 'Word games', tr: 'Kelime oyunları' })}</h1>
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
    const sorted = shuffle(VOCAB).sort((a, b) => (fc[a.id] || 0) - (fc[b.id] || 0));
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
    const words = shuffle(VOCAB).slice(0, 8);
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
      speak(VOCAB.find((w) => w.id === tile.pair).nl);
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
    const w = VOCAB[Math.floor(Math.random() * VOCAB.length)];
    const wrong = shuffle(VOCAB.filter((x) => x.id !== w.id)).slice(0, 3);
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
  const [w, setW] = useState(() => VOCAB[Math.floor(Math.random() * VOCAB.length)]);
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
      setW(VOCAB[Math.floor(Math.random() * VOCAB.length)]);
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
