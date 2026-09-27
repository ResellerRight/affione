export type Store = {
  id: string
  name: string
  slug: string
  tagline: string | null
  description: string | null
  logo_url: string | null
  banner_url: string | null
  accent_color: string
  theme: string
  whatsapp: string | null
  instagram: string | null
  tiktok: string | null
  email: string | null
  seo_title: string | null
  seo_description: string | null
  is_active: boolean
}

export type Category = { id: string; store_id: string; name: string; slug: string; is_active: boolean; sort_order: number }

export type Product = {
  id: string
  store_id: string
  category_id: string | null
  name: string
  slug: string
  description: string | null
  image_url: string | null
  video_url: string | null
  price: number
  compare_at_price: number | null
  affiliate_url: string
  marketplace: string
  badge: string | null
  is_featured: boolean
  is_published: boolean
  sort_order: number
  view_count: number
  click_count: number
  created_at: string
  categories?: { name: string } | null
}
