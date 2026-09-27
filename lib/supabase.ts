import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let browserClient: SupabaseClient | null = null

function config() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  return { url, key }
}

export function getBrowserSupabase() {
  if (browserClient) return browserClient
  const { url, key } = config()
  if (!url || !key) throw new Error('Supabase belum dikonfigurasi. Isi environment variable terlebih dahulu.')
  browserClient = createClient(url, key, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } })
  return browserClient
}

export function getServerSupabase() {
  const { url, key } = config()
  if (!url || !key) return null
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
}
