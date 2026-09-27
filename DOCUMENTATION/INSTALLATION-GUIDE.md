# AffiOne v1.0.4 Installation / Upgrade

## Upgrade database existing
Jalankan `UPDATE-SQL-v1.0.4.sql` di Supabase SQL Editor. Jangan jalankan fresh installer pada database yang sudah dipakai.

## Overwrite GitHub
Extract ZIP, overwrite repository AffiOne existing, commit semua perubahan source, lalu push. Vercel yang terhubung ke repository akan redeploy otomatis.

## Fresh install baru
Pada project Supabase kosong jalankan `supabase/install/00_FULL_FRESH_INSTALL_AFFIONE.sql`, buat owner via Authentication, lalu isi environment variables Vercel.
