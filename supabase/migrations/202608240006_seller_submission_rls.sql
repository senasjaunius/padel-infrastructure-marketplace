-- Secure seller submission tables while keeping the public marketplace read-only.

alter table if exists public.asset_requests enable row level security;

-- Seller profile is created by the seller submission API, but never publicly readable except through the explicit marketplace policy.
drop policy if exists "public can submit seller" on public.sellers;
create policy "public can submit seller"
  on public.sellers
  for insert to anon
  with check (
    length(trim(company_name)) > 0
    and length(trim(email)) > 3
    and length(trim(country)) > 0
  );
grant insert on public.sellers to anon;

-- Asset submissions are write-only from the public browser/API. Admin uses the service role.
drop policy if exists "public can submit asset request" on public.asset_requests;
create policy "public can submit asset request"
  on public.asset_requests
  for insert to anon
  with check (
    length(trim(company)) > 0
    and length(trim(email)) > 3
    and length(trim(country)) > 0
    and court_count >= 1
    and status = 'new'
  );
grant insert on public.asset_requests to anon;
