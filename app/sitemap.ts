import type { MetadataRoute } from 'next'
import { getServerSupabase } from '@/lib/supabase'
export default async function sitemap():Promise<MetadataRoute.Sitemap>{
  const base=(process.env.NEXT_PUBLIC_SITE_URL||'https://example.com').replace(/\/$/,'')
  const out:MetadataRoute.Sitemap=[{url:base,lastModified:new Date(),changeFrequency:'daily',priority:1}]
  const s=getServerSupabase(); if(!s)return out
  const {data:store}=await s.from('stores').select('id,updated_at').eq('is_active',true).order('created_at',{ascending:true}).limit(1).maybeSingle()
  if(!store)return out
  const {data:products}=await s.from('products').select('slug,updated_at').eq('store_id',store.id).eq('is_published',true)
  for(const p of products||[]) out.push({url:`${base}/produk/${p.slug}`,lastModified:new Date(p.updated_at||Date.now()),changeFrequency:'weekly',priority:.8})
  return out
}
