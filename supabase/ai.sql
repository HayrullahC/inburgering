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

-- One statement the Edge Function calls per message: bump the counter and hand back the
-- new value, so counting and reading cannot drift apart under concurrent requests.
create or replace function public.bump_ai_usage(p_user uuid)
returns int
language plpgsql
security definer
set search_path = public
as $$
declare
  new_count int;
begin
  insert into public.ai_usage (user_id, day, count)
  values (p_user, (now() at time zone 'utc')::date, 1)
  on conflict (user_id, day)
    do update set count = public.ai_usage.count + 1
  returning count into new_count;
  return new_count;
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
