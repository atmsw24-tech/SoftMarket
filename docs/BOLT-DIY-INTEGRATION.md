# SoftMarket + bolt.diy integration

## Current integration boundary

SoftMarket and bolt.diy run as separate applications. SoftMarket owns marketplace accounts and listings. bolt.diy owns the AI coding workspace, browser-based runtime, code editor and live preview. This avoids trying to run WebContainers inside the Next.js marketplace server.

The SoftMarket /studio and /builder routes are launch pages. They open the configured bolt.diy deployment; they do not themselves generate code.

## 1. Deploy bolt.diy separately

1. Review the upstream project: https://github.com/stackblitz-labs/bolt.diy
2. Fork it to an account or organization you control.
3. Follow the upstream README and deployment documentation for the current prerequisites and hosting method.
4. Configure the OpenAI provider in bolt.diy's Settings → Providers, or configure its server environment using the upstream .env.example.
5. Test prompt-to-code generation, terminal startup and live preview directly in the bolt.diy deployment.

Upstream currently documents Node.js >= 22.12.0 and pnpm >= 9.15.9 for local installation. Its README describes OpenAI as a supported provider and includes a browser workspace with code editor, terminal and live preview.

## 2. Connect SoftMarket to the deployed builder

In the SoftMarket Vercel project, add this server-side environment variable:

    BOLT_DIY_URL=https://your-builder-host.example

Use the actual HTTPS URL of your bolt.diy deployment. Do not add a NEXT_PUBLIC_ prefix. Redeploy SoftMarket after saving the variable.

The /studio and /builder pages will then show a Launch AI Builder link that opens the configured service in a new tab.

## 3. OpenAI keys

Configure the OpenAI API key in the bolt.diy service itself, using its provider settings or its supported server-side environment configuration. The SoftMarket OPENAI_API_KEY is not automatically shared with the separate bolt.diy service. Never commit API keys to GitHub or put them in browser-visible NEXT_PUBLIC_ variables.

## 4. Still required for a full integrated SaaS experience

This connection is currently a launch-link integration, not single sign-on or shared project storage. Before treating it as one seamless product, implement and security-test:
- shared sign-in / SSO between SoftMarket and the builder;
- per-user project ownership and persistent storage;
- secure GitHub import/export with scoped OAuth permissions;
- quotas, abuse prevention and AI cost controls;
- isolated execution and resource limits;
- a verified production WebContainers commercial license.

## Licensing gate

bolt.diy is MIT-licensed, but it uses the WebContainers API. StackBlitz states that a commercial license is required for production use in a commercial, for-profit setting serving customers, prospective customers or employees. Prototypes and proofs of concept are exempt. Review https://webcontainers.io/enterprise before launching this to paying users.
