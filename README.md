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

Run `supabase/migrations/0001_init.sql` in the Supabase SQL editor. Then make yourself admin:

```sql
update public.profiles set role = 'admin' where id = '<your auth user id>';
```

## Status

- [x] Sprint 0: public pages (home, services, how it works, about), schema for all features
- [ ] Sprint 1: sign-in, Device Passport, service requests, admin
- [ ] Sprint 2: buying advisor, diagnostic assistant
- [ ] Sprint 3: Health Score, partners, reminders
- [ ] Sprint 4: showcase
