# GadgetGeeks platform

Technology concierge platform for GadgetGeeks Technologies (BN 9889039): public website, Device Passport,
service requests, AI-assisted buying advisor and diagnostic assistant, Gadget Health Score, trusted partners.

Stack: Next.js (App Router) on Vercel · Supabase (Postgres, auth) · Gemini API (free tier, server-side only).

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in the keys
npm run dev
```

## Database

Run the files in `supabase/migrations/` in order (0001, then 0002) in the Supabase SQL editor.
In Supabase → Authentication → Sign In / Providers → Email, turn off **Confirm email** (the free email service only sends to team members).
Sign up on the site, then make yourself admin:

```sql
update public.profiles set role = 'admin' where email = 'you@example.com';
```

## Status

- [x] Sprint 0: public pages (home, services, how it works, about), schema for all features
- [x] Sprint 1: sign-in, Device Passport, service requests, admin (customers without accounts)
- [ ] Sprint 2: buying advisor, diagnostic assistant
- [ ] Sprint 3: Health Score, partners, reminders
- [ ] Sprint 4: showcase
