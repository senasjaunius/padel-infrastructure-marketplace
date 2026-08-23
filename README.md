# Padel Infrastructure Marketplace

MVP for a secondary marketplace for padel courts and infrastructure.

## Current MVP
- Court IDs and standardized asset records
- Search, grade and indoor/outdoor filters
- Asset detail modal
- Seller valuation workflow
- Indicative valuation calculator
- Services layer: inspection, dismantling, transport, refurbishment, installation

## Production direction
Recommended stack: Next.js/TypeScript, Supabase PostgreSQL/Storage/Auth, Mapbox, Stripe, transactional email and Vercel.

The production database should separate FIP verification status from seller claims. Never present a court as FIP-approved/certified without verification against current official FIP documentation.

Before building a large platform, acquire 50–100 real European assets and complete 10+ transactions. Use those transactions to calibrate pricing, refurbishment and logistics models.