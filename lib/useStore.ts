'use client'
import { useCallback, useEffect, useState } from 'react'
import { getBrowserSupabase } from './supabase'
import type { Store } from './types'

export function useStore(){
  const [store,setStore]=useState<Store|null>(null)
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState<string|null>(null)

  const load=useCallback(async()=>{
    setLoading(true)
    setError(null)
    try{
      const supabase=getBrowserSupabase()
      const {data:{user},error:userError}=await supabase.auth.getUser()
      if(userError) throw userError
      if(!user){
        setStore(null)
        setError('Sesi login tidak ditemukan. Silakan login ulang.')
        return
      }

      const {data, error:storeError}=await supabase
        .from('stores')
        .select('*')
        .order('created_at',{ascending:true})
        .limit(1)
        .maybeSingle()

      if(storeError) throw storeError

      if(data){
        setStore(data as Store)
        return
      }

      // Single-owner mode: bootstrap satu toko default jika installer lama belum membuat row store.
      const {data:created,error:createError}=await supabase
        .from('stores')
        .insert({
          name:'AffiOne Store',
          slug:'main-store',
          tagline:'Produk pilihan terbaik untuk kamu.',
          description:'Temukan rekomendasi produk pilihan dan beli langsung melalui marketplace favoritmu.',
          accent_color:'#ff5b66',
          theme:'soft',
          is_active:true,
          seo_title:'AffiOne Store — Rekomendasi Produk',
          seo_description:'Kumpulan produk affiliate pilihan dalam satu toko.'
        })
        .select('*')
        .single()

      if(createError) throw createError
      setStore(created as Store)
    }catch(e:any){
      setStore(null)
      setError(e?.message || 'Gagal memuat pengaturan toko.')
    }finally{
      setLoading(false)
    }
  },[])

  useEffect(()=>{load()},[load])
  return {store,loading,error,reload:load}
}
