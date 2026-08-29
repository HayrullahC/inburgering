import React, { useEffect, useState } from 'react';
import { supa } from './lib.js';
import { useT, useUser } from './App.jsx';

// ---------------- FAQ content ----------------
// Every known support issue lives here — add new entries as tickets repeat.
const FAQ = [
  {
    q: { en: 'Dutch words are read with an English/Turkish accent ("vijftien" sounds wrong)', tr: 'Hollandaca kelimeler İngilizce/Türkçe aksanla okunuyor ("vijftien" komik geliyor)' },
    a: {
      en: 'Your device has no Dutch voice installed, so the browser falls back to its default voice. Install one (free, 1 minute):\n\n• Windows: Settings → Time & Language → Language & Region → Add a language → Nederlands (check "Text-to-speech").\n• macOS: System Settings → Accessibility → Spoken Content → System Voice → Manage Voices → download a Nederlands voice (e.g. Xander). Then fully restart the browser.\n• Android: install "Speech Recognition & Synthesis" from Google → its settings → install Dutch voice data.\n• iPhone/iPad: Settings → Accessibility → Spoken Content → Voices → Dutch.\n\nGoogle Chrome usually has Dutch voices built in — if you cannot install one, try Chrome.',
      tr: 'Cihazında Hollandaca ses yüklü değil; tarayıcı varsayılan sese düşüyor. Yüklemesi ücretsiz, 1 dakika:\n\n• Windows: Ayarlar → Zaman ve Dil → Dil ve Bölge → Dil ekle → Nederlands ("Metin okuma" işaretli olsun).\n• macOS: Sistem Ayarları → Erişilebilirlik → Konuşulan İçerik → Sistem Sesi → Sesleri Yönet → Nederlands bir ses indir (örn. Xander). Sonra tarayıcıyı tamamen kapatıp aç.\n• Android: Google\'ın "Konuşma Tanıma ve Sentezi" uygulaması → ayarlar → Hollandaca ses verisini indir.\n• iPhone/iPad: Ayarlar → Erişilebilirlik → Konuşulan İçerik → Sesler → Dutch.\n\nGoogle Chrome\'da Hollandaca sesler genelde hazır gelir — yükleyemiyorsan Chrome\'u dene.',
    },
  },
  {
    q: { en: 'No sound at all when I press 🔊', tr: '🔊 basınca hiç ses gelmiyor' },
    a: {
      en: 'Check media volume first. On iPhone, the mute switch on the side also silences speech — flip it. Some browsers only allow audio after you touch the page once; tap anywhere, then press 🔊 again. If it still stays silent, try Chrome.',
      tr: 'Önce medya ses seviyesini kontrol et. iPhone\'da yandaki sessize alma anahtarı konuşmayı da susturur — aç. Bazı tarayıcılar sayfaya bir kez dokunmadan ses çalmaz; bir yere dokunup 🔊 tuşuna tekrar bas. Hâlâ sessizse Chrome\'u dene.',
    },
  },
  {
    q: { en: 'The microphone does not work (Spreken exams / Practice partner)', tr: 'Mikrofon çalışmıyor (Spreken sınavları / Pratik partneri)' },
    a: {
      en: 'When the browser asks for microphone permission, choose Allow. If you refused it once: click the lock/tune icon next to the address bar → Site settings → Microphone → Allow, then reload. Speech recognition works best in Chrome and Edge; Firefox does not support it, and on iPhone support is limited — you can always type your answer instead.',
      tr: 'Tarayıcı mikrofon izni sorduğunda İzin Ver de. Bir kez reddettiysen: adres çubuğundaki kilit simgesi → Site ayarları → Mikrofon → İzin ver, sonra sayfayı yenile. Ses tanıma en iyi Chrome ve Edge\'de çalışır; Firefox desteklemez, iPhone\'da destek sınırlıdır — istersen cevabını her zaman yazabilirsin.',
    },
  },
  {
    q: { en: 'I did not receive the confirmation / password reset email', tr: 'Onay / şifre sıfırlama e-postası gelmedi' },
    a: {
      en: 'Look in Spam/Junk first — that is where it is 9 times out of 10. Mark it "not spam" so the next one arrives normally. Wait a few minutes; there is a limit on how many emails we can send per hour. Still nothing? Open a ticket below with the email address you registered with.',
      tr: 'Önce Spam/Gereksiz klasörüne bak — 10 seferin 9\'u orada. "Spam değil" olarak işaretle ki sonrakiler normal gelsin. Birkaç dakika bekle; saatte gönderebildiğimiz e-posta sayısının bir sınırı var. Yine gelmediyse aşağıdan, kayıt olduğun adresi yazarak ticket aç.',
    },
  },
  {
    q: { en: 'The password reset link says it is invalid', tr: 'Şifre sıfırlama linki geçersiz diyor' },
    a: {
      en: 'The link works once and expires after a short time. Request a fresh one on the login page ("Forgot password"), and open it on the same device and browser where you requested it.',
      tr: 'Link tek kullanımlıktır ve kısa sürede geçersizleşir. Giriş sayfasından ("Şifremi unuttum") yenisini iste ve linki, isteği yaptığın cihaz ve tarayıcıda aç.',
    },
  },
  {
    q: { en: 'The Practice partner says I reached my daily limit / could not answer', tr: 'Pratik partneri günlük sınıra ulaştın diyor / cevap veremiyor' },
    a: {
      en: 'The AI partner runs on a free shared capacity, so every member has a daily message allowance; it resets at midnight (UTC). Meanwhile the Spreken exams give unlimited speaking practice. "Could not answer" without the limit message is usually temporary — wait a minute and send again (a failed message is not counted). New accounts must confirm their email before the partner answers.',
      tr: 'AI partner ücretsiz ortak bir kapasiteyle çalışır; bu yüzden her üyenin günlük mesaj hakkı vardır, gece yarısı (UTC) sıfırlanır. Bu arada Spreken sınavlarında sınırsız konuşma pratiği yapabilirsin. Sınır mesajı olmadan "cevap veremedi" diyorsa genelde geçicidir — bir dakika bekleyip tekrar gönder (başarısız mesaj haktan düşülmez). Yeni hesapların partner cevap vermeden önce e-postasını onaylaması gerekir.',
    },
  },
  {
    q: { en: 'Is my progress saved? Can I use another device?', tr: 'İlerlemem kaydediliyor mu? Başka cihazdan girebilir miyim?' },
    a: {
      en: 'Yes — exam results, learned words and settings are stored in your account and sync automatically. Log in with the same email on any device and continue where you left off.',
      tr: 'Evet — sınav sonuçların, öğrendiğin kelimeler ve ayarların hesabında saklanır ve otomatik eşitlenir. Herhangi bir cihazda aynı e-postayla giriş yap, kaldığın yerden devam et.',
    },
  },
  {
    q: { en: 'Which level should I start with?', tr: 'Hangi seviyeden başlamalıyım?' },
    a: {
      en: 'New to Dutch? Choose A2 in the header and follow the "Start here" route — it begins from zero (numbers, greetings) and builds up to the A2 exam. Not sure? Take the placement test on the Start page. A2 prepares the inburgeringsexamen; B1/B2 prepare Staatsexamen NT2 I/II.',
      tr: 'Hollandacaya yeni misin? Üst menüden A2\'yi seç ve "Buradan başla" rotasını izle — sıfırdan (sayılar, selamlaşma) başlayıp A2 sınavına kadar götürür. Emin değilsen Başla sayfasındaki seviye testine gir. A2 inburgeringsexamen\'e, B1/B2 Staatsexamen NT2 I/II\'ye hazırlar.',
    },
  },
  {
    q: { en: 'Are these the official exams?', tr: 'Bunlar resmî sınavlar mı?' },
    a: {
      en: 'No — this is free practice material in the same format and difficulty as the official exams. The real exam is taken at DUO. Before your exam date, also do the official practice exams: see the resource links on the Exam Info page.',
      tr: 'Hayır — bunlar resmî sınavlarla aynı format ve zorlukta ücretsiz alıştırma materyalidir. Gerçek sınav DUO\'da yapılır. Sınav tarihinden önce resmî deneme sınavlarını da mutlaka çöz: Sınav Bilgisi sayfasındaki kaynak linklerine bak.',
    },
  },
  {
    q: { en: 'The site looks broken or an update is missing', tr: 'Site bozuk görünüyor ya da güncelleme gelmemiş' },
    a: {
      en: 'Your browser is showing an old cached version. Hard-refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac). On the phone, close the tab completely and open the site again. If a problem survives the refresh, open a ticket below.',
      tr: 'Tarayıcın eski önbelleklenmiş sürümü gösteriyor. Sert yenile: Ctrl+Shift+R (Windows) veya Cmd+Shift+R (Mac). Telefonda sekmeyi tamamen kapatıp siteyi yeniden aç. Sorun yenilemeden sonra da sürüyorsa aşağıdan ticket aç.',
    },
  },
  {
    q: { en: 'In games the translation only appears sometimes — why?', tr: 'Oyunlarda çeviri bazen görünüyor bazen görünmüyor — neden?' },
    a: {
      en: 'That is intentional: the translation appears as a reward after a correct answer. On a wrong answer you first see the correct Dutch, so you solve it yourself before reading the translation.',
      tr: 'Bu bilinçli bir tasarım: çeviri, doğru cevabın ödülü olarak gelir. Yanlış cevapta önce doğru Hollandacayı görürsün — çeviriyi okumadan önce kendin çözersin.',
    },
  },
  {
    q: { en: 'How do I change my password or delete my account?', tr: 'Şifremi nasıl değiştiririm, hesabımı nasıl sildiririm?' },
    a: {
      en: 'Change password: log out, then use "Forgot password" on the login page — the email link lets you set a new one. Delete account: open a ticket below and we remove the account and all its data.',
      tr: 'Şifre değiştirme: çıkış yap, giriş sayfasında "Şifremi unuttum"u kullan — gelen linkten yeni şifre belirlersin. Hesap silme: aşağıdan ticket aç, hesabı ve tüm verilerini kaldıralım.',
    },
  },
];

