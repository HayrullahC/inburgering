# Nederlands leren 🇳🇱 — A2 · B1 · B2

Free, bilingual (English/Turkish) preparation course for the Dutch exams, from the
**inburgeringsexamen** all the way to **Staatsexamen NT2 Programma II**.

| Level | Prepares you for | Modules | Practice exams |
|---|---|---|---|
| **A2** | inburgeringsexamen | Lezen, Luisteren, Schrijven, Spreken, KNM | 50 per module |
| **B1** | inburgering B1-route / Staatsexamen NT2 I (work, mbo) | same five | 40 per module |
| **B2** | Staatsexamen NT2 II (hbo, university) | four — no KNM | 30 per module |

**Content:** 2977 words with pictures & audio (1000 A2, 982 B1, 995 B2) · 72 grammar lessons ·
570 practice exams of 25 questions · 220-question KNM bank · 9 games · email login with
cloud progress sync. Pick a level in the header and everything follows it.

Like the real exam: **Spreken** asks questions out loud and listens to your answer through
the microphone (Dutch speech recognition + criteria scoring), **Schrijven** is open writing
(sentence completion, forms, short messages, and at B2 argumentative texts) graded on
visible criteria with model answers.

**Games:** flashcards (spaced repetition), match pairs, word sprint, type the word,
sentence builder (word order), de/het trainer, verb forms, dictation, meaning match.
Every game has a 💡 hint — uncover a letter, remove two wrong answers, place the next
word, show the shape of the sentence, or (for de/het) the actual grammar rule, offered
only when that rule really explains the word at hand.

Every example sentence is translated into English and Turkish. The translations live in
`src/data/ex/` and load only when a screen needs them, so the first page load stays small.

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

## Email sending (SMTP, free)

Supabase's built-in mailer sends only ~2 emails/hour — enough for testing only.
Connect a free SMTP provider (e.g. [Brevo](https://www.brevo.com), 300 mails/day, no domain needed):
Brevo → **SMTP & API** → generate an SMTP key, then Supabase → **Project Settings →
Authentication → SMTP Settings**: host `smtp-relay.brevo.com`, port `587`, the Brevo SMTP
login as username, the key as password. Then raise the limit under **Authentication → Rate Limits**.

## AI practice partner (free)

A conversation partner that stays inside an exam-like situation (doctor, town hall, shop,
neighbours, work, phone, school, housing), corrects what you wrote and explains why in
your interface language. Speech in and out uses the browser, so only the text model costs
anything — and that runs on Groq's free tier.

The site is a static build in a public repo, so the API key cannot live in the frontend.
It lives in a Supabase Edge Function instead, which also checks that the caller is a
logged-in member and counts their daily messages.

1. Run `supabase/ai.sql` once in the Supabase SQL Editor (creates the quota table).
2. Get a free API key at [console.groq.com](https://console.groq.com) (no card needed).
3. Install the CLI and log in: `npm i -g supabase` then `supabase login`.
4. From the repo root:

```bash
supabase link --project-ref dbsepyzkcucowiqfayva
supabase secrets set GROQ_API_KEY=gsk_your_key_here
supabase functions deploy chat
```

Optional secrets: `GROQ_MODEL` (override the model without redeploying),
`AI_DAILY_PER_USER` (default 30), `AI_DAILY_GLOBAL` (default 2000).

Until the function is deployed the Practice tab still opens and explains that the partner
is not switched on yet — nothing else in the course is affected.

## Captcha (Cloudflare Turnstile, free)

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Turnstile** → *Add widget* (hostname: `hayrullahc.github.io`, mode: Managed).
2. Copy the **Site Key** into `TURNSTILE_SITE_KEY` in `src/config.js`.
3. Copy the **Secret Key** into Supabase → **Authentication → Attack Protection → Enable CAPTCHA protection** (provider: Turnstile).
4. Push. While `TURNSTILE_SITE_KEY` is empty the widget is hidden — keep Supabase captcha protection off in that case, otherwise logins fail.

## Deployment

Every push to `main` builds and deploys to GitHub Pages automatically
(`.github/workflows/deploy.yml`). No servers, no cost.

## Data

- `src/data/index.js` — merges every level; `vocabFor(level)`, `grammarFor(level)`, `catsFor(level)`
- `src/data/vocab.js` (A2) + `vocab-b1a/b1b.js` (B1) + `vocab-b2a/b2b/b2c.js` (B2) —
  `{ id, nl, en, tr, ex, emoji, cat, level }`
- `src/data/grammar.js` (30 A2) + `grammar-b1.js` (22) + `grammar-b2.js` (20 style & argumentation lessons)
- `src/data/verbs.js` — irregular verb table for the conjugation game
- `scripts/banks/*.mjs` — authored A2/B1/B2 source material: reading texts, listening scripts,
  writing tasks and speaking tasks the generator slices into exams
- `src/data/knm.js` — KNM question bank
- `scripts/gen-exams.mjs` — deterministic exam generator → `src/data/exams/*.json`

Veel succes! 💪
