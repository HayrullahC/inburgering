import React, { useEffect, useState } from 'react';
import { supa, LEVELS, sendMail } from './lib.js';

// every exam in the app, across all three levels
const TOTAL_EXAMS = LEVELS.reduce((n, l) => n + l.modules.length * l.exams, 0);
import { ADMIN_EMAILS } from './config.js';
import { useT, useUser } from './App.jsx';
import { TicketThread, STATUS_LABEL } from './support.jsx';

export function isAdmin(user) {
  return !!user && ADMIN_EMAILS.includes(user.email);
}

// ---------------- Floating feedback button + form ----------------
export function FeedbackWidget() {
  const t = useT();
  const user = useUser();
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState('bug');
  const [msg, setMsg] = useState('');
  const [state, setState] = useState(null); // null | busy | ok | err

  if (!supa || !user) return null;

  async function send(e) {
    e.preventDefault();
    setState('busy');
    const { error } = await supa.from('feedback').insert({
      user_id: user.id,
      email: user.email,
      kind,
      message: msg.trim(),
      page: location.hash || '#/',
    });
    if (error) {
      setState('err');
    } else {
      setState('ok');
      setMsg('');
      setTimeout(() => { setOpen(false); setState(null); }, 1600);
    }
  }

  return (
    <>
      <button className="fb-fab" onClick={() => setOpen(!open)} title="Feedback">
        {open ? '✕' : '💬'}
      </button>
      {open && (
        <form className="fb-panel" onSubmit={send}>
          <b>{t({ en: 'Feedback', tr: 'Geri bildirim' })}</b>
          <p className="fb-sub">
            {t({ en: 'Found a bug? Want a feature? Tell me!', tr: 'Hata mı buldun? İsteğin mi var? Yaz bana!' })}
          </p>
          <select value={kind} onChange={(e) => setKind(e.target.value)}>
            <option value="bug">🐞 {t({ en: 'Something is broken', tr: 'Bir şey çalışmıyor' })}</option>
            <option value="idea">💡 {t({ en: 'Idea / request', tr: 'Fikir / istek' })}</option>
            <option value="other">💬 {t({ en: 'Other', tr: 'Diğer' })}</option>
          </select>
          <textarea
            rows={4}
            required
            minLength={5}
            placeholder={t({ en: 'Write here…', tr: 'Buraya yaz…' })}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button className="btn" disabled={state === 'busy'}>
            {t({ en: 'Send', tr: 'Gönder' })}
          </button>
          {state === 'ok' && <div className="notice ok">{t({ en: 'Thanks! Received. 🙏', tr: 'Sağ ol! Ulaştı. 🙏' })}</div>}
          {state === 'err' && <div className="notice err">{t({ en: 'Could not send — try again.', tr: 'Gönderilemedi — tekrar dene.' })}</div>}
        </form>
      )}
    </>
  );
}

// ---------------- Admin panel ----------------
export function AdminPage() {
  const t = useT();
  const user = useUser();
  const [tab, setTab] = useState('feedback');

  if (!isAdmin(user)) {
    return <div className="page narrow"><h1>🔒</h1><p>{t({ en: 'Admins only.', tr: 'Sadece yönetici.' })}</p></div>;
  }
  return (
    <div className="page">
      <h1>⚙️ Admin</h1>
      <div className="row-btns">
        <button className={'btn ' + (tab === 'feedback' ? '' : 'ghost')} onClick={() => setTab('feedback')}>
          💬 Feedback
        </button>
        <button className={'btn ' + (tab === 'tickets' ? '' : 'ghost')} onClick={() => setTab('tickets')}>
          🎫 Tickets
        </button>
        <button className={'btn ' + (tab === 'users' ? '' : 'ghost')} onClick={() => setTab('users')}>
          👥 {t({ en: 'Users', tr: 'Kullanıcılar' })}
        </button>
      </div>
      {tab === 'feedback' ? <FeedbackInbox /> : tab === 'tickets' ? <TicketInbox /> : <UserStats />}
    </div>
  );
}

