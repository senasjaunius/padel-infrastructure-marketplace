-- Allow the public supplier application form to create applications.
-- Keep SELECT blocked so supplier applications are not publicly readable.

create policy "public can submit supplier application"
  on supplier_profiles
  for insert
  to anon
  with check (true);
