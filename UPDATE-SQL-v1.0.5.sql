-- AffiOne v1.0.5 PERMISSION HOTFIX
-- Untuk database existing yang sudah menjalankan v1.0.4.
-- Aman: tidak menghapus tabel atau data.

-- Pastikan role API Supabase punya hak akses level tabel.
grant usage on schema public to anon, authenticated;

grant select on table public.stores to anon, authenticated;
grant insert, update, delete on table public.stores to authenticated;

grant select on table public.categories to anon, authenticated;
grant insert, update, delete on table public.categories to authenticated;

grant select on table public.products to anon, authenticated;
grant insert, update, delete on table public.products to authenticated;

grant insert on table public.click_events to anon, authenticated;
grant select on table public.click_events to authenticated;

-- RLS tetap menjadi lapisan pembatas akses row.
alter table public.stores enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.click_events enable row level security;

-- Recreate policy toko agar owner authenticated bisa baca/tambah/update.
drop policy if exists "stores public read" on public.stores;
create policy "stores public read" on public.stores
for select to anon, authenticated
using (is_active = true or auth.role() = 'authenticated');

drop policy if exists "stores owner insert" on public.stores;
create policy "stores owner insert" on public.stores
for insert to authenticated
with check (true);

drop policy if exists "stores owner update" on public.stores;
create policy "stores owner update" on public.stores
for update to authenticated
using (true)
with check (true);

-- Pastikan store default ada.
insert into public.stores(name,slug,tagline,description,accent_color,theme,is_active,seo_title,seo_description,hero_title,hero_subtitle,hero_cta,announcement)
select 'AffiOne Store','main-store','Produk pilihan terbaik untuk kamu.','Temukan rekomendasi produk pilihan dan beli langsung melalui marketplace favoritmu.','#ff416c','soft',true,'AffiOne Store — Rekomendasi Produk','Kumpulan produk affiliate pilihan dalam satu toko.','Produk Pilihan dari Shopee','Harga terbaik, rekomendasi terpercaya.','Lihat Produk','Pilihan produk affiliate favorit minggu ini ✨'
where not exists(select 1 from public.stores);
