# Validation — AffiOne v1.0.5

## Dilakukan
- Struktur source diperiksa.
- Semua file `.ts` / `.tsx` (kecuali deklarasi generated `next-env.d.ts`) diparse/transpile dengan TypeScript global: tidak ada syntax error.
- Query migration dibuat additive (`ADD COLUMN IF NOT EXISTS`) dan tidak melakukan DROP data/table.
- Logic seed diperiksa: 20 dummy produk hanya dibuat bila product count store = 0.
- Fresh installer telah diperbarui agar schema v1.0.5 tersedia untuk instalasi baru.
- Jalur edit produk tetap memakai `ProductForm id=...`; dummy product adalah row normal sehingga editable/delete/publish/draft.
- ZIP integrity diperiksa setelah packaging.

## Belum dapat diklaim
`npm install` dicoba pada environment build tetapi timeout pada akses registry. Karena dependency tidak berhasil terpasang, `npm run build` / `npm run typecheck` penuh tidak dapat dijalankan di environment ini dan TIDAK diklaim lolos.

Setelah overwrite GitHub, Vercel akan menjalankan build aktual. Jika Vercel memberi error build, gunakan log build tersebut untuk koreksi versi berikutnya.
