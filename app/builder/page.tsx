import Link from "next/link";
import { ArrowUpRight, Bot, Code2, ExternalLink, ShieldCheck, Sparkles } from "lucide-react";
import BuilderFrame from "./BuilderFrame";

export const metadata = {
  title: "AI App Builder | SoftMarket",
  description: "Build full-stack applications with the SoftMarket AI Builder."
};

function getBuilderUrl() {
  const raw = process.env.BOLT_DIY_URL;
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return url.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

export default function BuilderPage() {
  const builderUrl = getBuilderUrl();
  const embedEnabled = process.env.BOLT_DIY_EMBED === "true";

  return (
    <main className="container py-10 sm:py-14">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#eeedff] text-[#5142c7] px-3 py-2 text-xs font-bold">
          <Sparkles size={14}/> SOFTMARKET AI STUDIO
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mt-6">Turn your idea into an app.</h1>
        <p className="text-lg muted leading-8 mt-5">
          Build with bolt.diy's AI coding workspace while keeping SoftMarket as your marketplace home.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mt-8">
        <div className="panel p-5"><Bot className="text-[#5b4bdb]" size={24}/><h2 className="font-extrabold mt-4">Prompt to code</h2><p className="text-sm muted mt-2 leading-6">Use a supported AI provider to generate application files from natural-language prompts.</p></div>
        <div className="panel p-5"><Code2 className="text-[#5b4bdb]" size={24}/><h2 className="font-extrabold mt-4">Edit and preview</h2><p className="text-sm muted mt-2 leading-6">Use bolt.diy's editor, terminal and live preview.</p></div>
        <div className="panel p-5"><ShieldCheck className="text-[#5b4bdb]" size={24}/><h2 className="font-extrabold mt-4">SoftMarket home</h2><p className="text-sm muted mt-2 leading-6">Keep marketplace navigation and accounts in SoftMarket while the builder runs as its own service.</p></div>
      </div>

      {!builderUrl ? (
        <section className="panel p-6 sm:p-8 mt-8">
          <p className="text-xs uppercase tracking-widest font-bold text-amber-700">Connection setup required</p>
          <h2 className="text-2xl font-black mt-2">Connect your bolt.diy deployment</h2>
          <p className="muted text-sm mt-2 leading-6">
            Deploy bolt.diy, configure an AI provider in its own Settings → Providers screen,
            then set the server-side BOLT_DIY_URL value in your hosting settings and redeploy SoftMarket.
          </p>
          <a href="https://github.com/stackblitz-labs/bolt.diy" target="_blank" rel="noopener noreferrer" className="btn btn-light mt-5">
            View official bolt.diy source <ExternalLink size={15}/>
          </a>
        </section>
      ) : embedEnabled ? (
        <BuilderFrame src={builderUrl} />
      ) : (
        <section className="panel p-6 sm:p-8 mt-8">
          <p className="text-xs uppercase tracking-widest font-bold text-green-700">Builder URL configured</p>
          <h2 className="text-2xl font-black mt-2">Your AI workspace is connected</h2>
          <p className="muted text-sm mt-2 leading-6">
            Open bolt.diy to use its full editor and live preview. To try the embedded workspace
            inside this page, set BOLT_DIY_EMBED=true after confirming that your deployment permits
            iframe embedding and supports WebContainer security requirements.
          </p>
          <a href={builderUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-5">
            Launch AI Builder <ArrowUpRight size={17}/>
          </a>
        </section>
      )}

      <p className="text-xs muted mt-5 leading-5">
        Production note: bolt.diy uses the WebContainers API. Commercial, for-profit production use
        requires a separate commercial license from StackBlitz. Review licensing before serving customers.
      </p>
    </main>
  );
}
