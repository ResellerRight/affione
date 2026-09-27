# AffiOne v1.0.2 — Installation Guide

## Konsep
AffiOne v1.0.2 adalah aplikasi **single owner / single affiliate store**. Tidak ada registrasi publik, tenant, paket, atau multi-store.

## 1. Supabase
Buat project baru, buka SQL Editor, lalu jalankan:

`supabase/install/00_FULL_FRESH_INSTALL_AFFIONE.sql`

Installer otomatis membuat satu storefront utama beserta tabel produk, kategori, analytics klik, RLS, dan bucket gambar.

## 2. Buat akun owner
Buka **Authentication > Users** di Supabase lalu buat satu user owner menggunakan email dan password milik Anda.

Setelah itu buka pengaturan Authentication dan **nonaktifkan public user sign-up**. AffiOne tidak menyediakan halaman registrasi.

## 3. Environment
Copy `.env.example` menjadi `.env.local`, lalu isi:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL`

## 4. Jalankan lokal
`npm install`

`npm run dev`

Login owner di `/login`.

## 5. Deploy
Push ke GitHub dan import repository ke Vercel. Tambahkan environment variables yang sama, lalu deploy.

Homepage domain langsung menjadi storefront publik. Tidak ada URL tenant atau slug toko.


## Video Produk
Pada Tambah/Edit Produk tersedia **Video URL**. Gunakan URL MP4/WebM langsung atau YouTube untuk playback di halaman detail. URL sumber lain tetap tersimpan dan akan mendapat tombol buka video bila tidak dapat di-embed.
