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
  hero_title: string | null
  hero_subtitle: string | null
  hero_cta: string | null
  announcement: string | null
  is_active: boolean
}

export type Category = {
  id: string
  store_id: string
  name: string
  slug: string
  is_active: boolean
  sort_order: number
  icon_type?: 'default' | 'upload'
  icon_name?: string | null
  icon_image_url?: string | null
}

export type Product = {
  id: string
  store_id: string
  category_id: string | null
  name: string
  slug: string
  short_description: string | null
  description: string | null
  image_url: string | null
  gallery_urls: string[] | null
  video_url: string | null
  highlights: string[] | null
  price: number
  compare_at_price: number | null
  affiliate_url: string
  marketplace: string
  badge: string | null
  rating: number | null
  sold_count: number
  is_featured: boolean
  is_published: boolean
  sort_order: number
  view_count: number
  click_count: number
  created_at: string
  categories?: { name: string; slug?: string } | null
}
