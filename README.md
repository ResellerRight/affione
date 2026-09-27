# AffiOne v1.0.6 FULL
**One Store for Every Affiliate Product.**

Single-owner affiliate storefront berbasis Next.js + TypeScript + Supabase + GitHub + Vercel.

## UPDATE EXISTING (database yang sudah terpasang)
1. Buka Supabase > SQL Editor.
2. Jalankan **`UPDATE-SQL-v1.0.6.sql`** satu kali.
3. Overwrite repository GitHub dengan isi ZIP v1.0.6.
4. Commit/push lalu tunggu Vercel redeploy.
5. Refresh storefront dan dashboard.

Query v1.0.6 tidak reset database dan tidak menghapus produk lama. Update ini menambah dukungan icon kategori custom + storage bucket `category-icons`.

## INSTALL BARU
Jalankan satu kali:
`supabase/install/00_FULL_FRESH_INSTALL_AFFIONE.sql`

Fresh installer sudah mencakup schema, RLS, grants, storage, kategori, dan 20 dummy produk. Setelah itu buat 1 owner di Supabase Authentication, isi ENV, push ke GitHub, dan deploy ke Vercel.

## v1.0.6 Highlights
- Kategori mobile sekarang grid 4 kolom yang rapi, tidak kepotong horizontal.
- Setiap kategori dapat memakai icon bawaan atau upload gambar/icon sendiri.
- Icon custom disimpan di Supabase Storage `category-icons`.
- Detail produk dibuat lebih mirip halaman marketplace/Shopee style.
- Tab **Deskripsi** dan **Informasi Produk** sekarang benar-benar dapat diklik.
- Informasi Produk menampilkan marketplace, kategori, rating, jumlah terjual, label, dan tipe pembelian.
- Mobile detail produk punya sticky CTA beli.

## ENV
Lihat `.env.example`.

## Struktur penting
- `app/` Next.js App Router
- `components/Storefront.tsx` storefront publik
- `components/ProductForm.tsx` CRUD produk
- `components/ProductDetailTabs.tsx` tab detail produk interaktif
- `app/dashboard/categories/page.tsx` CRUD + custom category icon
- `supabase/install/00_FULL_FRESH_INSTALL_AFFIONE.sql` fresh install
- `supabase/migrations/004_v1.0.6_category_icons.sql` migration existing DB
- `UPDATE-SQL-v1.0.6.sql` query upgrade praktis
