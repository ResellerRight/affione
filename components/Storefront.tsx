'use client'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { rupiah } from '@/lib/utils'

const iconFor=(name:string)=>{
  const n=name.toLowerCase()
  if(n.includes('elektr'))return '💻'; if(n.includes('fashion'))return '👕'; if(n.includes('cantik'))return '💄'; if(n.includes('rumah'))return '🏠'; if(n.includes('bayi'))return '🍼'; if(n.includes('olahraga'))return '⚽'; if(n.includes('otomotif'))return '🚗'; if(n.includes('makan'))return '🍜'; return '🛍️'
}
export default function Storefront({store,categories,products}:{store:any;categories:any[];products:any[]}){
  const [q,setQ]=useState(''); const [cat,setCat]=useState('all')
  const filtered=useMemo(()=>products.filter(p=>(cat==='all'||p.category_id===cat)&&(!q||p.name.toLowerCase().includes(q.toLowerCase())||(p.short_description||'').toLowerCase().includes(q.toLowerCase()))),[products,q,cat])
  return <main className={`shopShell theme-${store.theme}`} style={{'--accent':store.accent_color} as React.CSSProperties}>
    {store.announcement&&<div className="announcement">{store.announcement}</div>}
    <header className="shopHeader">
      <Link href="/" className="shopLogo">{store.logo_url?<img src={store.logo_url} alt={store.name}/>:<span>🛍</span>}<div><b>{store.name}</b><small>Affiliate Store</small></div></Link>
      <div className="shopSearch"><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari produk favoritmu..."/><button aria-label="Cari">⌕</button></div>
      <nav><a href="#produk">Produk</a><a href="#kategori">Kategori</a><a href="#tentang">Tentang</a>{store.whatsapp&&<a href={`https://wa.me/${store.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noreferrer">Kontak</a>}</nav>
    </header>
    <section className="commerceHero" style={store.banner_url?{backgroundImage:`linear-gradient(90deg,rgba(255,247,246,.96) 0%,rgba(255,247,246,.8) 42%,rgba(255,247,246,.08) 78%),url(${store.banner_url})`}:undefined}>
      <div className="commerceHeroCopy"><span className="heroPill">♡ Affiliate Store</span><h1>{store.hero_title||'Produk Pilihan dari Shopee'}</h1><p>{store.hero_subtitle||store.tagline||'Harga terbaik, rekomendasi terpercaya.'}</p><div className="heroTrust"><span>✓ Produk Pilihan</span><span>✓ Banyak Pilihan</span><span>✓ Update Berkala</span></div><a className="heroBtn" href="#produk">{store.hero_cta||'Lihat Produk'}</a></div>
      {!store.banner_url&&<div className="heroVisual"><div className="heroBag">S</div><div className="floatCard one">📱</div><div className="floatCard two">🎧</div><div className="floatCard three">👟</div></div>}
    </section>
    <section id="kategori" className="categoryRibbon"><button className={cat==='all'?'active':''} onClick={()=>setCat('all')}><span>▦</span><small>Semua</small></button>{categories.map(c=><button key={c.id} className={cat===c.id?'active':''} onClick={()=>setCat(c.id)}><span>{iconFor(c.name)}</span><small>{c.name}</small></button>)}</section>
    <section id="produk" className="productSection"><div className="sectionTitle"><div><span>REKOMENDASI</span><h2>{cat==='all'?'Produk Terbaru':categories.find(c=>c.id===cat)?.name}</h2></div><small>{filtered.length} produk</small></div>
      <div className="productCards">{filtered.map(p=>{const discount=p.compare_at_price&&p.compare_at_price>p.price?Math.round((1-p.price/p.compare_at_price)*100):0;return <article className="commerceCard" key={p.id}>{p.badge&&<span className="cornerBadge">{p.badge}</span>}{p.video_url&&<span className="hasVideo">▶</span>}<Link className="commerceImage" href={`/produk/${p.slug}`}>{p.image_url?<img src={p.image_url} alt={p.name}/>:<span>🛍</span>}</Link><div className="commerceInfo"><Link href={`/produk/${p.slug}`}><h3>{p.name}</h3></Link><div className="priceLine"><b>{rupiah(p.price)}</b>{p.compare_at_price&&<del>{rupiah(p.compare_at_price)}</del>}{discount>0&&<em>-{discount}%</em>}</div><div className="ratingLine">★ {Number(p.rating||4.8).toFixed(1)} <span>| {(p.sold_count||0).toLocaleString('id-ID')} terjual</span></div><a className="shopBuy" href={`/api/track-click?product=${p.id}`} rel="nofollow sponsored">▣ Beli di {p.marketplace}</a></div></article>})}</div>
      {!filtered.length&&<div className="empty storeEmpty">Produk tidak ditemukan.</div>}
    </section>
    <section id="tentang" className="aboutStrip"><div><b>{store.name}</b><p>{store.description||store.tagline}</p></div><small>AffiOne · One Store for Every Affiliate Product.</small></section>
    <nav className="mobileShopNav"><a href="/">⌂<small>Beranda</small></a><a href="#kategori">▦<small>Kategori</small></a><a href="#produk">🛍<small>Produk</small></a><a href="#tentang">♡<small>Tentang</small></a></nav>
  </main>
}
