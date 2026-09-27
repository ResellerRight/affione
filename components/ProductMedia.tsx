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
function isDirectVideo(url:string){try{return /\.(mp4|webm|ogg)(\?|#|$)/i.test(new URL(url).pathname+new URL(url).search)}catch{return false}}

type Media = {type:'image'|'video';url:string}
export default function ProductMedia({imageUrl,galleryUrls,videoUrl,name}:{imageUrl?:string|null;galleryUrls?:string[]|null;videoUrl?:string|null;name:string}){
  const media=useMemo<Media[]>(()=>{
    const out:Media[]=[]
    if(imageUrl) out.push({type:'image',url:imageUrl})
    for(const url of galleryUrls||[]) if(url && !out.some(x=>x.url===url)) out.push({type:'image',url})
    if(videoUrl) out.push({type:'video',url:videoUrl})
    return out
  },[imageUrl,galleryUrls,videoUrl])
  const [active,setActive]=useState(0)
  const item=media[active]||null
  const yt=item?.type==='video'?youtubeEmbed(item.url):null
  const direct=item?.type==='video'&&isDirectVideo(item.url)
  return <div className="mediaGallery">
    <div className="detailMedia">
      {!item?<span className="mediaPlaceholder">✦</span>:item.type==='image'?<img src={item.url} alt={name}/>:yt?<iframe src={yt} title={`Video ${name}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>:direct?<video src={item.url} controls playsInline preload="metadata" poster={imageUrl||undefined}/>:<div className="videoFallback"><span>▶</span><b>Video Produk</b><p>Video dari sumber ini dibuka melalui sumber aslinya.</p><a href={item.url} target="_blank" rel="noreferrer">Buka Video ↗</a></div>}
    </div>
    {media.length>1&&<div className="mediaThumbs">{media.map((m,i)=><button key={`${m.type}-${i}`} type="button" className={active===i?'active':''} onClick={()=>setActive(i)}>{m.type==='image'?<img src={m.url} alt={`Media ${i+1}`}/>:<><span>▶</span><small>Video</small></>}</button>)}</div>}
  </div>
}
