# AffiOne v1.0.2 FULL
**One Store for Every Affiliate Product.**

AffiOne adalah **website toko affiliate pribadi (single owner / single store)**. Bukan SaaS dan bukan multi-user. Owner login ke dashboard, menambahkan produk sendiri, menempel link affiliate Shopee/TikTok Shop/Tokopedia/Lazada/lainnya, lalu pengunjung membuka toko langsung dari homepage domain.

## Stack
- Next.js
- Supabase Database + Auth + Storage
- Vercel

## URL utama
- `/` — storefront publik
- `/produk/[slug]` — detail produk SEO-friendly
- `/login` — login owner
- `/dashboard` — dashboard owner

## Instalasi ringkas
1. Buat project Supabase.
2. Jalankan `supabase/install/00_FULL_FRESH_INSTALL_AFFIONE.sql` satu kali.
3. Di Supabase Authentication, buat **satu akun owner** secara manual.
4. Nonaktifkan public sign-up di pengaturan Authentication supaya tidak ada user lain yang mendaftar.
5. Copy `.env.example` menjadi `.env.local` dan isi Supabase URL + anon key + URL website.
6. Jalankan `npm install` lalu `npm run build`.
7. Deploy ke Vercel.

Lihat `DOCUMENTATION/INSTALLATION-GUIDE.md` untuk langkah lengkap.


## Media Produk
Produk mendukung foto utama dan **Video URL**. URL MP4/WebM dapat diputar langsung, YouTube di-embed, dan URL video lain tetap disimpan dengan fallback buka video.
