"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Listing } from "@/lib/types";

export default function Dashboard() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push("/login");
          return;
        }
        setEmail(user.email || "");
        const { data, error } = await supabase
          .from("listings")
          .select("*")
          .eq("seller_id", user.id)
          .order("created_at", { ascending: false });
        if (error) throw error;
        setListings((data || []) as Listing[]);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not load dashboard.");
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <main className="container py-12">
      <div className="flex flex-wrap justify-between gap-3 items-end">
        <div>
          <p className="text-xs uppercase tracking-widest font-bold text-[#5b4bdb]">Seller centre</p>
          <h1 className="text-3xl font-black mt-2">Dashboard</h1>
          <p className="muted text-sm mt-2">{email}</p>
        </div>
        <div className="flex gap-2">
          <Link className="btn btn-primary" href="/sell">+ New listing</Link>
          <button className="btn btn-light" onClick={signOut}>Sign out</button>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mt-8">
        <div className="panel p-5"><p className="text-sm muted">Your listings</p><p className="text-3xl font-black mt-2">{listings.length}</p></div>
        <div className="panel p-5"><p className="text-sm muted">Active listings</p><p className="text-3xl font-black mt-2">{listings.filter((x) => x.status === "active").length}</p></div>
        <div className="panel p-5"><p className="text-sm muted">Offers received</p><p className="text-3xl font-black mt-2">—</p></div>
      </div>

      <h2 className="font-extrabold text-xl mt-10 mb-4">Your software listings</h2>
      {loading ? (
        <p className="muted">Loading...</p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : listings.length === 0 ? (
        <div className="panel p-8 text-center">
          <p className="font-bold">You have not listed anything yet.</p>
          <Link href="/sell" className="btn btn-primary mt-4">Create your first listing</Link>
        </div>
      ) : (
        <div className="panel divide-y divide-[#e6e9f0]">
          {listings.map((listing) => (
            <div key={listing.id} className="p-4 flex justify-between gap-3">
              <div>
                <b>{listing.title}</b>
                <p className="text-xs muted mt-1">{listing.category} · {listing.status}</p>
              </div>
              <b>${listing.asking_price.toLocaleString()}</b>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
