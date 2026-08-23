create table if not exists asset_requests (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid references sellers(id) on delete set null,
  company text not null,
  email text not null,
  country text not null,
  city text,
  court_count int not null default 1,
  year_installed int,
  manufacturer text,
  model text,
  glass_thickness_mm numeric,
  condition text,
  turf_condition text,
  lighting_included boolean default false,
  asking_price_eur numeric,
  photo_urls text,
  details text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);
create index if not exists asset_requests_status_idx on asset_requests(status);
create index if not exists asset_requests_created_idx on asset_requests(created_at desc);