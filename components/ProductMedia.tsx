'use client'
import { useMemo, useState } from 'react'

function youtubeEmbed(url:string){
  try{
    const u=new URL(url)
    if(u.hostname.includes('youtu.be')) return `https://www.youtube.com/embed/${u.pathname.replace('/','')}`
    if(u.hostname.includes('youtube.com')){
      const v=u.searchParams.get('v')
      if(v) return `https://www.youtube.com/embed/${v}`
      const parts=u.pathname.split('/').filter(Boolean)
      const i=parts.findIndex(x=>x==='shorts'||x==='embed')
      if(i>=0&&parts[i+1]) return `https://www.youtube.com/embed/${parts[i+1]}`
    }
  }catch{}
  return null
}

function isDirectVideo(url:string){
  try{return /\.(mp4|webm|ogg)(\?|#|$)/i.test(new URL(url).pathname+new URL(url).search)}catch{return false}
}

export default function ProductMedia({imageUrl,videoUrl,name}:{imageUrl?:string|null;videoUrl?:string|null;name:string}){
  const [active,setActive]=useState(videoUrl?'video':'image')
  const yt=useMemo(()=>videoUrl?youtubeEmbed(videoUrl):null,[videoUrl])
  const direct=!!videoUrl&&isDirectVideo(videoUrl)
  const canEmbed=!!yt||direct
  return <div className="mediaGallery">
    <div className="detailMedia">
      {active==='video'&&videoUrl ? (
        yt ? <iframe src={yt} title={`Video ${name}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/> :
        direct ? <video src={videoUrl} controls playsInline preload="metadata" poster={imageUrl||undefined}/> :
        <div className="videoFallback"><span>▶</span><b>Video Produk</b><p>Video dari sumber ini tidak dapat di-embed langsung.</p><a href={videoUrl} target="_blank" rel="noreferrer">Buka Video ↗</a></div>
      ) : imageUrl ? <img src={imageUrl} alt={name}/> : <span className="mediaPlaceholder">✦</span>}
    </div>
    {(videoUrl||imageUrl)&&<div className="mediaThumbs">
      {videoUrl&&<button type="button" className={active==='video'?'active':''} onClick={()=>setActive('video')}><span>▶</span><small>Video</small></button>}
      {imageUrl&&<button type="button" className={active==='image'?'active':''} onClick={()=>setActive('image')}><img src={imageUrl} alt="Thumbnail produk"/><small>Foto</small></button>}
    </div>}
    {videoUrl&&!canEmbed&&<small className="mediaHint">URL tetap disimpan dan bisa dibuka di tab baru.</small>}
  </div>
}
