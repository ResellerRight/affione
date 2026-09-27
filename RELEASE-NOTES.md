# AffiOne v1.0.6 — Category Media + Product Detail UX

## Perubahan
- Perbaikan kategori mobile menjadi grid 4 kolom responsive.
- Category icon dapat dipilih dari default icon atau di-upload sendiri.
- Tambah bucket Supabase Storage `category-icons` beserta policy upload/read/update/delete.
- CRUD kategori sekarang mendukung edit nama, slug, status, urutan, icon type, default icon, dan custom image URL/upload.
- Detail produk direvisi lebih dekat layout marketplace/Shopee: media gallery, price panel, statistik rating/terjual, purchase reassurance, CTA marketplace.
- Tab Deskripsi dan Informasi Produk interaktif.
- Informasi Produk menampilkan metadata produk secara rapi.
- Sticky mobile CTA untuk halaman detail produk.
- Existing DB: jalankan `UPDATE-SQL-v1.0.6.sql`.
- Fresh installer diperbarui agar instalasi baru langsung memiliki semua perubahan v1.0.6.
