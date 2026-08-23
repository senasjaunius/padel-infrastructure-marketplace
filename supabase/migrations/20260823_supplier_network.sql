create table if not exists supplier_profiles (
 id uuid primary key default gen_random_uuid(),
 company_name text not null,
 contact_name text,
 email text not null,
 country text not null,
 city text,
 website text,
 phone text,
 services text[] not null default '{}',
 service_area text,
 description text,
 status text not null default 'new',
 created_at timestamptz not null default now()
);
create index if not exists supplier_profiles_status_idx on supplier_profiles(status);
create index if not exists supplier_profiles_country_idx on supplier_profiles(country);
alter table supplier_profiles enable row level security;
