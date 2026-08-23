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
 transport_installation boolean default false,
 details text,
 status text not null default 'new',
 created_at timestamptz not null default now()
);
create index if not exists buyer_requests_status_idx on buyer_requests(status);
create index if not exists buyer_requests_created_idx on buyer_requests(created_at desc);

create table if not exists service_requests (
 id uuid primary key default gen_random_uuid(),
 name text,
 email text not null,
 country text not null,
 city text,
 service text not null,
 court_count int,
 details text,
 status text not null default 'new',
 created_at timestamptz not null default now()
);
create index if not exists service_requests_status_idx on service_requests(status);
create index if not exists service_requests_created_idx on service_requests(created_at desc);

alter table buyer_requests enable row level security;
alter table service_requests enable row level security;
-- Public visitors submit only through serverless API routes; no direct public table policies are created.
