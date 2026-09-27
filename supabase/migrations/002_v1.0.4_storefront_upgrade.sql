-- AffiOne v1.0.4 UPGRADE QUERY
-- UNTUK DATABASE YANG SUDAH MEMAKAI v1.0.2 / v1.0.3.
-- Aman terhadap data lama: tidak drop tabel/data.

alter table public.stores add column if not exists hero_title text;
alter table public.stores add column if not exists hero_subtitle text;
alter table public.stores add column if not exists hero_cta text;
alter table public.stores add column if not exists announcement text;

alter table public.products add column if not exists short_description text;
alter table public.products add column if not exists gallery_urls text[] not null default '{}';
alter table public.products add column if not exists highlights text[] not null default '{}';
alter table public.products add column if not exists rating numeric(2,1) not null default 4.8;
alter table public.products add column if not exists sold_count integer not null default 0;

-- Pastikan owner authenticated dapat bootstrap satu store jika instalasi lama belum punya row.
drop policy if exists "stores owner insert" on public.stores;
create policy "stores owner insert" on public.stores for insert to authenticated with check(true);

insert into public.stores(name,slug,tagline,description,accent_color,theme,is_active,seo_title,seo_description,hero_title,hero_subtitle,hero_cta,announcement)
select 'AffiOne Store','main-store','Produk pilihan terbaik untuk kamu.','Temukan rekomendasi produk pilihan dan beli langsung melalui marketplace favoritmu.','#ff416c','soft',true,'AffiOne Store — Rekomendasi Produk','Kumpulan produk affiliate pilihan dalam satu toko.','Produk Pilihan dari Shopee','Harga terbaik, rekomendasi terpercaya.','Lihat Produk','Pilihan produk affiliate favorit minggu ini ✨'
where not exists(select 1 from public.stores);

update public.stores set
  hero_title=coalesce(hero_title,'Produk Pilihan dari Shopee'),
  hero_subtitle=coalesce(hero_subtitle,'Harga terbaik, rekomendasi terpercaya.'),
  hero_cta=coalesce(hero_cta,'Lihat Produk'),
  announcement=coalesce(announcement,'Pilihan produk affiliate favorit minggu ini ✨')
where id=(select id from public.stores order by created_at asc limit 1);

-- Seed kategori hanya yang belum ada.
with s as (select id from public.stores order by created_at asc limit 1), c(name,slug,sort_order) as (
  values
  ('Elektronik','elektronik',1),('Fashion','fashion',2),('Kecantikan','kecantikan',3),('Rumah Tangga','rumah-tangga',4),
  ('Perlengkapan Bayi','perlengkapan-bayi',5),('Olahraga','olahraga',6),('Otomotif','otomotif',7),('Makanan','makanan',8)
)
insert into public.categories(store_id,name,slug,sort_order,is_active)
select s.id,c.name,c.slug,c.sort_order,true from s,c
on conflict(store_id,slug) do nothing;

