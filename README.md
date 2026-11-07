# SoftMarket

A Next.js + Supabase starter marketplace for buying and selling SaaS products, AI tools, apps and digital businesses.

## Included in this starter

- Responsive landing page and marketplace
- Search, category filter and sorting
- Email/password signup and login with Supabase Auth
- Seller dashboard
- Create and publish software listings
- Listing detail pages
- Buyer offer submission
- PostgreSQL schema with Row Level Security policies

## Important architecture note

GitHub is the source-code host, not the application database or backend service. This project uses Supabase for PostgreSQL, authentication and (later) file storage. Next.js runs the application and API/server logic.

## 1. Create your Supabase project

1. Create a project at https://supabase.com/
2. Open **Project Settings → API**.
3. Copy the Project URL and anon/publishable key.
4. In **SQL Editor**, run `database/schema.sql`.

## 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Never put the `service_role` key in a `NEXT_PUBLIC_` variable or commit secrets to GitHub.

## 3. Run locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000

## 4. Push to GitHub

Create an empty repository named `softmarket`, then:

```bash
git init
git add .
git commit -m "Initial SoftMarket marketplace"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/softmarket.git
git push -u origin main
```

Do not commit `.env.local`.

## 5. Deploy

Import the GitHub repository into Vercel, add the same environment variables in Vercel project settings, and deploy. Configure the Supabase Auth redirect URLs for your deployed domain.

## Current limitations before real-money launch

This is a starter implementation, not a fully audited marketplace. Before launch:
- Add server-side validation and rate limiting to sensitive actions.
- Add email verification, password reset and abuse reporting.
- Add admin moderation and seller identity/business verification.
- Add secure image uploads with storage policies.
- Add offer notifications and seller offer-management UI.
- Add a vetted payment provider, server-side payment intents and verified webhooks if payments are supported in your country.
- Design and audit escrow, refunds, disputes, chargebacks and marketplace terms with qualified professionals.
- Add tests, monitoring, backups and security review.

Financial metrics are seller-entered and are not verified by this starter.
