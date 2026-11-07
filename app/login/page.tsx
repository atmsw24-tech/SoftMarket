"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [mode,setMode] = useState<"login"|"signup">("login");
  const [email,setEmail] = useState(""); const [password,setPassword] = useState(""); const [name,setName] = useState("");
  const [message,setMessage] = useState(""); const [busy,setBusy] = useState(false); const router = useRouter();
  async function submit(e:React.FormEvent) {
    e.preventDefault(); setBusy(true); setMessage("");
    try {
      const supabase = createClient();
      const result = mode==="signup"
        ? await supabase.auth.signUp({email,password,options:{data:{full_name:name}}})
        : await supabase.auth.signInWithPassword({email,password});
      if(result.error) throw result.error;
      if(mode==="signup" && !result.data.session) setMessage("Account created. Check your email to confirm your address, then sign in.");
      else router.push("/dashboard");
    } catch(e) { setMessage(e instanceof Error ? e.message : "Authentication failed."); }
    finally { setBusy(false); }
  }
  return <main className="container py-16 max-w-md"><div className="panel p-7"><h1 className="text-2xl font-black">{mode==="login"?"Welcome back":"Create your account"}</h1><p className="muted text-sm mt-2">Join SoftMarket as a buyer or seller.</p>
    <form onSubmit={submit} className="grid gap-4 mt-7">
      {mode==="signup"&&<div><label className="label">Your name</label><input className="field" required value={name} onChange={e=>setName(e.target.value)} /></div>}
      <div><label className="label">Email address</label><input className="field" type="email" required value={email} onChange={e=>setEmail(e.target.value)} /></div>
      <div><label className="label">Password</label><input className="field" type="password" minLength={8} required value={password} onChange={e=>setPassword(e.target.value)} /></div>
      <button className="btn btn-primary w-full" disabled={busy}>{busy?"Please wait...":mode==="login"?"Sign in":"Create account"}</button>
    </form>
    {message&&<p className="text-sm mt-4 text-[#5b4bdb]">{message}</p>}
    <p className="text-sm muted mt-5">{mode==="login"?"New to SoftMarket?":"Already have an account?"} <button className="font-bold text-[#5b4bdb]" onClick={()=>{setMode(mode==="login"?"signup":"login");setMessage("")}}>{mode==="login"?"Create an account":"Sign in"}</button></p>
  </div><p className="text-xs muted mt-4 text-center"><Link href="/">← Back to home</Link></p></main>;
}