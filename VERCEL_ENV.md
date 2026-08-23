# PADEL TRADE — Vercel environment variables

Required for the protected admin dashboard:

- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — public Supabase key used by public form APIs
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase service-role key, server-side only; NEVER expose in browser code
- `ADMIN_DASHBOARD_KEY` — private key used to open `/admin.html`

Optional email notifications:

- `RESEND_API_KEY`
- `ADMIN_NOTIFICATION_EMAIL`
- `RESEND_FROM_EMAIL`

After changing environment variables in Vercel, redeploy the production deployment. Never commit any of these values to GitHub.