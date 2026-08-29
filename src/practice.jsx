import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { SUPABASE_URL } from './config.js';
import { supa, speak, stopSpeak, getP, setP, hasSTT, listenOnce } from './lib.js';
import { useLang, useT } from './App.jsx';
import { THEMES } from './data/themes.js';

// Talking to a person is the one thing a self-study app cannot give you, and an hour
// with a tutor costs more than most learners can spend. This is the substitute: a
// partner that stays inside an exam-like situation, corrects what you said and explains
// why in your own language. The key lives in a Supabase Edge Function, never here.
async function askPartner({ level, situation, uiLang, messages }) {
  const { data } = await supa.auth.getSession();
  const token = data?.session?.access_token;
  if (!token) return { error: 'auth' };

  const r = await fetch(`${SUPABASE_URL}/functions/v1/chat`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      level,
      situation,
      uiLang,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    }),
  }).catch(() => null);

  if (!r) return { error: 'network' };
  const body = await r.json().catch(() => ({}));
  if (!r.ok) return { error: body.error || 'upstream', remaining: body.remaining };
  return body;
}

export function Practice() {
  const t = useT();
  const lang = useLang();
  const level = getP('level', 'A2');
  const [theme, setTheme] = useState(null);
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [rec, setRec] = useState(false);
  const [err, setErr] = useState(null);
  const [remaining, setRemaining] = useState(null);
  const autoSpeak = getP('ai:autospeak', true);
  const endRef = useRef(null);

  useEffect(() => stopSpeak, []);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, busy]);

  function start(th) {
    const scene = th[level] || th.A2;
    setTheme(th);
    setErr(null);
    setMsgs([{ role: 'assistant', content: scene.opener }]);
    if (autoSpeak) speak(scene.opener, 0.9);
  }

  async function send(text) {
    const clean = (text || '').trim();
    if (!clean || busy) return;
    stopSpeak();
    const scene = theme[level] || theme.A2;
    const next = [...msgs, { role: 'user', content: clean }];
    setMsgs(next);
    setInput('');
    setBusy(true);
    setErr(null);

    const res = await askPartner({ level, situation: scene.situation, uiLang: lang, messages: next });
    setBusy(false);

    if (typeof res.remaining === 'number') setRemaining(res.remaining);
    if (res.error) {
      setErr(res.error);
      return;
    }
    setP('ai:msgs', (getP('ai:msgs', 0) || 0) + 1);
    setMsgs([
      ...next,
      {
        role: 'assistant',
        content: res.reply_nl,
        correction: res.correction,
        tip: res.exam_tip,
        repeat: res.ask_repeat ? res.correction?.fixed : null,
      },
    ]);
    if (autoSpeak && res.reply_nl) speak(res.reply_nl, 0.9);
  }

  async function mic() {
    if (rec || busy) return;
    stopSpeak();
    setRec(true);
    try {
      const heard = await listenOnce();
      if (heard) send(heard.split(' | ')[0]);
    } catch {
      setErr('mic');
    }
    setRec(false);
  }

  // ---------- theme picker ----------
  if (!theme) {
    return (
      <div className="page">
        <h1>🗣️ {t({ en: 'Practice partner', tr: 'Pratik partneri' })} <small>{level}</small></h1>
        <p>
          {t({
            en: 'Have a real conversation in Dutch. Pick a situation — the partner stays in that role, corrects your mistakes and explains why in English. You can type or use the microphone.',
            tr: 'Hollandaca gerçek bir konuşma yap. Bir durum seç — partner o rolde kalır, hatalarını düzeltir ve nedenini Türkçe açıklar. Yazabilir ya da mikrofonu kullanabilirsin.',
          })}
        </p>
        <div className="grid">
          {THEMES.map((th) => (
            <button key={th.id} className="card theme-card" onClick={() => start(th)}>
              <div className="mod-icon">{th.icon}</div>
              <h3>{t({ en: th.en, tr: th.tr })}</h3>
              <p>{(th[level] || th.A2).situation.split('.')[0]}.</p>
            </button>
          ))}
        </div>
        <p><small>
          {t({
            en: 'Free, like everything else here. There is a daily limit so the free capacity lasts for everyone.',
            tr: 'Buradaki her şey gibi ücretsiz. Ücretsiz kapasite herkese yetsin diye günlük bir sınır var.',
          })}
        </small></p>
      </div>
    );
  }

  // ---------- conversation ----------
  const scene = theme[level] || theme.A2;
  return (
    <div className="page narrow">
      <div className="chat-head">
        <span>{theme.icon} {t({ en: theme.en, tr: theme.tr })} · {level}</span>
        <div className="chat-head-btns">
          <button
            className="linklike"
            onClick={() => setP('ai:autospeak', !autoSpeak)}
            title={t({ en: 'Read answers aloud', tr: 'Cevapları sesli oku' })}
          >
            {autoSpeak ? '🔊' : '🔇'}
          </button>
          <button className="linklike" onClick={() => { stopSpeak(); setTheme(null); setMsgs([]); }}>
            {t({ en: 'Change', tr: 'Değiştir' })}
          </button>
        </div>
      </div>
      <p className="chat-scene">{scene.situation}</p>

      <div className="chat-list">
        {msgs.map((m, i) => (
          <div key={i} className={'chat-turn ' + m.role}>
            <div className="bubble">
              {m.content}
              {m.role === 'assistant' && (
                <button className="spk" onClick={() => speak(m.content, 0.9)}>🔊</button>
              )}
            </div>

            {m.correction && (
              <div className="fix-card">
                <div className="fix-row bad">✘ {m.correction.original}</div>
                <div className="fix-row good">
                  ✔ {m.correction.fixed}
                  <button className="spk" onClick={() => speak(m.correction.fixed, 0.85)}>🔊</button>
                </div>
                {m.correction.why && <div className="fix-why">💡 {m.correction.why}</div>}
              </div>
            )}

            {m.repeat && (
              <div className="repeat-ask">
                {t({ en: 'Say it once more, correctly:', tr: 'Bir kez de doğrusunu söyle:' })} <b>{m.repeat}</b>
              </div>
            )}

            {m.tip && <div className="chat-tip">🎯 {m.tip}</div>}
          </div>
        ))}
        {busy && <div className="chat-turn assistant"><div className="bubble typing">…</div></div>}
        <div ref={endRef} />
      </div>

      {err && <ChatError code={err} />}

      <div className="chat-input">
        <textarea
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); }
          }}
          placeholder={t({ en: 'Write in Dutch…', tr: 'Hollandaca yaz…' })}
          disabled={busy}
        />
        <div className="chat-send">
          {hasSTT() && (
            <button className={'btn mic' + (rec ? ' on' : '')} onClick={mic} disabled={busy}>
              {rec ? '🎤 …' : '🎤'}
            </button>
          )}
          <button className="btn" onClick={() => send(input)} disabled={busy || !input.trim()}>
            {t({ en: 'Send', tr: 'Gönder' })}
          </button>
        </div>
      </div>

      {remaining !== null && (
        <p className="chat-quota">
          <small>{t({ en: `${remaining} messages left today`, tr: `Bugün ${remaining} mesaj hakkın kaldı` })}</small>
        </p>
      )}
    </div>
  );
}

