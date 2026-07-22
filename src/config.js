// Supabase project credentials. The anon key is safe to publish (protected by RLS).
// 1. Create a free project at https://supabase.com
// 2. Run supabase/schema.sql in the SQL Editor
// 3. Paste Project URL + anon public key below (Settings -> API)
export const SUPABASE_URL = 'https://dbsepyzkcucowiqfayva.supabase.co';
export const SUPABASE_ANON_KEY = 'sb_publishable_4ZLJqjhDbqiUS6LHdHhbLw_OBO40VfE';

// Cloudflare Turnstile captcha (free): https://dash.cloudflare.com -> Turnstile -> Add widget
// Put the SITE key here; put the SECRET key in Supabase -> Auth -> Attack Protection -> Enable CAPTCHA.
// Leave empty to disable the captcha widget (then also disable it in Supabase).
export const TURNSTILE_SITE_KEY = '0x4AAAAAAD7M9rsYbV9EEZDl';
