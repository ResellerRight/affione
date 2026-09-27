'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from '@/components/Logo'
import { getBrowserSupabase } from '@/lib/supabase'
export default function Login(){
  const router=useRouter(); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [msg,setMsg]=useState(''); const [loading,setLoading]=useState(false)
  async function submit(e:React.FormEvent){e.preventDefault();setLoading(true);setMsg('');try{const {error}=await getBrowserSupabase().auth.signInWithPassword({email,password});if(error)throw error;router.replace('/dashboard')}catch(e:any){setMsg(e.message||'Login gagal')}finally{setLoading(false)}}
  return <main className="authPage"><div className="authCard"><Logo/><div><h1>Login Owner</h1><p>Kelola toko affiliate pribadi AffiOne.</p></div><form onSubmit={submit}><label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></label>{msg&&<div className="alert error">{msg}</div>}<button className="btn primary full" disabled={loading}>{loading?'Memproses...':'Masuk Dashboard'}</button></form><p className="authFoot"><Link href="/">← Kembali ke toko</Link></p></div></main>
}
