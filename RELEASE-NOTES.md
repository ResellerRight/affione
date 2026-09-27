# AffiOne v1.0.4 — Storefront Commerce Upgrade

Upgrade besar tampilan storefront agar mengikuti mockup e-commerce AffiOne/TerryShop yang disepakati.

## Perubahan utama
- Storefront baru: header, search, hero banner, kategori icon, grid produk, CTA marketplace, mobile bottom navigation.
- Detail produk baru: gallery foto, video, rating, sold count, harga coret, diskon, CTA besar, keunggulan, deskripsi.
- Produk mendukung foto utama + banyak foto tambahan + video URL.
- Field produk baru: slug editable, short description, highlights, rating, sold_count.
- Pengaturan toko baru: headline hero, subheadline, CTA hero, announcement, banner URL.
- Dashboard dipoles agar lebih dekat dengan mockup premium.
- 20 dummy produk + 8 kategori otomatis ditambahkan HANYA bila toko existing masih memiliki 0 produk.
- Dummy produk adalah data normal: bisa diedit, dihapus, draft/publish dari dashboard.
- Existing database tidak di-reset. Gunakan `UPDATE-SQL-v1.0.4.sql`.
- Fresh installer tetap tersedia untuk instalasi baru.
