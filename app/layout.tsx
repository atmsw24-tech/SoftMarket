import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Store } from "lucide-react";

export const metadata: Metadata = {
  title: "SoftMarket — Buy and sell software",
  description: "Discover SaaS businesses, AI tools, apps and digital products."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>
    <header className="bg-white border-b border-[#e6e9f0]">
      <div className="container h-[72px] flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-xl tracking-tight">
          <span className="w-9 h-9 rounded-xl bg-[#5b4bdb] text-white grid place-items-center"><Store size={19}/></span>
          SoftMarket
        </Link>
        <nav className="flex items-center gap-5 text-sm font-semibold">
          <Link href="/marketplace" className="hidden sm:block">Marketplace</Link>
          <Link href="/sell" className="hidden sm:block">Sell software</Link>
          <Link href="/dashboard" className="hidden sm:block">Dashboard</Link>
          <Link href="/login" className="btn btn-primary">Sign in</Link>
        </nav>
      </div>
    </header>
    {children}
    <footer className="mt-20 border-t border-[#e6e9f0] bg-white">
      <div className="container py-8 flex flex-wrap justify-between gap-3 text-sm muted">
        <span>© {new Date().getFullYear()} SoftMarket</span>
        <span>Buy, sell and grow digital businesses.</span>
      </div>
    </footer>
  </body></html>;
}