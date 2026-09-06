-- Admin replies to feedback messages. Run once in the Supabase SQL Editor (after
-- feedback.sql). The existing "admin updates feedback" policy already allows the write.

alter table public.feedback add column if not exists reply text;
alter table public.feedback add column if not exists replied_at timestamptz;
