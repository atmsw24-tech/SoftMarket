# SoftMarket + bolt.diy integration

## Architecture

SoftMarket remains the marketplace and account home. bolt.diy remains the AI coding workspace and runtime. The two applications are deployed separately so the browser-based WebContainer runtime is not forced into the Next.js marketplace server.

The /builder and /studio routes are the SoftMarket entry points. They can launch the hosted bolt.diy service in a new tab. An optional iframe mode is also provided, but it is experimental and must be tested against the exact hosting setup before enabling it.

## 1. Deploy bolt.diy

1. Fork https://github.com/stackblitz-labs/bolt.diy into an account you control.
2. Follow the upstream installation/deployment instructions.
3. Configure an AI provider in bolt.diy under Settings → Providers. OpenAI is supported; its API key belongs in the bolt.diy deployment, not in browser code.
4. Test prompt generation, terminal startup, project files and live preview directly on the deployed builder.

Upstream documents a browser coding workspace, terminal, live preview, GitHub import/export and multiple AI providers. See the official documentation: https://stackblitz-labs.github.io/bolt.diy/

## 2. Connect the SoftMarket entry point

In your SoftMarket hosting environment, configure:

    BOLT_DIY_URL=https://your-real-builder-domain.example

Do not use the example URL literally. Keep this variable server-side (no NEXT_PUBLIC_ prefix). Redeploy SoftMarket after setting it.

With only BOLT_DIY_URL set, /builder and /studio show a Launch AI Builder link that opens bolt.diy in a new tab. This is the reliable fallback.

## 3. Optional embedded mode

After the builder is deployed, test whether its host permits framing and whether the full WebContainer experience works inside an iframe. Only then set:

    BOLT_DIY_EMBED=true

The Builder page will render the bolt.diy workspace in an iframe and retain an Open in new tab fallback.

Important: embedding is not guaranteed. WebContainers require cross-origin isolation (COOP/COEP headers), and iframe/browser policy can block the workspace or its worker/runtime. A blank frame or WebContainer security error means the deployment needs additional configuration or must use the separate-tab mode. Do not weaken security headers just to make framing work. Review the WebContainer documentation: https://webcontainers.io/guides/introduction

## 4. OpenAI keys

Configure the OpenAI API key in bolt.diy itself (Settings → Providers or its supported deployment environment). SoftMarket's OPENAI_API_KEY is not automatically shared with a separately deployed bolt.diy instance. Never commit API keys to GitHub or expose them through NEXT_PUBLIC_ variables.

## 5. Still required for a seamless multi-user SaaS

This work provides an entry point and optional embed surface, not SSO or shared project persistence. Before offering it as one seamless product, implement and security-test:
- shared sign-in / SSO between SoftMarket and the builder;
- per-user project ownership and persistent storage;
- secure GitHub import/export with scoped OAuth permissions;
- quotas, abuse prevention and AI cost controls;
- isolated execution and resource limits;
- a verified commercial WebContainers license.

## Licensing gate

bolt.diy source code is MIT-licensed, but its WebContainers API has separate terms. StackBlitz states that a commercial license is required for production use in a commercial, for-profit setting serving customers, prospective customers or employees. Prototypes and proofs of concept are exempt. Verify current terms with StackBlitz before launching to paying users.
