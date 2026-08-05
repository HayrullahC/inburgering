-- Feedback table + admin access + user management. Run once in Supabase SQL Editor
-- (after schema.sql). Safe to re-run: policies are dropped and recreated.

create table if not exists public.feedback (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users (id) on delete set null,
  email text,
  kind text not null default 'other', -- bug | idea | other
  message text not null,
  page text,
  status text not null default 'new', -- new | done
  created_at timestamptz not null default now()
);

alter table public.feedback enable row level security;

-- email shown in the admin user list (filled on each sync)
alter table public.progress add column if not exists email text;

-- single source of truth for who is admin
create or replace function public.is_admin() returns boolean
language sql stable as $$
  select coalesce(auth.jwt()->>'email', '') in ('hayrullahcanbazoglu@gmail.com');
$$;

drop policy if exists "members send feedback" on public.feedback;
create policy "members send feedback" on public.feedback
  for insert with check (auth.uid() = user_id);
drop policy if exists "admin reads feedback" on public.feedback;
create policy "admin reads feedback" on public.feedback
  for select using (public.is_admin());
drop policy if exists "admin updates feedback" on public.feedback;
create policy "admin updates feedback" on public.feedback
  for update using (public.is_admin());
drop policy if exists "admin deletes feedback" on public.feedback;
create policy "admin deletes feedback" on public.feedback
  for delete using (public.is_admin());

-- admin can read everyone's progress (stats) and delete a row (reset a user)
drop policy if exists "admin reads all progress" on public.progress;
create policy "admin reads all progress" on public.progress
  for select using (public.is_admin());
drop policy if exists "admin deletes progress" on public.progress;
create policy "admin deletes progress" on public.progress
  for delete using (public.is_admin());
