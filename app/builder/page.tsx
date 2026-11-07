import Link from "next/link";
import { ArrowUpRight, Bot, Code2, ExternalLink, ShieldCheck, Sparkles } from "lucide-react";

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
  return <main className="container py-14 sm:py-20">
    <div className="max-w-3xl">
      <div className="inline-flex items-center gap-2 rounded-full bg-[#eeedff] text-[#5142c7] px-3 py-2 text-xs font-bold"><Sparkles size={14}/> SOFTMARKET AI STUDIO</div>
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight mt-6">Turn your idea into an app.</h1>
      <p className="text-lg muted leading-8 mt-5">Describe what you want to build. The AI Builder can generate application code, run it in a browser workspace, and let you refine the result.</p>
    </div>
    <div className="grid sm:grid-cols-3 gap-4 mt-10">
      <div className="panel p-5"><Bot className="text-[#5b4bdb]" size={24}/><h2 className="font-extrabold mt-4">Prompt to code</h2><p className="text-sm muted mt-2 leading-6">Describe an app in plain language and let the coding agent create its files.</p></div>
      <div className="panel p-5"><Code2 className="text-[#5b4bdb]" size={24}/><h2 className="font-extrabold mt-4">Edit and preview</h2><p className="text-sm muted mt-2 leading-6">Work with generated code, a terminal and a live preview in the builder.</p></div>
      <div className="panel p-5"><ShieldCheck className="text-[#5b4bdb]" size={24}/><h2 className="font-extrabold mt-4">Your own workspace</h2><p className="text-sm muted mt-2 leading-6">The builder runs as a separate service from the SoftMarket marketplace.</p></div>
    </div>
    <section className="panel p-6 sm:p-8 mt-8">
      {builderUrl ? <>
        <p className="text-xs uppercase tracking-widest font-bold text-green-700">Builder connection configured</p>
        <h2 className="text-2xl font-black mt-2">Your AI workspace is ready to open</h2>
        <p className="muted text-sm mt-2">You will open the separately hosted bolt.diy workspace in a new tab.</p>
        <a href={builderUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-5">Launch AI Builder <ArrowUpRight size={17}/></a>
      </> : <>
        <p className="text-xs uppercase tracking-widest font-bold text-amber-700">Connection setup required</p>
        <h2 className="text-2xl font-black mt-2">Connect your bolt.diy deployment</h2>
        <p className="muted text-sm mt-2 leading-6">The SoftMarket launch point is in place, but the bolt.diy service has not been deployed or connected yet. Once it is hosted, add its address as the server environment variable <code>BOLT_DIY_URL</code> in Vercel and redeploy.</p>
        <a href="https://github.com/stackblitz-labs/bolt.diy" target="_blank" rel="noopener noreferrer" className="btn btn-light mt-5">View official bolt.diy source <ExternalLink size={15}/></a>
      </>}
    </section>
    <p className="text-xs muted mt-5 leading-5">Production note: bolt.diy uses the WebContainers API. Commercial, for-profit production use requires a separate commercial license from StackBlitz. Review the licensing terms before opening this builder to customers.</p>
  </main>;
}