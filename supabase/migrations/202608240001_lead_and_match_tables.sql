-- Lead + matching tables
-- Run this migration before marketplace_matches because it creates its dependencies.

create extension if not exists pgcrypto;

create table if not exists buyer_requests (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null,
  country text not null,
  city text,
  court_count int not null default 1,
  location_notes text,
  indoor_outdoor text,
  condition text,
  budget_eur numeric,
  preferred_manufacturer text,
  needed_by date,
  transport_installation boolean not null default false,
  details text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create index if not exists buyer_requests_status_idx on buyer_requests(status);
create index if not exists buyer_requests_created_idx on buyer_requests(created_at desc);

create table if not exists service_requests (
  id uuid primary key default gen_random_uuid(),
  service text not null,
  name text,
  email text not null,
  country text not null,
  city text,
  court_count int not null default 1,
  details text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create index if not exists service_requests_status_idx on service_requests(status);
create index if not exists service_requests_created_idx on service_requests(created_at desc);

create table if not exists marketplace_matches (
  id uuid primary key default gen_random_uuid(),
  buyer_request_id uuid not null references buyer_requests(id) on delete cascade,
  seller_request_id uuid not null references asset_requests(id) on delete cascade,
  status text not null default 'new',
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists marketplace_matches_buyer_idx
  on marketplace_matches(buyer_request_id);
create index if not exists marketplace_matches_seller_idx
  on marketplace_matches(seller_request_id);
create index if not exists marketplace_matches_status_idx
  on marketplace_matches(status);
