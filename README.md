# Padel Trade

MVP for a secondary marketplace for padel courts and infrastructure.

## Current MVP
- Court IDs and standardized asset records
- Search, grade and indoor/outdoor filters
- Asset detail modal and inquiry flow
- Seller valuation / court submission workflow
- Buyer demand request workflow
- Supplier network applications
- Service request workflow
- Admin dashboard with protected lead review, statuses and buyer/seller matching
- Optional transactional admin email notifications
- Indicative valuation calculator
- Mobile-first responsive layout
- Supabase RLS security hardening

## Vercel environment variables
Required for the public API:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Required for the protected admin dashboard:
- `ADMIN_DASHBOARD_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Optional for email notifications:
- `RESEND_API_KEY`
- `ADMIN_NOTIFICATION_EMAIL`
- `RESEND_FROM_EMAIL`

Never expose `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_DASHBOARD_KEY` or `RESEND_API_KEY` in browser code.

## Supabase
Run migrations in `supabase/migrations/` in filename order. The latest RLS hardening migration keeps published marketplace data readable while keeping lead/application data protected from public reads.

## Production direction
Recommended stack: Next.js/TypeScript, Supabase PostgreSQL/Storage/Auth, Mapbox, Stripe, transactional email and Vercel.

The production database should separate FIP verification status from seller claims. Never present a court as FIP-approved/certified without verification against current official FIP documentation.

Before building a large platform, acquire 50–100 real European assets and complete 10+ transactions. Use those transactions to calibrate pricing, refurbishment and logistics models.
