'use client'
import { useEffect } from 'react'
export default function ViewTracker({productId}:{productId:string}){useEffect(()=>{fetch('/api/track-view',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({productId})}).catch(()=>{})},[productId]);return null}
