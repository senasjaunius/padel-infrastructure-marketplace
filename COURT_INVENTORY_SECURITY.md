# PADEL TRADE — Protected Court Inventory

## Public listing rules
- Buyers can browse courts without paying.
- Public listings must not expose seller identity, direct contact details, exact address, GPS coordinates, private documents, or original image URLs.
- Public photos must be processed copies only.

## Photo pipeline
1. Seller/admin uploads original photo to a private Supabase Storage bucket.
2. Server-side processing creates a public derivative.
3. Strip EXIF metadata.
4. Resize/compress for web delivery.
5. Add PADEL TRADE watermark.
6. Store only the derivative URL in public listing data.
7. Keep original file private for seller/admin access.

## Listing CTA
Every public court listing should have `Request this court` rather than exposing seller contact information.
The request creates a qualified buyer lead that can be matched and monetized.

## Monetization
- Normal browsing: free.
- Qualified lead unlock: seller-paid.
- Featured listing: seller-paid.
- Optional inspection, dismantling, transport, installation and refurbishment services.

## Inventory fields
Recommended public fields: country/region, court count, manufacturer, model, installation year, condition, glass/turf condition, lighting, asking price or range, availability, technical description, processed photos.

Recommended private fields: seller identity/contact, exact location, original photos, documents, internal notes.
