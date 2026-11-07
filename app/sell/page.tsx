"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SellPage() {
  const router=useRouter(); const [busy,setBusy]=useState(false); const [message,setMessage]=useState("");
  async function submit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setMessage("");
    try {
      const form=new FormData(e.currentTarget);
      const payload={title:String(form.get("title")),category:String(form.get("category")),description:String(form.get("description")),asking_price:Number(form.get("asking_price")),monthly_revenue:Number(form.get("monthly_revenue")||0),monthly_profit:Number(form.get("monthly_profit")||0),business_model:String(form.get("business_model"))};
      const created=await fetch("/api/listings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
      const createdData=await created.json();
      if(!created.ok) throw new Error(createdData.error?.message||createdData.error||"Could not save listing draft.");
      const published=await fetch(`/api/listings/${createdData.listing.id}/publish`,{method:"POST"});
      const publishedData=await published.json();
      if(!published.ok) throw new Error(publishedData.error||"Draft saved, but it could not be published yet. Open your dashboard to review it.");
      router.push("/dashboard");
    } catch(e) { setMessage(e instanceof Error?e.message:"Could not publish listing."); }
    finally { setBusy(false); }
  }
  return <main className="container py-12 max-w-2xl"><h1 className="text-3xl font-black">Sell your software</h1><p className="muted text-sm mt-2 mb-7">Create a clear, honest listing for potential buyers. New listings are saved as drafts and published after validation.</p>
    <form onSubmit={submit} className="panel p-6 grid gap-4">
      <div><label className="label">Business or product name *</label><input className="field" name="title" required maxLength={100} placeholder="Example: Analytics Pro"/></div>
      <div><label className="label">Category *</label><select className="field" name="category" required>{["SaaS","AI Tools","E-commerce","Developer Tools","Mobile Apps","Websites"].map(x=><option key={x}>{x}</option>)}</select></div>
      <div><label className="label">Description *</label><textarea className="field min-h-32" name="description" required minLength={100} maxLength={5000} placeholder="Explain what it does, who uses it, and what is included."/></div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className="label">Asking price (USD) *</label><input className="field" name="asking_price" type="number" min="1" step="1" required/></div>
        <div><label className="label">Business model</label><select className="field" name="business_model"><option>Subscription</option><option>One-time purchase</option><option>Advertising</option><option>Marketplace</option><option>Other</option></select></div>
        <div><label className="label">Monthly revenue (USD)</label><input className="field" name="monthly_revenue" type="number" min="0" defaultValue="0"/></div>
        <div><label className="label">Monthly profit (USD)</label><input className="field" name="monthly_profit" type="number" min="0" defaultValue="0"/></div>
      </div>
      {message&&<p className="text-sm text-red-600">{message}</p>}
      <button className="btn btn-primary" disabled={busy}>{busy?"Publishing...":"Publish listing"}</button>
      <p className="text-xs muted">Only publish figures you can substantiate. Listing review and verification workflows are not yet enabled.</p>
    </form>
  </main>;
}