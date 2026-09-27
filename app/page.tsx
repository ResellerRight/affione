import type { Metadata } from 'next'
import Link from 'next/link'
import { getServerSupabase } from '@/lib/supabase'
import { rupiah } from '@/lib/utils'

export const dynamic = 'force-dynamic'

async function getStorefront(){
  const s = getServerSupabase()
  if(!s) return null
  const { data: store } = await s.from('stores').select('*').eq('is_active',true).order('created_at',{ascending:true}).limit(1).maybeSingle()
  if(!store) return null
  const [{data:cats},{data:products}] = await Promise.all([
    s.from('categories').select('*').eq('store_id',store.id).eq('is_active',true).order('sort_order').order('name'),
    s.from('products').select('*,categories(name,slug)').eq('store_id',store.id).eq('is_published',true).order('is_featured',{ascending:false}).order('sort_order').order('created_at',{ascending:false})
  ])
  return {store,cats:cats||[],products:products||[]}
}

export async function generateMetadata():Promise<Metadata>{
  const data = await getStorefront()
  if(!data) return {title:'AffiOne',description:'One Store for Every Affiliate Product.'}
  const {store}=data
  return {
    title: store.seo_title || store.name,
    description: store.seo_description || store.description || store.tagline || 'Rekomendasi produk affiliate pilihan.',
    openGraph:{
      title: store.seo_title || store.name,
      description: store.seo_description || store.tagline || '',
      images: store.banner_url ? [store.banner_url] : undefined
    }
  }
}

export default async function Home(){
  const data = await getStorefront()
  if(!data) return <main className="landing"><section className="hero"><div className="heroCopy"><span className="eyebrow">AFFIONE</span><h1>Toko affiliate belum diaktifkan.</h1><p>Jalankan installer Supabase, buat satu akun owner, lalu login ke dashboard untuk menyiapkan toko.</p><div className="heroActions"><Link className="btn primary big" href="/login">Login Admin</Link></div></div></section></main>
  const {store,cats,products}=data
  return <main className={`storefront theme-${store.theme}`} style={{'--accent':store.accent_color} as React.CSSProperties}>
    <header className="storeNav">
      <Link href="/" className="storeBrand">{store.logo_url?<img src={store.logo_url} alt={store.name}/>:<span>{store.name.slice(0,1)}</span>}<b>{store.name}</b></Link>
      <div className="storeLinks">{store.instagram&&<span>Instagram</span>}{store.tiktok&&<span>TikTok</span>}{store.whatsapp&&<a href={`https://wa.me/${store.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noreferrer">WhatsApp</a>}</div>
    </header>
    <section className="storeHero" style={store.banner_url?{backgroundImage:`linear-gradient(90deg,rgba(24,15,20,.83),rgba(24,15,20,.18)),url(${store.banner_url})`}:undefined}>
      <div><span className="storeEyebrow">CURATED AFFILIATE PICKS</span><h1>{store.tagline||`Pilihan terbaik dari ${store.name}`}</h1><p>{store.description||'Temukan rekomendasi produk pilihan dan beli langsung melalui marketplace favoritmu.'}</p><a href="#produk" className="shopNow">Lihat Produk ↓</a></div>
    </section>
    {cats.length>0&&<div className="categoryChips"><a href="#produk" className="active">Semua</a>{cats.map((c:any)=><a key={c.id} href={`#cat-${c.slug}`}>{c.name}</a>)}</div>}
    <section id="produk" className="storeSection">
      <div className="storeSectionHead"><div><span>REKOMENDASI</span><h2>Produk Pilihan</h2></div><small>{products.length} produk</small></div>
      <div className="storeGrid">{products.map((p:any)=><article className="storeCard" key={p.id} id={p.categories?.slug?`cat-${p.categories.slug}`:undefined}>{p.badge&&<span className="badge">{p.badge}</span>}{p.video_url&&<span className="videoBadge">▶ Video</span>}<Link href={`/produk/${p.slug}`} className="productImage">{p.image_url?<img src={p.image_url} alt={p.name}/>:<span>✦</span>}</Link><div className="productInfo"><small>{p.categories?.name||p.marketplace}</small><Link href={`/produk/${p.slug}`}><h3>{p.name}</h3></Link><div className="prices"><b>{rupiah(p.price)}</b>{p.compare_at_price&&<del>{rupiah(p.compare_at_price)}</del>}</div><a className="buyBtn" href={`/api/track-click?product=${p.id}`} rel="nofollow sponsored">Beli di {p.marketplace} ↗</a></div></article>)}</div>
      {!products.length&&<div className="empty storeEmpty">Belum ada produk yang dipublish.</div>}
    </section>
    <footer className="storeFooter"><div><b>{store.name}</b><p>{store.tagline}</p></div><small><strong>AffiOne</strong> — One Store for Every Affiliate Product.</small></footer>
  </main>
}
