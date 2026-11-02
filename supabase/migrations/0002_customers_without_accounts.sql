-- GadgetGeeks: 0002
-- Lets the admin record customers who have no account yet (past customers, walk-ins).
-- A profile is now its own record; `user_id` links it to a login when the person has one.
-- Run once in the Supabase SQL editor, after 0001.

-- 1. Drop the policies that assumed profile id = login id
drop policy if exists "own profile read" on public.profiles;
drop policy if exists "own profile update" on public.profiles;
drop policy if exists "admin profile all" on public.profiles;
drop policy if exists "devices owner" on public.devices;
drop policy if exists "records owner read" on public.service_records;
drop policy if exists "records admin write" on public.service_records;
drop policy if exists "requests owner read" on public.service_requests;
drop policy if exists "requests owner insert" on public.service_requests;
drop policy if exists "requests admin write" on public.service_requests;

-- 2. Profiles: own id, optional link to a login
alter table public.profiles drop constraint if exists profiles_id_fkey;
alter table public.profiles alter column id set default gen_random_uuid();
alter table public.profiles add column if not exists user_id uuid unique references auth.users (id) on delete set null;
alter table public.profiles add column if not exists email text;
alter table public.profiles add column if not exists added_by_admin boolean not null default false;
update public.profiles set user_id = id where user_id is null and added_by_admin = false;

-- 3. Helpers
create or replace function public.current_profile_id()
returns uuid language sql stable security definer set search_path = public as $$
  select id from public.profiles where user_id = auth.uid();
$$;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where user_id = auth.uid() and role = 'admin');
$$;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (user_id, email, full_name, phone)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'phone'
  );
  return new;
end;
$$;

-- 4. Customers may only edit their name and phone (never their role)
revoke update on public.profiles from authenticated;
grant update (full_name, phone) on public.profiles to authenticated;

-- 5. Policies
create policy "profile read" on public.profiles for select
  using (user_id = auth.uid() or public.is_admin());
create policy "profile update own" on public.profiles for update
  using (user_id = auth.uid() or public.is_admin());
create policy "profile admin insert" on public.profiles for insert
  with check (public.is_admin());
create policy "profile admin delete" on public.profiles for delete
  using (public.is_admin());

create policy "devices owner or admin" on public.devices for all
  using (owner_id = public.current_profile_id() or public.is_admin())
  with check (owner_id = public.current_profile_id() or public.is_admin());

create policy "records read" on public.service_records for select using (
  public.is_admin()
  or exists (select 1 from public.devices d where d.id = device_id and d.owner_id = public.current_profile_id())
);
create policy "records admin write" on public.service_records for all
  using (public.is_admin()) with check (public.is_admin());

create policy "requests read" on public.service_requests for select
  using (customer_id = public.current_profile_id() or public.is_admin());
create policy "requests insert" on public.service_requests for insert
  with check (customer_id = public.current_profile_id() or public.is_admin());
create policy "requests admin update" on public.service_requests for update
  using (public.is_admin());
create policy "requests admin delete" on public.service_requests for delete
  using (public.is_admin());

-- 6. After you sign up on the site, make yourself admin (replace the email):
-- update public.profiles set role = 'admin' where email = 'you@example.com';
