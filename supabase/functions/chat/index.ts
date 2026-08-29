// AI practice partner — the only server-side piece of the app.
//
// The site is a static build on GitHub Pages in a public repo, so no API key can live in
// the frontend. This function holds the key, checks that the caller is a logged-in
// member, counts their messages against a daily quota, and proxies the conversation to
// Groq. Nothing about the conversation is stored: only a per-user counter.
//
// Secrets to set (supabase secrets set NAME=value):
//   GROQ_API_KEY          required
//   GROQ_MODEL            optional, overrides the default model
//   AI_DAILY_PER_USER     optional, default 30
//   AI_DAILY_GLOBAL       optional, default 2000

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!;
const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const GROQ_KEY = Deno.env.get('GROQ_API_KEY');
const PER_USER = Number(Deno.env.get('AI_DAILY_PER_USER') ?? 30);
const GLOBAL_CAP = Number(Deno.env.get('AI_DAILY_GLOBAL') ?? 2000);

// Primary first, cheaper fallback second. GROQ_MODEL overrides the primary without a
// redeploy, which matters because hosted model names get retired now and then.
const MODELS = [
  Deno.env.get('GROQ_MODEL') || 'openai/gpt-oss-120b',
  'groq/compound-mini',
  'qwen/qwen3.8-27b',
];

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });

const LEVEL_RULES: Record<string, string> = {
  A2: 'Schrijf hooguit twee korte zinnen (samen maximaal 25 woorden). Gebruik alledaagse woorden, tegenwoordige tijd en perfectum. Vermijd lange bijzinnen.',
  B1: 'Schrijf twee tot drie zinnen (samen maximaal 45 woorden). Gebruik gewone spreektaal met bijzinnen en voegwoorden zoals omdat, hoewel en zodra.',
  B2: 'Schrijf drie tot vier zinnen (samen maximaal 70 woorden). Gebruik genuanceerde, iets formelere taal met nevenschikking, passief en verbindingswoorden.',
};

// Models drift into Dutch when a Dutch prompt asks them to explain in another language,
// so the rule is stated twice and shown once, with a worked example in the target
// language. Measured: without the example the explanation came back in Dutch.
const EXAMPLE = {
  tr: '{"reply_nl":"Wat vervelend. Sinds wanneer heeft u pijn?","correction":{"original":"Ik heb naar huis gegaan","fixed":"Ik ben naar huis gegaan","why":"Hareket fiilleri (gaan, komen, blijven) perfectumda hebben degil zijn yardimci fiilini alir."},"ask_repeat":true}',
  en: '{"reply_nl":"Wat vervelend. Sinds wanneer heeft u pijn?","correction":{"original":"Ik heb naar huis gegaan","fixed":"Ik ben naar huis gegaan","why":"Verbs of movement (gaan, komen, blijven) take zijn in the perfect tense, not hebben."},"ask_repeat":true}',
};

function systemPrompt(level: string, situation: string, uiLang: string) {
  const explain = uiLang === 'tr' ? 'Turks' : 'Engels';
  return `Je bent een Nederlandse gesprekspartner die een cursist laat oefenen voor het inburgeringsexamen / Staatsexamen NT2 op niveau ${level}.

SITUATIE
${situation}
Blijf in deze rol en in deze situatie. Dit is geen vrije chat: stuur het gesprek als een examenopdracht, met concrete vragen die de cursist moet beantwoorden.

TAALNIVEAU
${LEVEL_RULES[level] ?? LEVEL_RULES.A2}
Eindig je antwoord altijd met één vraag, zodat de cursist verder moet praten.

CORRIGEREN
Kijk naar het laatste bericht van de cursist. Corrigeer alleen echte fouten in grammatica, woordvolgorde of woordkeuze. Negeer ontbrekende hoofdletters, punten en accenten. Is het Nederlands goed genoeg, laat "correction" dan weg.
Verander de betekenis en de tijd van de zin niet: verbeter alleen wat echt fout is.

Het veld "why" schrijf je VOLLEDIG in het ${explain}. Gebruik geen Nederlandse zin in "why" — alleen losse Nederlandse woorden die je citeert. Noem de regel die misging, bijvoorbeeld: hulpwerkwoord zijn bij gaan/komen/blijven, werkwoord op de tweede plaats, werkwoord achteraan in de bijzin na omdat/dat/als, de of het, bijvoeglijk naamwoord met -e.
Zo ziet een goed antwoord met uitleg in het ${explain} eruit:
${uiLang === 'tr' ? EXAMPLE.tr : EXAMPLE.en}

Schrijft de cursist in het Engels of Turks, antwoord dan gewoon in het Nederlands en moedig hem in het ${explain} aan het in het Nederlands te proberen.

ANTWOORD ALLEEN MET JSON, exact in deze vorm:
{
  "reply_nl": "jouw antwoord in het Nederlands",
  "correction": { "original": "de zin van de cursist", "fixed": "de verbeterde zin", "why": "uitleg in het ${explain}" },
  "ask_repeat": true of false,
  "exam_tip": "korte tip in het ${explain}"
}
"correction" laat je weg als er niets te verbeteren valt. "ask_repeat" is true als de cursist de verbeterde zin het beste hardop kan herhalen. "exam_tip" geef je hooguit af en toe, niet bij elk bericht; laat hem anders weg.`;
}

