# AffiOne v1.0.5 FULL
**One Store for Every Affiliate Product.**

Single-owner affiliate storefront berbasis Next.js + TypeScript + Supabase + Vercel.

## Untuk instalasi yang SUDAH memakai AffiOne v1.0.2/v1.0.3
1. Buka Supabase > SQL Editor.
2. Jalankan **`UPDATE-SQL-v1.0.5.sql`** satu kali.
3. Overwrite source repository GitHub dengan isi ZIP v1.0.5.
4. Push/commit ke GitHub dan tunggu Vercel redeploy.
5. Buka Dashboard > Tampilan Toko untuk mengubah banner/hero.
6. Buka Dashboard > Produk untuk mengedit 20 dummy produk.

SQL update tidak drop tabel dan tidak menghapus data lama. Dummy produk hanya di-seed bila toko masih 0 produk.

## Untuk instalasi BARU
Jalankan satu kali:
`supabase/install/00_FULL_FRESH_INSTALL_AFFIONE.sql`

Lalu buat 1 owner di Supabase Authentication, isi ENV, push ke GitHub, dan deploy ke Vercel.

## ENV
Lihat `.env.example`.

## Struktur penting
- `app/` Next.js App Router
- `components/Storefront.tsx` storefront interaktif
- `components/ProductForm.tsx` CRUD tambah/edit produk
- `supabase/install/00_FULL_FRESH_INSTALL_AFFIONE.sql` fresh install
- `supabase/migrations/002_v1.0.5_storefront_upgrade.sql` migration existing database
- `UPDATE-SQL-v1.0.5.sql` query praktis untuk database existing
