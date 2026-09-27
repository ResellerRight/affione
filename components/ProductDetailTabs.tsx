'use client'

import { useState } from 'react'

export default function ProductDetailTabs({
  description,
  shortDescription,
  marketplace,
  category,
  rating,
  soldCount,
  badge,
  highlights,
}:{
  description?: string | null
  shortDescription?: string | null
  marketplace: string
  category?: string | null
  rating?: number | string | null
  soldCount?: number | null
  badge?: string | null
  highlights?: string[] | null
}){
  const [tab,setTab]=useState<'description'|'info'>('description')
  const cleanHighlights=(highlights||[]).filter(Boolean)
  return <section className="productDescription shopeeTabsCard">
    <div className="tabs interactiveTabs" role="tablist" aria-label="Detail produk">
      <button type="button" role="tab" aria-selected={tab==='description'} className={tab==='description'?'active':''} onClick={()=>setTab('description')}>Deskripsi</button>
      <button type="button" role="tab" aria-selected={tab==='info'} className={tab==='info'?'active':''} onClick={()=>setTab('info')}>Informasi Produk</button>
    </div>
    {tab==='description'?<div className="tabContent" role="tabpanel">
      <p>{description||shortDescription||'Belum ada deskripsi produk.'}</p>
      {!!cleanHighlights.length&&<div className="detailHighlights"><h3>Keunggulan Produk</h3><ul>{cleanHighlights.map((item)=><li key={item}>✓ {item}</li>)}</ul></div>}
    </div>:<div className="tabContent" role="tabpanel">
      <div className="productInfoTable">
        <div><span>Marketplace</span><b>{marketplace}</b></div>
        <div><span>Kategori</span><b>{category||'Tanpa kategori'}</b></div>
        <div><span>Rating</span><b>★ {Number(rating||0).toFixed(1)}</b></div>
        <div><span>Terjual</span><b>{Number(soldCount||0).toLocaleString('id-ID')}+</b></div>
        {badge&&<div><span>Label</span><b>{badge}</b></div>}
        <div><span>Tipe Pembelian</span><b>Affiliate Marketplace</b></div>
      </div>
      <p className="infoNotice">Transaksi, pembayaran, pengiriman, garansi, dan kebijakan retur mengikuti marketplace tujuan setelah kamu menekan tombol beli.</p>
    </div>}
  </section>
}