// Every failure here has to leave the learner with something to do instead of a red box.
function ChatError({ code }) {
  const t = useT();
  const msg = {
    quota: {
      en: 'That is your practice quota for today. It resets tomorrow — meanwhile the Spreken exams give you the same kind of speaking practice, without a limit.',
      tr: 'Bugünlük pratik hakkın doldu. Yarın sıfırlanıyor — o zamana kadar Spreken sınavları aynı konuşma pratiğini sınırsız veriyor.',
    },
    global_quota: {
      en: 'The shared free capacity for today is used up. Try again tomorrow, or practise speaking in the Spreken exams in the meantime.',
      tr: 'Bugünkü ortak ücretsiz kapasite doldu. Yarın tekrar dene, bu arada Spreken sınavlarında konuşma pratiği yapabilirsin.',
    },
    capacity: {
      en: 'All the free models are busy right now. This usually clears within the hour — the Spreken exams work in the meantime.',
      tr: 'Şu an tüm ücretsiz modeller dolu. Genelde bir saat içinde açılıyor — bu arada Spreken sınavları çalışıyor.',
    },
    too_fast: {
      en: 'Slow down a little — a few messages a minute. The free capacity is shared with everyone.',
      tr: 'Biraz yavaş — dakikada birkaç mesaj. Ücretsiz kapasite herkesle paylaşılıyor.',
    },
    unconfirmed: {
      en: 'Confirm your email address first (check your inbox for the link). The practice partner is for confirmed accounts only.',
      tr: 'Önce e-posta adresini onayla (gelen kutundaki bağlantı). Pratik partneri yalnız onaylı hesaplara açık.',
    },
    not_configured: {
      en: 'The practice partner is not switched on yet. Everything else in the course works as usual.',
      tr: 'Pratik partneri henüz açılmadı. Kurstaki diğer her şey normal çalışıyor.',
    },
    upstream: {
      en: 'The partner could not answer just now. Try again in a moment.',
      tr: 'Partner şu an cevap veremedi. Birazdan tekrar dene.',
    },
    network: {
      en: 'No connection. Check your internet and try again.',
      tr: 'Bağlantı yok. İnternetini kontrol edip tekrar dene.',
    },
    mic: {
      en: 'The microphone is not available — type your answer instead.',
      tr: 'Mikrofona ulaşılamadı — cevabını yazabilirsin.',
    },
    auth: { en: 'Please log in again.', tr: 'Lütfen tekrar giriş yap.' },
  }[code] || { en: 'Something went wrong.', tr: 'Bir şeyler ters gitti.' };

  return (
    <div className="notice err">
      {t(msg)}
      {['quota','global_quota','capacity'].includes(code) && (
        <div style={{ marginTop: 8 }}>
          <Link className="btn ghost" to="/exams/spreken">🗣️ {t({ en: 'Spreken exams', tr: 'Spreken sınavları' })}</Link>
        </div>
      )}
    </div>
  );
}
