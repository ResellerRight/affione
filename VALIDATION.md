# Validation — AffiOne v1.0.2

- Struktur source diperiksa setelah perubahan media produk.
- Fresh SQL installer diperiksa: kolom `video_url` tersedia pada `products`.
- Form create/edit menyimpan dan membaca `video_url`.
- Detail storefront menggunakan komponen media client-side untuk foto/video.
- ZIP integrity diperiksa setelah packaging.
- `npm run build` belum diklaim lulus di environment ini karena dependency npm tidak tersedia/instalasi registry sebelumnya timeout. Jalankan `npm install && npm run build` sebelum production deploy.