-- Dummy product hanya dimasukkan bila toko masih belum punya produk.
do $$
declare sid uuid; cnt integer;
begin
  select id into sid from public.stores order by created_at asc limit 1;
  select count(*) into cnt from public.products where store_id=sid;
  if cnt=0 then
    insert into public.products(store_id,category_id,name,slug,short_description,description,image_url,gallery_urls,video_url,highlights,price,compare_at_price,affiliate_url,marketplace,badge,rating,sold_count,is_featured,is_published,sort_order)
    values
    (sid,(select id from public.categories where store_id=sid and slug='elektronik'),'TWS Wireless Bluetooth Noise Cancelling','tws-wireless-bluetooth','Audio nirkabel praktis dengan desain compact.','TWS ringan untuk aktivitas harian, meeting, olahraga, dan hiburan. Desain charging case compact dan mudah dibawa.','https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',array['https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80'],null,array['Bluetooth praktis','Charging case compact','Nyaman untuk harian'],199000,299000,'https://shopee.co.id/','Shopee','Mall',4.9,12800,true,true,1),
    (sid,(select id from public.categories where store_id=sid and slug='rumah-tangga'),'Air Fryer 4L Low Watt','air-fryer-4l-low-watt','Air fryer compact untuk masak praktis tanpa banyak minyak.','Kapasitas 4 liter, desain modern, cocok untuk kebutuhan rumah tangga sehari-hari.','https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=900&q=80',array['https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80'],null,array['Kapasitas 4L','Mudah dibersihkan','Desain modern'],599000,789000,'https://shopee.co.id/','Shopee','Best Seller',4.8,8800,true,true,2),
    (sid,(select id from public.categories where store_id=sid and slug='kecantikan'),'Ceramide Moisturizer 30g','ceramide-moisturizer-30g','Moisturizer harian dengan tekstur ringan.','Pelembap wajah untuk rutinitas skincare harian dengan kemasan praktis.','https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80',array['https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80'],null,array['Tekstur ringan','Praktis dibawa','Untuk rutinitas harian'],89000,129000,'https://shopee.co.id/','Shopee','Diskon 30%',4.9,22100,true,true,3),
    (sid,(select id from public.categories where store_id=sid and slug='fashion'),'Sneakers Running Shoes Pria','sneakers-running-shoes-pria','Sneakers sporty untuk aktivitas casual dan olahraga.','Sepatu running bergaya modern untuk kegiatan harian dan olahraga ringan.','https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',array['https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80'],null,array['Desain sporty','Sol nyaman','Mudah dipadukan'],259000,349000,'https://shopee.co.id/','Shopee','Viral',4.7,5800,false,true,4),
    (sid,(select id from public.categories where store_id=sid and slug='rumah-tangga'),'Blender Portable USB 6 Mata Pisau','blender-portable-usb','Blender portable rechargeable untuk jus dan smoothie.','Ukuran ringkas, mudah dibawa, cocok untuk membuat minuman segar kapan saja.','https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=900&q=80',array[]::text[],null,array['Rechargeable USB','Portable','6 mata pisau'],119000,159000,'https://shopee.co.id/','Shopee','Viral',4.8,10400,false,true,5),
    (sid,(select id from public.categories where store_id=sid and slug='elektronik'),'Smartwatch AMOLED Active','smartwatch-amoled-active','Smartwatch modern dengan layar AMOLED dan fitur aktivitas.','Smartwatch dengan tampilan jernih, mode olahraga, dan pemantauan aktivitas harian.','https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',array['https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=900&q=80'],'https://www.youtube.com/watch?v=dQw4w9WgXcQ',array['Layar AMOLED','100+ mode olahraga','Baterai tahan lama','Pemantauan aktivitas'],299000,479000,'https://shopee.co.id/','Shopee','Mall',4.9,25800,true,true,6),
    (sid,(select id from public.categories where store_id=sid and slug='elektronik'),'Power Bank 20000mAh Fast Charging','power-bank-20000mah','Power bank kapasitas besar untuk kebutuhan mobile.','Cocok untuk perjalanan dan penggunaan harian dengan dukungan fast charging.','https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=900&q=80',array[]::text[],null,array['20000mAh','Fast charging','Multi port'],249000,329000,'https://shopee.co.id/','Shopee','Rekomendasi',4.8,7200,false,true,7),
    (sid,(select id from public.categories where store_id=sid and slug='fashion'),'Tas Ransel Urban Minimalis','tas-ransel-urban','Ransel minimalis untuk kerja, kampus, dan traveling.','Kompartemen praktis dengan desain clean untuk aktivitas sehari-hari.','https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',array[]::text[],null,array['Kompartemen luas','Desain minimalis','Nyaman dipakai'],189000,259000,'https://shopee.co.id/','Shopee','New',4.7,3400,false,true,8),
    (sid,(select id from public.categories where store_id=sid and slug='kecantikan'),'Sunscreen SPF50 Lightweight','sunscreen-spf50','Sunscreen ringan untuk perlindungan harian.','Tekstur ringan dan praktis digunakan sebelum beraktivitas di luar ruangan.','https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=900&q=80',array[]::text[],null,array['SPF50','Tekstur ringan','Daily use'],99000,139000,'https://shopee.co.id/','Shopee','Best Seller',4.9,18700,false,true,9),
    (sid,(select id from public.categories where store_id=sid and slug='rumah-tangga'),'Vacuum Cleaner Portable','vacuum-cleaner-portable','Vacuum portable untuk meja, sofa, dan mobil.','Desain compact untuk membersihkan debu ringan di rumah maupun kendaraan.','https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=900&q=80',array[]::text[],null,array['Portable','Mudah disimpan','Serbaguna'],229000,299000,'https://shopee.co.id/','Shopee','Viral',4.7,6100,false,true,10),
    (sid,(select id from public.categories where store_id=sid and slug='olahraga'),'Botol Minum Sport 1 Liter','botol-minum-sport','Botol minum besar untuk olahraga dan aktivitas harian.','Kapasitas 1 liter dengan desain simpel dan mudah dibawa.','https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80',array[]::text[],null,array['Kapasitas 1L','BPA free style','Travel friendly'],79000,99000,'https://shopee.co.id/','Shopee','Pilihan',4.8,5300,false,true,11),
    (sid,(select id from public.categories where store_id=sid and slug='elektronik'),'Mechanical Keyboard RGB','mechanical-keyboard-rgb','Keyboard mekanikal RGB untuk kerja dan gaming.','Layout nyaman dengan pencahayaan RGB untuk setup desktop modern.','https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80',array[]::text[],null,array['Mechanical switch','RGB lighting','Compact layout'],349000,459000,'https://shopee.co.id/','Shopee','Best Seller',4.9,9600,false,true,12),
    (sid,(select id from public.categories where store_id=sid and slug='fashion'),'Jam Tangan Minimalis','jam-tangan-minimalis','Jam tangan clean untuk gaya casual dan formal.','Desain minimalis dengan dial sederhana dan strap nyaman.','https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80',array[]::text[],null,array['Desain clean','Cocok casual/formal','Strap nyaman'],179000,249000,'https://shopee.co.id/','Shopee','Rekomendasi',4.8,4200,false,true,13),
    (sid,(select id from public.categories where store_id=sid and slug='perlengkapan-bayi'),'Baby Feeding Set Silicone','baby-feeding-set','Set perlengkapan makan bayi berbahan silicone.','Perlengkapan makan bayi praktis untuk menemani fase belajar makan.','https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?auto=format&fit=crop&w=900&q=80',array[]::text[],null,array['Set lengkap','Mudah dibersihkan','Warna lembut'],149000,199000,'https://shopee.co.id/','Shopee','New',4.8,2700,false,true,14),
    (sid,(select id from public.categories where store_id=sid and slug='olahraga'),'Yoga Mat Premium Anti Slip','yoga-mat-premium','Matras yoga anti slip untuk workout di rumah.','Permukaan nyaman dan mudah digulung untuk penyimpanan.','https://images.unsplash.com/photo-1599447292180-45fd84092ef4?auto=format&fit=crop&w=900&q=80',array[]::text[],null,array['Anti slip','Nyaman','Mudah digulung'],139000,189000,'https://shopee.co.id/','Shopee','Pilihan',4.8,3900,false,true,15),
    (sid,(select id from public.categories where store_id=sid and slug='otomotif'),'Car Phone Holder Dashboard','car-phone-holder','Holder smartphone untuk dashboard mobil.','Memudahkan navigasi dan penggunaan smartphone secara lebih rapi di kendaraan.','https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80',array[]::text[],null,array['Grip kuat','Adjustable','Mudah dipasang'],69000,99000,'https://shopee.co.id/','Shopee','Viral',4.7,8400,false,true,16),
    (sid,(select id from public.categories where store_id=sid and slug='makanan'),'Kopi Arabica Premium 250g','kopi-arabica-premium','Biji kopi arabica pilihan untuk seduhan harian.','Aroma kopi nikmat untuk manual brew maupun mesin kopi rumahan.','https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',array[]::text[],null,array['Arabica pilihan','Fresh roast style','Cocok manual brew'],95000,125000,'https://shopee.co.id/','Shopee','Best Seller',4.9,11300,false,true,17),
    (sid,(select id from public.categories where store_id=sid and slug='elektronik'),'Laptop Stand Aluminium Adjustable','laptop-stand-aluminium','Stand laptop adjustable untuk meja kerja ergonomis.','Membantu posisi layar lebih nyaman dengan desain aluminium minimalis.','https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80',array[]::text[],null,array['Adjustable','Aluminium','Setup lebih rapi'],169000,229000,'https://shopee.co.id/','Shopee','Rekomendasi',4.8,4900,false,true,18),
    (sid,(select id from public.categories where store_id=sid and slug='rumah-tangga'),'Lampu Meja LED Minimalis','lampu-meja-led','Lampu meja LED modern untuk kerja dan belajar.','Pencahayaan meja yang praktis dengan desain minimalis untuk ruang kerja.','https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80',array[]::text[],null,array['LED hemat energi','Desain modern','Cocok meja kerja'],129000,179000,'https://shopee.co.id/','Shopee','New',4.7,3100,false,true,19),
    (sid,(select id from public.categories where store_id=sid and slug='fashion'),'Kacamata Sunglasses Classic','kacamata-sunglasses','Sunglasses classic untuk melengkapi gaya harian.','Frame ringan dengan desain timeless untuk berbagai gaya outfit.','https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80',array[]::text[],null,array['Frame ringan','Desain classic','Unisex style'],99000,149000,'https://shopee.co.id/','Shopee','Trending',4.8,6800,false,true,20);
  end if;
end $$;
