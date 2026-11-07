import Link from "next/link";
import { ArrowLeft, ExternalLink, Sparkles } from "lucide-react";

const builderUrl = process.env.NEXT_PUBLIC_BUILDER_URL;

export default function BuilderPage() {
  return <main className="container py-20">
    <div className="max-w-2xl mx-auto panel p-8 sm:p-10">
      <div className="w-12 h-12 rounded-2xl bg-[#eeedff] text-[#5142c7] grid place-items-center"><Sparkles/></div>
      <p className="text-xs font-bold tracking-widest text-[#5142c7] mt-6">SOFTMARKET BUILDER</p>
      <h1 className="text-3xl sm:text-4xl font-black tracking-tight mt-3">Build software with AI</h1>
      {builderUrl ? <>
        <p className="muted leading-7 mt-4">Open the separate AI Builder workspace to create and preview applications.</p>
        <a className="btn btn-primary mt-7" href={builderUrl} target="_blank" rel="noreferrer">Launch AI Builder <ExternalLink size={16}/></a>
      </> : <>
        <p className="muted leading-7 mt-4">The Builder service is being prepared. This page will launch bolt.diy when its hosting URL is configured.</p>
        <span className="inline-flex mt-6 rounded-full bg-amber-50 text-amber-800 px-3 py-2 text-sm font-semibold">Builder deployment pending</span>
      </>}
      <div className="mt-8"><Link href="/" className="text-sm font-semibold inline-flex items-center gap-2"><ArrowLeft size={16}/> Back to SoftMarket</Link></div>
    </div>
  </main>;
}
