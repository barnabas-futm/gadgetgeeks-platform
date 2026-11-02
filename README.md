# GadgetGeeks platform

Website for GadgetGeeks Technologies (BN 9889039), a laptop software, upgrade and tune-up service in Gidan Kwano, Minna.
Its job right now is to show the price list and take WhatsApp bookings. Prices live in `src/lib/site.ts` (`prices`).

Since 2 Nov 2026 the platform build (sign-in, Device Passport, AI tools) is paused while the service business is tested.
The Supabase schema in `supabase/migrations` is kept for later but the site doesn't use it.

Stack: Next.js (App Router) on Vercel.

## Run locally

```bash
npm install
npm run dev
```

## Status

- [x] Public pages: home, services and prices, how it works, about
- [x] WhatsApp booking, prices in one place
- Paused: sign-in, Device Passport, service requests, AI tools (see `supabase/migrations` for the saved schema)