function FeedbackInbox() {
  const t = useT();
  const [rows, setRows] = useState(null);
  const [filter, setFilter] = useState('new');
  const [draft, setDraft] = useState({}); // feedback id -> reply text being written
  const [mail, setMail] = useState({}); // feedback id -> 'sent' | 'failed'

  async function load() {
    const { data, error } = await supa.from('feedback').select('*').order('created_at', { ascending: false });
    setRows(error ? [] : data);
  }
  useEffect(() => { load(); }, []);

  // store the reply, mark done, and e-mail the member (mail may fail when notify isn't deployed)
  async function reply(r) {
    const text = (draft[r.id] || '').trim();
    if (!text) return;
    await supa.from('feedback').update({ reply: text, replied_at: new Date().toISOString(), status: 'done' }).eq('id', r.id);
    const ok = await sendMail(
      r.email,
      t({ en: 'Reply to your feedback', tr: 'Geri bildiriminize cevap' }),
      text + '\n\n— — —\n' + t({ en: 'Your message:', tr: 'Mesajınız:' }) + '\n' + r.message,
    );
    setMail({ ...mail, [r.id]: ok ? 'sent' : 'failed' });
    setDraft({ ...draft, [r.id]: '' });
    load();
  }

  async function setStatus(id, status) {
    await supa.from('feedback').update({ status }).eq('id', id);
    load();
  }
  async function remove(id) {
    await supa.from('feedback').delete().eq('id', id);
    load();
  }

  if (!rows) return <p>…</p>;
  const shown = filter === 'all' ? rows : rows.filter((r) => r.status === filter);
  const icon = { bug: '🐞', idea: '💡', other: '💬' };

  return (
    <div>
      <div className="row-btns">
        {['new', 'done', 'all'].map((f) => (
          <button key={f} className={'linklike ' + (filter === f ? 'active-filter' : '')} onClick={() => setFilter(f)}>
            {f} ({f === 'all' ? rows.length : rows.filter((r) => r.status === f).length})
          </button>
        ))}
      </div>
      {shown.length === 0 && <p>{t({ en: 'Nothing here.', tr: 'Burada bir şey yok.' })}</p>}
      {shown.map((r) => (
        <div key={r.id} className={'rev ' + (r.status === 'done' ? 'ok' : 'fail')}>
          <b>{icon[r.kind] || '💬'} {r.email}</b>{' '}
          <small>{new Date(r.created_at).toLocaleString()} · {r.page}</small>
          <p style={{ whiteSpace: 'pre-wrap', margin: '6px 0' }}>{r.message}</p>
          {r.reply && (
            <p style={{ whiteSpace: 'pre-wrap', margin: '6px 0', paddingLeft: 10, borderLeft: '3px solid var(--ok)' }}>
              ↩ {r.reply} <small>({new Date(r.replied_at).toLocaleString()})</small>
            </p>
          )}
          {r.email && (
            <div className="ticket-reply">
              <textarea rows={3} value={draft[r.id] || ''} maxLength={4000}
                placeholder={t({ en: 'Reply — the member gets it by e-mail', tr: 'Cevap yaz — üyeye e-posta olarak gider' })}
                onChange={(e) => setDraft({ ...draft, [r.id]: e.target.value })} />
              <div className="row-btns">
                <button className="btn" disabled={!(draft[r.id] || '').trim()} onClick={() => reply(r)}>
                  📧 {t({ en: 'Reply & e-mail', tr: 'Cevapla & e-posta gönder' })}
                </button>
                {mail[r.id] === 'sent' && <small>✅ {t({ en: 'e-mail sent', tr: 'e-posta gönderildi' })}</small>}
                {mail[r.id] === 'failed' && <small>⚠️ {t({ en: 'saved, but e-mail failed (notify function not set up?)', tr: 'kaydedildi ama e-posta gitmedi (notify fonksiyonu kurulu mu?)' })}</small>}
              </div>
            </div>
          )}
          <div className="row-btns">
            {r.status === 'new'
              ? <button className="linklike" onClick={() => setStatus(r.id, 'done')}>✅ {t({ en: 'Mark done', tr: 'Tamamlandı' })}</button>
              : <button className="linklike" onClick={() => setStatus(r.id, 'new')}>↩ {t({ en: 'Reopen', tr: 'Geri aç' })}</button>}
            <button className="linklike" onClick={() => remove(r.id)}>🗑 {t({ en: 'Delete', tr: 'Sil' })}</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function TicketInbox() {
  const t = useT();
  const [rows, setRows] = useState(null);
  const [filter, setFilter] = useState('open');
  const [openId, setOpenId] = useState(null);

  async function load() {
    const { data, error } = await supa.from('tickets').select('*').order('updated_at', { ascending: false });
    setRows(error ? [] : data);
  }
  useEffect(() => { load(); }, []);

  async function remove(id) {
    if (!confirm(t({ en: 'Delete this ticket and its replies?', tr: 'Bu ticket ve yanıtları silinsin mi?' }))) return;
    await supa.from('tickets').delete().eq('id', id);
    load();
  }

  if (!rows) return <p>…</p>;
  const shown = filter === 'all' ? rows : rows.filter((r) => r.status === filter);
  const topicIcon = { audio: '🔊', account: '👤', exam: '📝', ai: '🗣️', other: '💬' };

  return (
    <div>
      <div className="row-btns">
        {['open', 'answered', 'closed', 'all'].map((f) => (
          <button key={f} className={'linklike ' + (filter === f ? 'active-filter' : '')} onClick={() => setFilter(f)}>
            {f} ({f === 'all' ? rows.length : rows.filter((r) => r.status === f).length})
          </button>
        ))}
      </div>
      {shown.length === 0 && <p>{t({ en: 'Nothing here.', tr: 'Burada bir şey yok.' })}</p>}
      {shown.map((r) => (
        <div key={r.id} className={'rev ' + (r.status === 'open' ? 'fail' : r.status === 'answered' ? 'ok' : '')}>
          <button className="linklike ticket-row" onClick={() => setOpenId(openId === r.id ? null : r.id)}>
            <b>{topicIcon[r.topic] || '💬'} {r.subject}</b>{' '}
            <small>{r.email} · {t(STATUS_LABEL[r.status] || STATUS_LABEL.open)} · {new Date(r.updated_at).toLocaleString()}</small>
          </button>
          {openId === r.id && (
            <>
              <TicketThread ticket={r} asAdmin onChanged={load} />
              <button className="linklike" onClick={() => remove(r.id)}>🗑 {t({ en: 'Delete', tr: 'Sil' })}</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

function UserStats() {
  const t = useT();
  const [rows, setRows] = useState(null);

  function load() {
    supa.from('progress').select('user_id, email, updated_at, data').order('updated_at', { ascending: false })
      .then(({ data, error }) => setRows(error ? [] : data));
  }
  useEffect(load, []);

  async function resetProgress(id, email) {
    if (!confirm(t({ en: 'Reset ALL progress of ' + (email || id) + '?', tr: (email || id) + ' kullanıcısının TÜM ilerlemesi sıfırlansın mı?' }))) return;
    await supa.from('progress').delete().eq('user_id', id);
    load();
  }

  if (!rows) return <p>…</p>;

  const now = Date.now();
  const week = 7 * 24 * 3600 * 1000;
  const active7 = rows.filter((r) => now - new Date(r.updated_at).getTime() < week).length;
  const stats = rows.map((r) => {
    const d = r.data || {};
    const passed = Object.keys(d).filter((k) => k.startsWith('exam:') && d[k] && (d[k].s / d[k].t) * 100 >= 60).length;
    const words = Object.values(d.fc || {}).filter((b) => b >= 3).length;
    return { id: r.user_id, email: r.email, seen: r.updated_at, passed, words, lang: d.lang || '—' };
  });
  const totPassed = stats.reduce((n, s) => n + s.passed, 0);

  return (
    <div>
      <div className="stat-row">
        <div className="stat"><b>{rows.length}</b><span>{t({ en: 'users', tr: 'kullanıcı' })}</span></div>
        <div className="stat"><b>{active7}</b><span>{t({ en: 'active last 7 days', tr: 'son 7 günde aktif' })}</span></div>
        <div className="stat"><b>{totPassed}</b><span>{t({ en: 'exams passed (total)', tr: 'geçilen sınav (toplam)' })}</span></div>
      </div>
      <table className="gram-table">
        <thead>
          <tr>
            <th>{t({ en: 'User', tr: 'Kullanıcı' })}</th>
            <th>{t({ en: 'Last seen', tr: 'Son görülme' })}</th>
            <th>{t({ en: 'Exams passed', tr: 'Geçilen sınav' })}</th>
            <th>{t({ en: 'Words learned', tr: 'Öğrenilen kelime' })}</th>
            <th>{t({ en: 'Lang', tr: 'Dil' })}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {stats.map((s) => (
            <tr key={s.id}>
              <td>{s.email || <code>{s.id.slice(0, 8)}…</code>}</td>
              <td>{new Date(s.seen).toLocaleDateString()}</td>
              <td>{s.passed}/{TOTAL_EXAMS}</td>
              <td>{s.words}</td>
              <td>{s.lang}</td>
              <td>
                <button className="linklike" onClick={() => resetProgress(s.id, s.email)}>
                  🗑 {t({ en: 'Reset', tr: 'Sıfırla' })}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p><small>{t({
        en: 'Emails appear after a user’s next sync. Deleting or banning an account itself: Supabase Dashboard → Authentication → Users.',
        tr: 'E-postalar kullanıcının bir sonraki senkronunda görünür. Hesabın kendisini silme/banlama: Supabase Dashboard → Authentication → Users.',
      })}</small></p>
    </div>
  );
}
