-- Security hardening: enable RLS on every public table and tighten supplier insert policy.
-- Public forms should be able to INSERT only; public reads remain blocked.

alter table if exists public.sellers enable row level security;
alter table if exists public.assets enable row level security;
alter table if exists public.inquiries enable row level security;
alter table if exists public.inspections enable row level security;
alter table if exists public.service_quotes enable row level security;
alter table if exists public.service_requests enable row level security;
alter table if exists public.buyer_requests enable row level security;
alter table if exists public.marketplace_matches enable row level security;
alter table if exists public.supplier_profiles enable row level security;

-- Supplier applications: anonymous users may submit, but cannot read/update/delete rows.
drop policy if exists "public can submit supplier application" on public.supplier_profiles;
create policy "public can submit supplier application"
  on public.supplier_profiles
  for insert
  to anon
  with check (
    length(trim(company_name)) > 0
    and length(trim(email)) > 3
    and length(trim(country)) > 0
    and status = 'new'
  );

grant insert on public.supplier_profiles to anon;

-- Explicitly revoke public table access where the app has no public-write requirement.
revoke all on public.sellers from anon, authenticated;
revoke all on public.assets from anon, authenticated;
revoke all on public.inquiries from anon, authenticated;
revoke all on public.inspections from anon, authenticated;
revoke all on public.service_quotes from anon, authenticated;
revoke all on public.service_requests from anon, authenticated;
revoke all on public.buyer_requests from anon, authenticated;
revoke all on public.marketplace_matches from anon, authenticated;
