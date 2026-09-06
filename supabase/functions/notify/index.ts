// Sends an e-mail to a member when the admin answers their ticket or feedback.
//
// Only the admin may call this: the caller's JWT is checked and its e-mail compared to
// ADMIN_EMAILS. Mail goes out through Brevo's free transactional API (300/day), the same
// account already used for Supabase auth mail.
//
// Secrets (supabase secrets set NAME=value):
//   BREVO_API_KEY   required — Brevo → SMTP & API → API keys (starts with xkeysib-)
//   MAIL_FROM       required — a sender verified in Brevo, e.g. you@example.com
//   ADMIN_EMAILS    optional — comma-separated; defaults to the site admin
//   SITE_URL        optional — link in the footer of the mail

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!;
const BREVO_KEY = Deno.env.get('BREVO_API_KEY');
const FROM = Deno.env.get('MAIL_FROM');
const ADMINS = (Deno.env.get('ADMIN_EMAILS') ?? 'hayrullahcanbazoglu@gmail.com')
  .split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
const SITE = Deno.env.get('SITE_URL') ?? 'https://hayrullahc.github.io/inburgering/';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type, apikey',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, 'Content-Type': 'application/json' } });

const esc = (s: string) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]!));

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return json({ error: 'method' }, 405);
  if (!BREVO_KEY || !FROM) return json({ error: 'not_configured' }, 503);

  const auth = req.headers.get('Authorization') ?? '';
  const who = await fetch(`${SUPABASE_URL}/auth/v1/user`, { headers: { Authorization: auth, apikey: ANON_KEY } });
  if (!who.ok) return json({ error: 'auth' }, 401);
  const user = await who.json();
  if (!user?.email || !ADMINS.includes(String(user.email).toLowerCase())) return json({ error: 'forbidden' }, 403);

  const body = await req.json().catch(() => null);
  const to = String(body?.to ?? '').trim();
  const subject = String(body?.subject ?? '').trim().slice(0, 150);
  const text = String(body?.text ?? '').trim().slice(0, 4000);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to) || !subject || !text) return json({ error: 'bad_request' }, 400);

  const html = `<p style="white-space:pre-wrap;font-family:sans-serif">${esc(text)}</p>
<p style="font-family:sans-serif;color:#666;font-size:13px">— Nederlands leren 🇳🇱<br><a href="${SITE}#/support">${SITE}#/support</a></p>`;

  const r = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'api-key': BREVO_KEY, 'Content-Type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({
      sender: { email: FROM, name: 'Nederlands leren' },
      replyTo: { email: FROM },
      to: [{ email: to }],
      subject,
      htmlContent: html,
      textContent: `${text}\n\n— Nederlands leren\n${SITE}#/support`,
    }),
  });
  if (!r.ok) return json({ error: 'mail_failed', detail: (await r.text()).slice(0, 300) }, 502);
  return json({ ok: true });
});
