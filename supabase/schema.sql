-- Kawaya Academy Operator Competition Hiring Platform
-- Supabase SQL schema + RLS policies

-- Required for gen_random_uuid()
create extension if not exists pgcrypto;

-- =============
-- Tables
-- =============

create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  application_data jsonb not null default '{}'::jsonb,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint applications_one_per_user unique (user_id)
);

-- If the table already existed (created by an older version of this schema),
-- `create table if not exists` will NOT add new columns. Make the schema idempotent.
alter table public.applications
add column if not exists updated_at timestamptz not null default now();

-- Backfill existing rows if the column was just added.
update public.applications
set updated_at = created_at
where updated_at is null;

create table if not exists public.assessment_responses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  section_id text not null,
  response_data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint assessment_one_per_section unique (user_id, section_id)
);

create table if not exists public.uploads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  file_path text not null,
  uploaded_at timestamptz not null default now()
);

-- =============
-- Triggers
-- =============

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_assessment_updated_at on public.assessment_responses;
create trigger set_assessment_updated_at
before update on public.assessment_responses
for each row
execute function public.set_updated_at();

drop trigger if exists set_applications_updated_at on public.applications;
create trigger set_applications_updated_at
before update on public.applications
for each row
execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.users (id, email, created_at)
  values (new.id, new.email, now())
  on conflict (id) do update set email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute procedure public.handle_new_user();

-- =============
-- Row Level Security (RLS)
-- =============

alter table public.users enable row level security;
alter table public.applications enable row level security;
alter table public.assessment_responses enable row level security;
alter table public.uploads enable row level security;

-- users: read own row
drop policy if exists "users_select_own" on public.users;
create policy "users_select_own"
on public.users
for select
using (auth.uid() = id);

-- applications: CRUD own row
drop policy if exists "applications_select_own" on public.applications;
create policy "applications_select_own"
on public.applications
for select
using (auth.uid() = user_id);

drop policy if exists "applications_insert_own" on public.applications;
create policy "applications_insert_own"
on public.applications
for insert
with check (auth.uid() = user_id);

drop policy if exists "applications_update_own" on public.applications;
create policy "applications_update_own"
on public.applications
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "applications_delete_own" on public.applications;
create policy "applications_delete_own"
on public.applications
for delete
using (auth.uid() = user_id);

-- assessment_responses: CRUD own rows
drop policy if exists "assessment_select_own" on public.assessment_responses;
create policy "assessment_select_own"
on public.assessment_responses
for select
using (auth.uid() = user_id);

drop policy if exists "assessment_insert_own" on public.assessment_responses;
create policy "assessment_insert_own"
on public.assessment_responses
for insert
with check (auth.uid() = user_id);

drop policy if exists "assessment_update_own" on public.assessment_responses;
create policy "assessment_update_own"
on public.assessment_responses
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "assessment_delete_own" on public.assessment_responses;
create policy "assessment_delete_own"
on public.assessment_responses
for delete
using (auth.uid() = user_id);

-- uploads: insert/select own rows (delete allowed)
drop policy if exists "uploads_select_own" on public.uploads;
create policy "uploads_select_own"
on public.uploads
for select
using (auth.uid() = user_id);

drop policy if exists "uploads_insert_own" on public.uploads;
create policy "uploads_insert_own"
on public.uploads
for insert
with check (auth.uid() = user_id);

drop policy if exists "uploads_delete_own" on public.uploads;
create policy "uploads_delete_own"
on public.uploads
for delete
using (auth.uid() = user_id);

-- =============
-- Storage bucket + policies (run after you enable Storage in Supabase)
-- =============
-- Bucket name: assessment-uploads
-- Path convention: <user_id>/<filename>

insert into storage.buckets (id, name, public)
values ('assessment-uploads', 'assessment-uploads', false)
on conflict (id) do nothing;

-- Restrict storage objects to each user's folder.
-- Note: storage.objects already has RLS enabled in Supabase projects.

drop policy if exists "storage_assessment_uploads_insert_own" on storage.objects;
create policy "storage_assessment_uploads_insert_own"
on storage.objects
for insert
with check (
  bucket_id = 'assessment-uploads'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "storage_assessment_uploads_select_own" on storage.objects;
create policy "storage_assessment_uploads_select_own"
on storage.objects
for select
using (
  bucket_id = 'assessment-uploads'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "storage_assessment_uploads_delete_own" on storage.objects;
create policy "storage_assessment_uploads_delete_own"
on storage.objects
for delete
using (
  bucket_id = 'assessment-uploads'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- =============
-- Admin convenience view (Supabase dashboard / service role)
-- =============
-- This makes it easy to review applications + assessment progress in one place.
create or replace view public.application_overview as
select
  a.user_id,
  u.email,
  a.status,
  a.created_at,
  a.updated_at,
  a.application_data,
  (
    select count(*)::int
    from public.assessment_responses r
    where r.user_id = a.user_id
  ) as assessment_responses_count,
  (
    select count(*)::int
    from public.uploads up
    where up.user_id = a.user_id
  ) as uploads_count
from public.applications a
join public.users u on u.id = a.user_id;


