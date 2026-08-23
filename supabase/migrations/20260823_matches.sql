create table if not exists marketplace_matches (
 id uuid primary key default gen_random_uuid(),
 buyer_request_id uuid not null references buyer_requests(id) on delete cascade,
 seller_request_id uuid not null references asset_requests(id) on delete cascade,
 status text not null default 'new',
 notes text,
 created_at timestamptz not null default now()
);
create index if not exists marketplace_matches_buyer_idx on marketplace_matches(buyer_request_id);
create index if not exists marketplace_matches_seller_idx on marketplace_matches(seller_request_id);
create index if not exists marketplace_matches_status_idx on marketplace_matches(status);
alter table marketplace_matches enable row level security;
