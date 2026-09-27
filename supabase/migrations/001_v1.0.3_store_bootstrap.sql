-- AffiOne v1.0.3 migration
-- Fix Tampilan Toko infinite loading on databases where the main store row was missing.

alter table public.stores enable row level security;

drop policy if exists "stores owner insert" on public.stores;
create policy "stores owner insert"
on public.stores for insert
to authenticated
with check (true);

-- Create one default store only when none exists.
insert into public.stores(name,slug,tagline,description,seo_title,seo_description,is_active)
select
  'AffiOne Store',
  'main-store',
  'Produk pilihan terbaik untuk kamu.',
  'Temukan rekomendasi produk pilihan dan beli langsung melalui marketplace favoritmu.',
  'AffiOne Store — Rekomendasi Produk',
  'Kumpulan produk affiliate pilihan dalam satu toko.',
  true
where not exists (select 1 from public.stores);
