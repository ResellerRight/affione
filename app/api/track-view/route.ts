import { NextRequest, NextResponse } from 'next/server'
import { getServerSupabase } from '@/lib/supabase'
export async function POST(req:NextRequest){const body=await req.json().catch(()=>({}));const id=String(body?.productId||'');if(!id)return NextResponse.json({ok:false},{status:400});const s=getServerSupabase();if(!s)return NextResponse.json({ok:false},{status:503});const {error}=await s.rpc('increment_product_view',{p_product_id:id});return NextResponse.json({ok:!error},{status:error?400:200})}
