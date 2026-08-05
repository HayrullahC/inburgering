# Inburgering A2 Kurs 🇳🇱

Free, bilingual (English/Turkish) preparation course for the Dutch **inburgeringsexamen (A2)**.

**Content:** 600 words with pictures & audio · complete A2 grammar (28 lessons) · 100 practice exams (Lezen, Luisteren, Schrijven, Spreken, KNM — 20 exams × 25 questions each) · 4 word games · email login with cloud progress sync.

## Stack

- React + Vite (SPA, HashRouter) — deployed free on **GitHub Pages**
- **Supabase** — email auth (signup, login, password reset) + progress storage
- Browser speech synthesis (Dutch voice) for all audio — free, no API keys

## Development

```bash
npm install
npm run gen     # regenerate exam JSON files (already committed)
npm run dev
```

## Supabase setup (one time, ~5 minutes)

1. Create a free project at [supabase.com](https://supabase.com).
2. In **SQL Editor**, paste and run `supabase/schema.sql`.
3. In **Settings → API**, copy the *Project URL* and *anon public* key into `src/config.js`.
4. In **Authentication → URL Configuration**, set the Site URL to your site
   (e.g. `https://hayrullahc.github.io/inburgering/`) and add it to the redirect list.
5. Commit & push — done. The site is members-only: until Supabase is configured, visitors only see a setup notice.

## Feedback & admin panel

Run `supabase/feedback.sql` once in the Supabase SQL Editor. It creates the `feedback`
table (the in-app 💬 button writes there) and gives the admin email (see `is_admin()` in
that file and `ADMIN_EMAILS` in `src/config.js`) access to the `/admin` panel: feedback
inbox + user stats.

## Captcha (Cloudflare Turnstile, free)

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Turnstile** → *Add widget* (hostname: `hayrullahc.github.io`, mode: Managed).
2. Copy the **Site Key** into `TURNSTILE_SITE_KEY` in `src/config.js`.
3. Copy the **Secret Key** into Supabase → **Authentication → Attack Protection → Enable CAPTCHA protection** (provider: Turnstile).
4. Push. While `TURNSTILE_SITE_KEY` is empty the widget is hidden — keep Supabase captcha protection off in that case, otherwise logins fail.

## Deployment

Every push to `main` builds and deploys to GitHub Pages automatically
(`.github/workflows/deploy.yml`). No servers, no cost.

## Data

- `src/data/vocab.js` — 600 words: `{ nl, en, tr, ex, emoji, cat }`
- `src/data/grammar.js` — 28 bilingual grammar lessons
- `src/data/knm.js` — KNM question bank
- `scripts/gen-exams.mjs` — deterministic exam generator → `src/data/exams/*.json`

Veel succes! 💪
