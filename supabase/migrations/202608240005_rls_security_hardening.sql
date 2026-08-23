-- Security hardening: enable RLS on every public table and tighten supplier insert policy.
-- Public marketplace data remains readable; lead/application tables remain write-only from the browser.

alter table if exists public.sellers enable row level security;
alter table if exists public.assets enable row level security;
alter table if exists public.inquiries enable row level security;
alter table if exists public.inspections enable row level security;
alter table if exists public.service_quotes enable row level security;
alter table if exists public.service_requests enable row level security;
alter table if exists public.buyer_requests enable row level security;
alter table if exists public.marketplace_matches enable row level security;
alter table if exists public.supplier_profiles enable row level security;

drop policy if exists "public can read sellers" on public.sellers;
create policy "public can read sellers"
  on public.sellers for select to anon, authenticated using (true);

drop policy if exists "public can read assets" on public.assets;
create policy "public can read assets"
  on public.assets for select to anon, authenticated using (true);

drop policy if exists "public can submit supplier application" on public.supplier_profiles;
create policy "public can submit supplier application"
  on public.supplier_profiles
  for insert to anon
  with check (
    length(trim(company_name)) > 0
    and length(trim(email)) > 3
    and length(trim(country)) > 0
    and status = 'new'
  );
grant insert on public.supplier_profiles to anon;

grant insert on public.inquiries to anon;
grant insert on public.service_requests to anon;
grant insert on public.buyer_requests to anon;
