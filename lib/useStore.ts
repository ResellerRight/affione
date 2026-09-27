'use client'
import { useCallback, useEffect, useState } from 'react'
import { getBrowserSupabase } from './supabase'
import type { Store } from './types'
export function useStore(){
  const [store,setStore]=useState<Store|null>(null)
  const [loading,setLoading]=useState(true)
  const load=useCallback(async()=>{
    setLoading(true)
    const supabase=getBrowserSupabase()
    const {data:{user}}=await supabase.auth.getUser()
    if(!user){setLoading(false);return}
    const {data}=await supabase.from('stores').select('*').order('created_at',{ascending:true}).limit(1).maybeSingle()
    setStore(data||null); setLoading(false)
  },[])
  useEffect(()=>{load()},[load])
  return {store,loading,reload:load}
}
