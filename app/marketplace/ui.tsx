"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search, SlidersHorizontal, Store } from "lucide-react";

const categories = ["All", "SaaS", "AI Tools", "E-commerce", "Developer Tools", "Mobile Apps", "Websites"];

export default function Marketplace() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const hasSearch = useMemo(() => query.trim().length > 0, [query]);

  return (
    <main className="container py-12 sm:py-16">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-widest font-bold text-[#5b4bdb]">Discover digital businesses</p>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-3">The software marketplace</h1>
        <p className="muted leading-7 mt-4">Explore software businesses, SaaS products, AI tools and digital assets—or list a product you have built.</p>
      </div>

      <div className="panel p-3 sm:p-4 mt-8 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 muted" />
          <input
            aria-label="Search listings"
            className="field pl-10"
            placeholder="Search software, SaaS, AI tools..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <button type="button" className="btn btn-light" onClick={() => { setQuery(""); setCategory("All"); }}>
          <SlidersHorizontal size={16} /> Clear filters
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-5" aria-label="Listing categories">
        {categories.map((item) => (
          <button
            type="button"
            key={item}
            onClick={() => setCategory(item)}
            aria-pressed={category === item}
            className={`rounded-full px-4 py-2 text-sm font-semibold border transition-colors ${category === item ? "bg-[#5b4bdb] text-white border-[#5b4bdb]" : "bg-white border-[#e6e9f0] hover:border-[#5b4bdb]"}`}
          >
            {item}
          </button>
        ))}
      </div>

      <section className="panel mt-8 p-8 sm:p-12 text-center">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-[#f0efff] text-[#5b4bdb] grid place-items-center">
          <Store size={25} />
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold mt-5">
          {hasSearch || category !== "All" ? "No matching listings yet" : "The marketplace is getting ready"}
        </h2>
        <p className="muted max-w-xl mx-auto leading-7 mt-3">
          {hasSearch || category !== "All"
            ? "There are no published listings matching these filters right now. Try another search or browse all categories."
            : "Published seller listings will appear here. You can be among the first founders to add a software business."}
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <Link href="/sell" className="btn btn-primary">List your software <ArrowRight size={16} /></Link>
          <Link href="/dashboard" className="btn btn-light">Seller dashboard</Link>
        </div>
        <p className="text-xs muted mt-6">Listings are shown when they have been created and published through the seller workflow.</p>
      </section>
    </main>
  );
}
