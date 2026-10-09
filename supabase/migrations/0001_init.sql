-- GadgetGeeks platform: initial schema
-- Run in the Supabase SQL editor (or `supabase db push`).
-- Covers all three layers: Customer Intelligence (profiles, devices, service records),
-- Service Marketplace (requests, partners), AI Guidance (catalogue, AI session log).

-- ---------- Profiles ----------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  phone text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  is_demo boolean not null default false, -- labelled sample data, kept apart from real users
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

-- Create a profile row whenever someone signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- Device Passport ----------
create table public.devices (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  kind text not null check (kind in ('laptop', 'desktop', 'phone', 'tablet', 'other')),
  brand text not null,
  model text not null,
  serial_number text,
  cpu text,
  ram_gb numeric,
  storage_type text check (storage_type in ('hdd', 'sata_ssd', 'nvme_ssd', 'emmc', 'other')),
  storage_gb numeric,
  os text,
  battery_health_pct numeric check (battery_health_pct between 0 and 100),
  purchase_date date,
  warranty_expires date,
  installed_software text[] default '{}',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.service_records (
  id uuid primary key default gen_random_uuid(),
  device_id uuid not null references public.devices (id) on delete cascade,
  service_slug text not null,
  summary text not null,
  performed_on date not null default current_date,
  amount_ngn integer,
  boot_seconds_before numeric,
  boot_seconds_after numeric,
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default now()
);

-- ---------- Service requests ----------
create table public.service_requests (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.profiles (id) on delete cascade,
  device_id uuid references public.devices (id) on delete set null,
  service_slug text not null,
  description text,
  preferred_time text,
  status text not null default 'new'
    check (status in ('new', 'confirmed', 'in_progress', 'done', 'cancelled', 'referred')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- Catalogue (the buying advisor recommends only from here) ----------
create table public.catalogue_items (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('laptop', 'phone', 'tablet', 'accessory')),
  brand text not null,
  model text not null,
  specs jsonb not null default '{}',     -- cpu, ram_gb, storage, screen, battery, etc.
  price_min_ngn integer,
  price_max_ngn integer,
  price_checked_on date,                 -- prices drift; the advisor shows this date
  best_for text[] default '{}',          -- e.g. {'engineering students','office work'}
  avoid_if text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- Trusted partners ----------
create table public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  service text not null,                 -- e.g. 'screen repair', 'phone sales'
  area text,
  contact text,
  consent_given_on date not null,        -- listed only with their consent
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- AI session log (no personal details stored) ----------
create table public.ai_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles (id) on delete set null,
  tool text not null check (tool in ('buying_advisor', 'diagnostic')),
  input jsonb not null,
  output jsonb,
  led_to_request boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------- Row level security ----------
alter table public.profiles enable row level security;
alter table public.devices enable row level security;
alter table public.service_records enable row level security;
alter table public.service_requests enable row level security;
alter table public.catalogue_items enable row level security;
alter table public.partners enable row level security;
alter table public.ai_sessions enable row level security;

-- Profiles: you see and edit your own; admin sees all
create policy "own profile read" on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "own profile update" on public.profiles for update using (id = auth.uid())
  with check (id = auth.uid() and role = (select role from public.profiles where id = auth.uid()));
create policy "admin profile all" on public.profiles for all using (public.is_admin());

-- Devices: owner or admin
create policy "devices owner" on public.devices for all
  using (owner_id = auth.uid() or public.is_admin())
  with check (owner_id = auth.uid() or public.is_admin());

-- Service records: owner reads, admin writes
create policy "records owner read" on public.service_records for select using (
  public.is_admin() or exists (select 1 from public.devices d where d.id = device_id and d.owner_id = auth.uid())
);
create policy "records admin write" on public.service_records for all using (public.is_admin()) with check (public.is_admin());

-- Requests: customer creates and reads own; admin manages all
create policy "requests owner read" on public.service_requests for select using (customer_id = auth.uid() or public.is_admin());
create policy "requests owner insert" on public.service_requests for insert with check (customer_id = auth.uid());
create policy "requests admin write" on public.service_requests for update using (public.is_admin());

-- Catalogue and partners: anyone reads active rows; admin manages
create policy "catalogue public read" on public.catalogue_items for select using (active or public.is_admin());
create policy "catalogue admin write" on public.catalogue_items for all using (public.is_admin()) with check (public.is_admin());
create policy "partners public read" on public.partners for select using (active or public.is_admin());
create policy "partners admin write" on public.partners for all using (public.is_admin()) with check (public.is_admin());

-- AI sessions: written by the server only (service role); admin reads
create policy "ai admin read" on public.ai_sessions for select using (public.is_admin());
