-- Daily quota for the AI practice partner.
-- Run once in the Supabase SQL Editor (after schema.sql and feedback.sql).
--
-- The counter is written only by the chat Edge Function with the service-role key, so a
-- user cannot inflate their own allowance. Users may read their own row (the UI shows
-- "N messages left today"), and the admin may read all of them.

create table if not exists public.ai_usage (
  user_id uuid not null references auth.users (id) on delete cascade,
  day date not null default (now() at time zone 'utc')::date,
  count int not null default 0,
  primary key (user_id, day)
);

alter table public.ai_usage enable row level security;

drop policy if exists "own usage select" on public.ai_usage;
create policy "own usage select" on public.ai_usage
  for select using (auth.uid() = user_id);

drop policy if exists "admin reads usage" on public.ai_usage;
create policy "admin reads usage" on public.ai_usage
  for select using (public.is_admin());

-- Deliberately no insert/update/delete policy: only the service-role key writes here.

-- Burst tracking, so one person with a script cannot drain the shared free tier in
-- twenty seconds. Safe to run again on an existing table.
alter table public.ai_usage add column if not exists last_at timestamptz;
alter table public.ai_usage add column if not exists burst int not null default 0;

-- One statement the Edge Function calls per message: bump the daily counter and the
-- per-minute burst counter together, and hand both back, so counting and reading cannot
-- drift apart under concurrent requests.
-- the earlier version returned int; Postgres refuses to change a return type in place
drop function if exists public.bump_ai_usage(uuid);

create or replace function public.bump_ai_usage(p_user uuid)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  r public.ai_usage%rowtype;
begin
  insert into public.ai_usage (user_id, day, count, last_at, burst)
  values (p_user, (now() at time zone 'utc')::date, 1, now(), 1)
  on conflict (user_id, day) do update set
    count = public.ai_usage.count + 1,
    -- a fresh minute restarts the burst window
    burst = case
      when public.ai_usage.last_at > now() - interval '1 minute'
      then public.ai_usage.burst + 1
      else 1
    end,
    last_at = now()
  returning * into r;
  return json_build_object('count', r.count, 'burst', r.burst);
end;
$$;

-- Total messages across all users today, for the global daily ceiling.
create or replace function public.ai_usage_today()
returns int
language sql
security definer
set search_path = public
as $$
  select coalesce(sum(count), 0)::int
  from public.ai_usage
  where day = (now() at time zone 'utc')::date;
$$;
