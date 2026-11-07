# SoftMarket Builder

The Builder is maintained as a separate upstream application at `builder/bolt.diy`.
It is intentionally isolated from the SoftMarket Next.js marketplace application.

## Get the source

Clone the repository including submodules:

```bash
git clone --recurse-submodules https://github.com/atmsw24-tech/SoftMarket.git
cd SoftMarket/builder/bolt.diy
```

If you already cloned SoftMarket:

```bash
git submodule update --init --recursive
```

## Run bolt.diy locally

The upstream project currently documents Node.js >= 22.12.0 and pnpm >= 9.15.9:

```bash
pnpm install
pnpm run dev
```

Then open http://localhost:5173. Configure model-provider credentials in the Builder's own environment/settings. Do not commit API keys.

## Integration boundary

- SoftMarket remains the marketplace and account-facing application.
- bolt.diy remains a separately built and deployed service (planned host: `builder.softmarket.com`).
- A shared sign-in experience, Supabase project access, GitHub project handoff, and production routing still require implementation and verification.
- This submodule pins a specific upstream commit. Update it deliberately after reviewing upstream changes.

## Licensing and production

The bolt.diy repository source is MIT-licensed. Review its current third-party dependencies and any separately licensed browser runtime (including WebContainers, if used) before offering hosted commercial access. Source-code licensing alone does not grant a separate commercial WebContainers API licence.
