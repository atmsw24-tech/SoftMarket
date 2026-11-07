import Link from "next/link";
import { ArrowRight, BadgeCheck, ChartNoAxesCombined, ShieldCheck, Sparkles } from "lucide-react";

const features = [
  { icon: ChartNoAxesCombined, title: "Discover opportunities", text: "Explore SaaS, AI products, websites and developer tools." },
  { icon: ShieldCheck, title: "Make informed decisions", text: "Review listing information and communicate directly with sellers." },
  { icon: BadgeCheck, title: "Built for founders", text: "A focused marketplace for buying and selling digital businesses." }
];

export default function Home() {
  return <main>
    <section className="container py-20 sm:py-28">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#eeedff] text-[#5142c7] px-3 py-2 text-xs font-bold"><Sparkles size={14}/> THE DIGITAL BUSINESS MARKETPLACE</div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.08] mt-6">Find your next big thing in <span className="text-[#5b4bdb]">software.</span></h1>
        <p className="text-lg muted leading-8 mt-6 max-w-2xl">Discover SaaS businesses, AI tools, apps and digital products. Buy an existing product or list what you have built.</p>
        <div className="flex flex-wrap gap-3 mt-8">
          <Link href="/studio" className="btn btn-light">Open AI Studio</Link><Link href="/marketplace" className="btn btn-primary">Explore marketplace <ArrowRight size={17}/></Link>
          <Link href="/sell" className="btn btn-light">Sell your software</Link>
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-4 mt-20">
        {features.map(({icon:Icon,title,text}) => <div className="panel p-6" key={title}><div className="w-11 h-11 rounded-xl bg-[#f0efff] text-[#5b4bdb] grid place-items-center"><Icon/></div><h2 className="font-extrabold mt-5">{title}</h2><p className="text-sm muted leading-6 mt-2">{text}</p></div>)}
      </div>
    </section>
  </main>;
}