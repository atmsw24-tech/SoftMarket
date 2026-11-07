# SoftMarket Studio — advanced foundation

This package extends the original SoftMarket Next.js + Supabase marketplace starter with an AI-assisted development workspace.

## Included

- Existing marketplace, seller dashboard, listing detail, authentication and offer flow.
- Studio workspace with project selector, file explorer, editable source file, save endpoint.
- AI chat endpoint using the OpenAI Responses API; project file context is supplied server-side.
- Autonomous-agent *planning* endpoint that creates reviewable, persisted plans. It does not execute shell commands or modify files.
- GitHub OAuth connection flow with OAuth state validation and AES-256-GCM token encryption.
- Supabase migration for Studio projects, files, messages, agent runs and GitHub connections.
- Zod validation, server-side Supabase user checks, and an atomic 50-request daily AI quota per user.

## Stack

- Next.js App Router / React / TypeScript / Tailwind
- Supabase Auth + PostgreSQL + RLS
- OpenAI Responses API
- GitHub OAuth App

## Setup

1. Use Node.js 20.9+.
2. Copy `.env.example` to `.env.local`.
3. Configure Supabase URL and publishable/anon key.
4. Run the existing marketplace schema from `database/schema.sql` if this is a fresh project.
5. Run `supabase/migrations/202611070001_studio.sql` in the Supabase SQL editor. It also hardens profile-role and offer update permissions from the starter schema.
6. Set `OPENAI_API_KEY` and optionally `OPENAI_MODEL`.
7. For GitHub linking, create a GitHub OAuth App and set `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, and `GITHUB_CALLBACK_URL`.
8. Generate a 32-byte encryption key, for example `openssl rand -hex 32`, and set `GITHUB_TOKEN_ENCRYPTION_KEY`.
9. Install and run:

```bash
npm install
npm run typecheck
npm run dev
```

Open `/studio`.

## Important production gates

This is an advanced application foundation, not a claim that a production SaaS is already deployed or fully audited.

- **Agent execution:** The agent currently plans and persists a human-reviewable implementation plan. It intentionally does not run generated code. To approach Replit-level execution, integrate an isolated, ephemeral workspace provider (container/microVM) with per-project filesystem isolation, CPU/memory/time quotas, outbound network policy, secret isolation, audit logs, and teardown. Never execute user code inside the Next.js web process.
- **Apply/approve flow:** Build a diff review and explicit approval step before applying AI-proposed changes. The current agent plan is not auto-applied.
- **GitHub:** OAuth connection is scaffolded. Repository picker, import, branch/commit/push, webhook signature verification, and token revocation UI remain to be completed. Store only encrypted tokens and keep encryption keys in server secret storage.
- **Payments:** Do not enable real-money transactions until a supported provider, verified webhooks, seller onboarding, refunds, chargebacks, dispute handling, and legal terms are implemented.
- **Marketplace security:** Review the original marketplace SQL before launch. In particular, do not allow users to self-assign privileged roles or buyers to update offer ownership, listing, or amount fields. Restrict grants and updateable columns.
- **Operations:** Add rate limits, CAPTCHA/abuse controls, email verification, password reset, moderation, backups, error monitoring, audit logs, dependency scanning, CSP/security headers, and automated integration tests.
- **AI controls:** Apply per-user quotas and cost limits; validate all model output; treat repository files as untrusted prompt input; do not give the model arbitrary secrets or unrestricted network/shell access.

## GitHub and deployment

Push the project to your own private GitHub repository. Connect that repository to Vercel and configure the same environment variables in Vercel. Add the production callback URL to your GitHub OAuth App and Supabase Auth redirect allowlist.

## API endpoints

- `GET/POST /api/projects`
- `GET/PUT /api/projects/:projectId/files`
- `POST /api/ai/chat`
- `POST /api/ai/agent`
- `GET /api/github/connect`
- `GET /api/github/callback`

## Architecture references

- OpenAI Responses API and function calling: https://developers.openai.com/api/docs/guides/function-calling
- Supabase Row Level Security: https://supabase.com/docs/guides/database/postgres/row-level-security

## Backend API and marketplace workflows

The backend now includes validated listing creation/edit/publish APIs, offer submission and controlled seller decisions, buyer withdrawal, listing conversations, dashboard aggregates, daily AI quotas, notifications, watchlists, audit records, and protected listing-image storage. Follow `docs/BACKEND-SETUP.md` and apply migration `202611070002_marketplace_backend.sql` after the earlier migrations.

## Marketplace backend extension

See `docs/BACKEND-SETUP.md`. Apply migration `202611070002_marketplace_backend.sql` after the Studio migration. It adds controlled listing publishing, offer decisions, messaging, notifications, watchlists, audit events, image storage policies. The 50-request daily AI quota is defined in the Studio migration.
