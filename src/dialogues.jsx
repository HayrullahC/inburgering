import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getP, setP, stopSpeak } from './lib.js';
import { DIALOGUES } from './data/dialogues.js';
import { useT } from './App.jsx';
import { Speaker, AudioPlayer } from './pages.jsx';

// A dialogue counts as studied once the comprehension check is passed (2 of 3).
export const dlgKey = (id) => 'dlg:' + id;
export const dialoguesFor = (level) => DIALOGUES.filter((d) => d.level === level);

export function Dialogues() {
  const t = useT();
  const level = getP('level', 'A2');
  const list = dialoguesFor(level);
  const done = list.filter((d) => getP(dlgKey(d.id))?.ok).length;

  return (
    <div className="page">
      <h1>💬 {t({ en: 'Dialogues', tr: 'Diyaloglar' })} <small>{level}</small></h1>
      <p className="gram-p">{t({
        en: 'Real-life conversations: read along, listen line by line, open the translation only when you need it, then answer three questions. This is how the listening and speaking parts of the exam feel.',
        tr: 'Gerçek hayattan konuşmalar: takip et, satır satır dinle, çeviriyi sadece gerektiğinde aç, sonra üç soruya cevap ver. Sınavın dinleme ve konuşma bölümleri tam böyle hissettirir.',
      })}</p>
      <p><b>{done}/{list.length}</b> {t({ en: 'studied', tr: 'çalışıldı' })}</p>
      <div className="grid">
        {list.map((d) => {
          const p = getP(dlgKey(d.id));
          return (
            <Link key={d.id} to={'/dialogues/' + d.id} className="card mod-card">
              <div className="mod-icon">{d.icon}</div>
              <h3>{t(d.title)}</h3>
              <p>{t(d.situation)}</p>
              <small>{p ? (p.ok ? '✅ ' : '🔁 ') + p.s + '/' + p.t : d.lines.length + ' ' + t({ en: 'lines', tr: 'satır' })}</small>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function Dialogue() {
  const { id } = useParams();
  const t = useT();
  const d = DIALOGUES.find((x) => x.id === id);
  const [showTr, setShowTr] = useState(false);
  const [picked, setPicked] = useState({}); // question index -> option index
  useEffect(() => stopSpeak, []);
  if (!d) return <div className="page">Not found</div>;

  const full = d.lines.map((l) => l.nl).join(' ');
  const answered = Object.keys(picked).length === d.check.length;
  const score = d.check.filter((c, i) => picked[i] === c.a).length;
  const saved = getP(dlgKey(d.id));

  function finish() {
    const res = { s: score, t: d.check.length, ok: score >= 2 };
    if (!saved || score >= saved.s) setP(dlgKey(d.id), res);
  }

  return (
    <div className="page narrow">
      <Link to="/dialogues">← {t({ en: 'All dialogues', tr: 'Tüm diyaloglar' })}</Link>
      <h1>{d.icon} {t(d.title)}</h1>
      <p className="gram-p">{t(d.situation)}</p>
      <AudioPlayer key={d.id} text={full} playLabel={t({ en: 'Listen to the whole dialogue', tr: 'Diyaloğun tamamını dinle' })} />

      <div className="row-btns">
        <button className="btn ghost" onClick={() => setShowTr(!showTr)}>
          {showTr ? t({ en: 'Hide translations', tr: 'Çevirileri gizle' }) : t({ en: 'Show translations', tr: 'Çevirileri göster' })}
        </button>
      </div>
      <div className="card">
        {d.lines.map((l, i) => (
          <div key={i} className="dlg-line">
            <span className="dlg-who">{l.who}</span>
            <span>{l.nl} <Speaker text={l.nl} /></span>
            {showTr && <span className="dlg-tr">{t({ en: l.en, tr: l.tr })}</span>}
          </div>
        ))}
      </div>

      <h3>{t({ en: 'Key words', tr: 'Anahtar kelimeler' })}</h3>
      <table className="gram-table dlg-vocab">
        <tbody>
          {d.vocab.map((v, i) => (
            <tr key={i}><td>{v.nl} <Speaker text={v.nl} /></td><td>{t({ en: v.en, tr: v.tr })}</td></tr>
          ))}
        </tbody>
      </table>

      <h3>{t({ en: 'Did you understand?', tr: 'Anladın mı?' })}</h3>
      {d.check.map((c, i) => (
        <div key={i} className="card" style={{ marginBottom: 10 }}>
          <p><b>{i + 1}. {c.q}</b></p>
          <div className="opts">
            {c.o.map((o, j) => {
              const isPicked = picked[i] === j;
              const cls = picked[i] === undefined ? '' : j === c.a ? ' good-opt' : isPicked ? ' bad-opt' : '';
              return (
                <button key={j} className={'opt' + cls} disabled={picked[i] !== undefined}
                  onClick={() => setPicked({ ...picked, [i]: j })}>
                  {o}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      {answered && (
        <div className={'notice ' + (score >= 2 ? 'ok' : 'err')}>
          <p><b>{score}/{d.check.length}</b> {score >= 2 ? '🎉' : '😕'}</p>
          <div className="row-btns">
            <button className="btn" onClick={finish}>{t({ en: 'Save result', tr: 'Sonucu kaydet' })}</button>
            <button className="btn ghost" onClick={() => setPicked({})}>{t({ en: 'Try again', tr: 'Tekrar dene' })}</button>
          </div>
        </div>
      )}
    </div>
  );
}
