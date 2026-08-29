-- Support tickets + threaded replies. Run once in Supabase SQL Editor
-- (after feedback.sql — it needs is_admin()). Safe to re-run.

create table if not exists public.tickets (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  email text,
  topic text not null default 'other',   -- audio | account | exam | ai | other
  subject text not null,
  status text not null default 'open',   -- open | answered | closed
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ticket_replies (
  id bigint generated always as identity primary key,
  ticket_id bigint not null references public.tickets (id) on delete cascade,
  user_id uuid references auth.users (id) on delete set null,
  is_admin boolean not null default false,
  body text not null,
  created_at timestamptz not null default now()
);

alter table public.tickets enable row level security;
alter table public.ticket_replies enable row level security;

-- ---- flood protection (server side — the form also limits, but forms lie) ----
create or replace function public.ticket_guard() returns trigger
language plpgsql security definer as $$
begin
  if char_length(new.subject) > 120 then
    raise exception 'subject too long';
  end if;
  if (select count(*) from public.tickets
      where user_id = new.user_id and created_at > now() - interval '1 day') >= 5 then
    raise exception 'daily ticket limit reached';
  end if;
  return new;
end $$;

create or replace function public.reply_guard() returns trigger
language plpgsql security definer as $$
begin
  if char_length(new.body) > 2000 then
    raise exception 'message too long';
  end if;
  -- admins are exempt from the daily cap
  if not new.is_admin and (select count(*) from public.ticket_replies
      where user_id = new.user_id and created_at > now() - interval '1 day') >= 30 then
    raise exception 'daily reply limit reached';
  end if;
  return new;
end $$;

drop trigger if exists ticket_guard on public.tickets;
create trigger ticket_guard before insert on public.tickets
  for each row execute function public.ticket_guard();
drop trigger if exists reply_guard on public.ticket_replies;
create trigger reply_guard before insert on public.ticket_replies
  for each row execute function public.reply_guard();

-- ---- tickets: owner + admin ----
drop policy if exists "own tickets" on public.tickets;
create policy "own tickets" on public.tickets
  for select using (auth.uid() = user_id or public.is_admin());
drop policy if exists "create own ticket" on public.tickets;
create policy "create own ticket" on public.tickets
  for insert with check (auth.uid() = user_id);
-- status changes: owner may close their own ticket, admin may set anything
drop policy if exists "update ticket" on public.tickets;
create policy "update ticket" on public.tickets
  for update using (auth.uid() = user_id or public.is_admin());
drop policy if exists "admin deletes ticket" on public.tickets;
create policy "admin deletes ticket" on public.tickets
  for delete using (public.is_admin());

-- ---- replies: visible to ticket owner + admin; append-only ----
drop policy if exists "read replies" on public.ticket_replies;
create policy "read replies" on public.ticket_replies
  for select using (
    public.is_admin() or
    exists (select 1 from public.tickets t where t.id = ticket_id and t.user_id = auth.uid())
  );
drop policy if exists "write reply" on public.ticket_replies;
create policy "write reply" on public.ticket_replies
  for insert with check (
    auth.uid() = user_id and (
      (public.is_admin() and is_admin) or
      (not is_admin and exists
        (select 1 from public.tickets t where t.id = ticket_id and t.user_id = auth.uid() and t.status <> 'closed'))
    )
  );
drop policy if exists "admin deletes reply" on public.ticket_replies;
create policy "admin deletes reply" on public.ticket_replies
  for delete using (public.is_admin());