const TOPICS = [
  { id: 'audio', en: '🔊 Sound / microphone', tr: '🔊 Ses / mikrofon' },
  { id: 'account', en: '👤 Account / login', tr: '👤 Hesap / giriş' },
  { id: 'exam', en: '📝 Exams / content', tr: '📝 Sınavlar / içerik' },
  { id: 'ai', en: '🗣️ Practice partner', tr: '🗣️ Pratik partneri' },
  { id: 'other', en: '💬 Other', tr: '💬 Diğer' },
];

export const STATUS_LABEL = {
  open: { en: '🟡 Open', tr: '🟡 Açık' },
  answered: { en: '🟢 Answered', tr: '🟢 Yanıtlandı' },
  closed: { en: '⚪ Closed', tr: '⚪ Kapalı' },
};

// friendly text for the SQL trigger errors
function errText(error, t) {
  const m = error?.message || '';
  if (m.includes('daily ticket limit')) return t({ en: 'Daily ticket limit reached (5). Try again tomorrow.', tr: 'Günlük ticket sınırına ulaştın (5). Yarın tekrar dene.' });
  if (m.includes('daily reply limit')) return t({ en: 'Daily message limit reached. Try again tomorrow.', tr: 'Günlük mesaj sınırına ulaştın. Yarın tekrar dene.' });
  if (m.includes('too long')) return t({ en: 'Message too long.', tr: 'Mesaj çok uzun.' });
  return t({ en: 'Could not send — try again.', tr: 'Gönderilemedi — tekrar dene.' });
}

