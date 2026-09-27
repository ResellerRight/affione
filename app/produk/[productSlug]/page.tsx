import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getServerSupabase } from '@/lib/supabase'
import { rupiah } from '@/lib/utils'
import ViewTracker from '@/components/ViewTracker'
import ProductMedia from '@/components/ProductMedia'

export const dynamic='force-dynamic'

async function getData(productSlug:string){
  const s=getServerSupabase(); if(!s)return null
  const {data:store}=await s.from('stores').select('*').eq('is_active',true).order('created_at',{ascending:true}).limit(1).maybeSingle()
  if(!store)return null
  const {data:product}=await s.from('products').select('*,categories(name)').eq('store_id',store.id).eq('slug',productSlug).eq('is_published',true).single()
  return product?{store,product}:null
}

export async function generateMetadata({params}:{params:Promise<{productSlug:string}>}):Promise<Metadata>{
  const p=await params; const data=await getData(p.productSlug)
  if(!data)return {title:'Produk tidak ditemukan | AffiOne'}
  return {title:`${data.product.name} | ${data.store.name}`,description:data.product.description||`Cek ${data.product.name} dan beli melalui ${data.product.marketplace}.`,openGraph:{images:data.product.image_url?[data.product.image_url]:undefined}}
}

export default async function ProductPage({params}:{params:Promise<{productSlug:string}>}){
  const p=await params; const data=await getData(p.productSlug); if(!data)notFound()
  const {store,product}=data
  const jsonLd={"@context":"https://schema.org","@type":"Product",name:product.name,image:product.image_url?[product.image_url]:undefined,description:product.description||undefined,offers:{"@type":"Offer",priceCurrency:'IDR',price:product.price,url:product.affiliate_url,availability:'https://schema.org/InStock'}}
  return <main className={`storefront theme-${store.theme}`} style={{'--accent':store.accent_color} as React.CSSProperties}>
    <ViewTracker productId={product.id}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}}/>
    <header className="storeNav"><Link href="/" className="storeBrand">{store.logo_url?<img src={store.logo_url} alt={store.name}/>:<span>{store.name.slice(0,1)}</span>}<b>{store.name}</b></Link><Link href="/">← Kembali ke toko</Link></header>
    <section className="productDetail"><ProductMedia imageUrl={product.image_url} videoUrl={product.video_url} name={product.name}/><div className="detailInfo"><span className="storeEyebrow">{product.categories?.name||product.marketplace}</span><h1>{product.name}</h1><div className="detailPrice"><b>{rupiah(product.price)}</b>{product.compare_at_price&&<del>{rupiah(product.compare_at_price)}</del>}</div>{product.description&&<p>{product.description}</p>}<a className="buyBtn detailBuy" href={`/api/track-click?product=${product.id}`} rel="nofollow sponsored">Beli Sekarang di {product.marketplace} ↗</a><small className="disclosure">Tautan ini dapat berupa link affiliate. Kami dapat memperoleh komisi tanpa biaya tambahan untuk pembeli.</small></div></section>
    <footer className="storeFooter"><div><b>{store.name}</b><p>{store.tagline}</p></div><small><strong>AffiOne</strong></small></footer>
  </main>
}