async function callGroq(model: string, messages: unknown[]) {
  const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${GROQ_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 500,
      response_format: { type: 'json_object' },
    }),
  });
  if (!r.ok) throw new Error(`groq ${r.status}: ${(await r.text()).slice(0, 200)}`);
  const data = await r.json();
  return data.choices?.[0]?.message?.content ?? '';
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return json({ error: 'method' }, 405);
  if (!GROQ_KEY) return json({ error: 'not_configured' }, 503);

  // 1. the caller must be a logged-in member
  const auth = req.headers.get('Authorization') ?? '';
  const who = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: { Authorization: auth, apikey: ANON_KEY },
  });
  if (!who.ok) return json({ error: 'auth' }, 401);
  const user = await who.json();
  if (!user?.id) return json({ error: 'auth' }, 401);

  const body = await req.json().catch(() => null);
  const level = ['A2', 'B1', 'B2'].includes(body?.level) ? body.level : 'A2';
  const uiLang = body?.uiLang === 'tr' ? 'tr' : 'en';
  const situation = String(body?.situation ?? '').slice(0, 600);
  const history = Array.isArray(body?.messages) ? body.messages.slice(-12) : [];
  if (!situation || !history.length) return json({ error: 'bad_request' }, 400);

  const rpc = (fn: string, args: Record<string, unknown>) =>
    fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
      method: 'POST',
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    }).then((r) => (r.ok ? r.json() : null));

  // 2. the shared free tier has to survive everyone, so cap the day globally too
  const usedToday = (await rpc('ai_usage_today', {})) ?? 0;
  if (usedToday >= GLOBAL_CAP) return json({ error: 'global_quota' }, 429);

  // 3. count this message before spending it
  const mine = (await rpc('bump_ai_usage', { p_user: user.id })) ?? 1;
  if (mine > PER_USER) return json({ error: 'quota', remaining: 0 }, 429);
  const remaining = Math.max(PER_USER - mine, 0);

  const messages = [
    { role: 'system', content: systemPrompt(level, situation, uiLang) },
    ...history
      .filter((m: { role?: string; content?: string }) => m?.role && m?.content)
      .map((m: { role: string; content: string }) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: String(m.content).slice(0, 1000),
      })),
  ];

  let raw = '';
  let lastErr = '';
  for (const model of MODELS) {
    try {
      raw = await callGroq(model, messages);
      if (raw) break;
    } catch (e) {
      lastErr = String(e);
    }
  }
  if (!raw) {
    // the learner never got an answer, so the message should not cost them a turn
    await fetch(
      `${SUPABASE_URL}/rest/v1/ai_usage?user_id=eq.${user.id}&day=eq.${new Date().toISOString().slice(0, 10)}`,
      {
        method: 'PATCH',
        headers: {
          apikey: SERVICE_KEY,
          Authorization: `Bearer ${SERVICE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ count: Math.max(mine - 1, 0) }),
      },
    ).catch(() => {});
    return json({ error: 'upstream', detail: lastErr.slice(0, 200), remaining: remaining + 1 }, 502);
  }

  let out: Record<string, unknown>;
  try {
    out = JSON.parse(raw);
  } catch {
    // a model that ignored the format still said something useful — pass it through
    out = { reply_nl: String(raw).slice(0, 500), ask_repeat: false };
  }

  const c = out.correction as Record<string, string> | undefined;
  return json({
    reply_nl: String(out.reply_nl ?? '').slice(0, 800),
    correction:
      c && c.fixed && c.original
        ? {
            original: String(c.original).slice(0, 300),
            fixed: String(c.fixed).slice(0, 300),
            why: String(c.why ?? '').slice(0, 300),
          }
        : null,
    ask_repeat: !!out.ask_repeat,
    exam_tip: out.exam_tip ? String(out.exam_tip).slice(0, 300) : null,
    remaining,
  });
});