// ---------------- shared thread view (also used by the admin panel) ----------------
export function TicketThread({ ticket, asAdmin, onChanged }) {
  const t = useT();
  const user = useUser();
  const [replies, setReplies] = useState(null);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);

  async function load() {
    const { data } = await supa.from('ticket_replies').select('*')
      .eq('ticket_id', ticket.id).order('created_at');
    setReplies(data || []);
  }
  useEffect(() => { load(); }, [ticket.id]);

  async function send(e) {
    e.preventDefault();
    setBusy(true); setErr(null);
    const { error } = await supa.from('ticket_replies').insert({
      ticket_id: ticket.id, user_id: user.id, is_admin: !!asAdmin, body: msg.trim(),
    });
    if (error) { setErr(errText(error, t)); setBusy(false); return; }
    // a user message reopens, an admin message marks answered
    await supa.from('tickets').update({
      status: asAdmin ? 'answered' : 'open', updated_at: new Date().toISOString(),
    }).eq('id', ticket.id);
    setMsg(''); setBusy(false);
    load(); onChanged?.();
  }

  async function setStatus(status) {
    await supa.from('tickets').update({ status, updated_at: new Date().toISOString() }).eq('id', ticket.id);
    onChanged?.();
  }

  if (!replies) return <p>…</p>;
  return (
    <div className="ticket-thread">
      <div className="chat-list">
        {replies.map((r) => (
          <div key={r.id} className={'chat-turn' + (r.is_admin === !!asAdmin ? ' user' : '')}>
            <div className="bubble">
              <small className="ticket-who">{r.is_admin ? '🛟 Support' : ticket.email || t({ en: 'You', tr: 'Sen' })} · {new Date(r.created_at).toLocaleString()}</small>
              <div style={{ whiteSpace: 'pre-wrap' }}>{r.body}</div>
            </div>
          </div>
        ))}
      </div>
      {ticket.status !== 'closed' ? (
        <form onSubmit={send} className="ticket-reply">
          <textarea rows={3} required minLength={2} maxLength={2000} value={msg}
            placeholder={t({ en: 'Write a reply…', tr: 'Yanıt yaz…' })}
            onChange={(e) => setMsg(e.target.value)} />
          <div className="row-btns">
            <button className="btn" disabled={busy}>{t({ en: 'Send', tr: 'Gönder' })}</button>
            <button type="button" className="linklike" onClick={() => setStatus('closed')}>
              ✔ {t({ en: 'Close ticket', tr: 'Ticket\'ı kapat' })}
            </button>
          </div>
          {err && <div className="notice err">{err}</div>}
        </form>
      ) : (
        <p className="row-btns">
          <em>{t({ en: 'This ticket is closed.', tr: 'Bu ticket kapatıldı.' })}</em>
          {asAdmin && <button className="linklike" onClick={() => setStatus('answered')}>↩ {t({ en: 'Reopen', tr: 'Geri aç' })}</button>}
        </p>
      )}
    </div>
  );
}

