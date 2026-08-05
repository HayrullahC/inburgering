-- Feedback table + admin access. Run once in Supabase SQL Editor (after schema.sql).

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

-- single source of truth for who is admin
create or replace function public.is_admin() returns boolean
language sql stable as $$
  select coalesce(auth.jwt()->>'email', '') in ('hayrullahcanbazoglu@gmail.com');
$$;

create policy "members send feedback" on public.feedback
  for insert with check (auth.uid() = user_id);
create policy "admin reads feedback" on public.feedback
  for select using (public.is_admin());
create policy "admin updates feedback" on public.feedback
  for update using (public.is_admin());
create policy "admin deletes feedback" on public.feedback
  for delete using (public.is_admin());

-- admin can read everyone's progress for the stats dashboard
create policy "admin reads all progress" on public.progress
  for select using (public.is_admin());