// ---------------- Support page ----------------
export function Support() {
  const t = useT();
  const user = useUser();
  const [tickets, setTickets] = useState(null);
  const [openId, setOpenId] = useState(null);
  const [form, setForm] = useState(false);
  const [topic, setTopic] = useState('other');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);

  async function load() {
    const { data } = await supa.from('tickets').select('*')
      .eq('user_id', user.id).order('updated_at', { ascending: false });
    setTickets(data || []);
  }
  useEffect(() => { load(); }, []);

  async function create(e) {
    e.preventDefault();
    setBusy(true); setErr(null);
    const { data, error } = await supa.from('tickets').insert({
      user_id: user.id, email: user.email, topic, subject: subject.trim(),
    }).select().single();
    if (error) { setErr(errText(error, t)); setBusy(false); return; }
    const { error: e2 } = await supa.from('ticket_replies').insert({
      ticket_id: data.id, user_id: user.id, is_admin: false, body: body.trim(),
    });
    if (e2) { setErr(errText(e2, t)); setBusy(false); return; }
    setForm(false); setSubject(''); setBody(''); setBusy(false);
    setOpenId(data.id); load();
  }

  return (
    <div className="page narrow">
      <h1>🛟 {t({ en: 'Support', tr: 'Destek' })}</h1>

      <h2>{t({ en: 'My tickets', tr: 'Ticketlarım' })}</h2>
      <p className="fb-sub">{t({
        en: 'Could not find your answer below? Open a ticket — replies appear here.',
        tr: 'Aşağıda cevabını bulamadın mı? Ticket aç — yanıtlar burada görünür.',
      })}</p>
      {!tickets ? <p>…</p> : tickets.map((tk) => (
        <div key={tk.id} className={'rev ' + (tk.status === 'answered' ? 'ok' : '')}>
          <button className="linklike ticket-row" onClick={() => setOpenId(openId === tk.id ? null : tk.id)}>
            <b>{tk.subject}</b>{' '}
            <small>{t(STATUS_LABEL[tk.status] || STATUS_LABEL.open)} · {new Date(tk.updated_at).toLocaleDateString()}</small>
          </button>
          {openId === tk.id && <TicketThread ticket={tk} onChanged={load} />}
        </div>
      ))}
      {tickets && tickets.length === 0 && !form && (
        <p><em>{t({ en: 'No tickets yet.', tr: 'Henüz ticket yok.' })}</em></p>
      )}

      {form ? (
        <form onSubmit={create} className="card ticket-new">
          <select value={topic} onChange={(e) => setTopic(e.target.value)}>
            {TOPICS.map((o) => <option key={o.id} value={o.id}>{t(o)}</option>)}
          </select>
          <input required minLength={4} maxLength={120} value={subject}
            placeholder={t({ en: 'Subject (short)', tr: 'Konu (kısa)' })}
            onChange={(e) => setSubject(e.target.value)} />
          <textarea rows={5} required minLength={10} maxLength={2000} value={body}
            placeholder={t({
              en: 'Describe the problem: what did you do, what happened, which device/browser?',
              tr: 'Sorunu anlat: ne yaptın, ne oldu, hangi cihaz/tarayıcı?',
            })}
            onChange={(e) => setBody(e.target.value)} />
          <div className="row-btns">
            <button className="btn" disabled={busy}>{t({ en: 'Open ticket', tr: 'Ticket aç' })}</button>
            <button type="button" className="linklike" onClick={() => setForm(false)}>{t({ en: 'Cancel', tr: 'Vazgeç' })}</button>
          </div>
          {err && <div className="notice err">{err}</div>}
        </form>
      ) : (
        <button className="btn" onClick={() => setForm(true)}>➕ {t({ en: 'New ticket', tr: 'Yeni ticket' })}</button>
      )}

      <h2 style={{ marginTop: 32 }}>{t({ en: 'Frequently asked questions', tr: 'Sık sorulan sorular' })}</h2>
      {FAQ.map((f, i) => (
        <details key={i} className="faq-item">
          <summary>{t(f.q)}</summary>
          <p style={{ whiteSpace: 'pre-wrap' }}>{t(f.a)}</p>
        </details>
      ))}
    </div>
  );
}
