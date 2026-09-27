-- AffiOne v1.0.6 - category custom icon/image support
-- Existing database upgrade. Aman: tidak reset dan tidak menghapus data.

alter table public.categories add column if not exists icon_type text not null default 'default';
alter table public.categories add column if not exists icon_name text default 'bag';
alter table public.categories add column if not exists icon_image_url text;

update public.categories set icon_type='default' where icon_type is null or icon_type not in ('default','upload');
update public.categories set icon_name=case
  when slug ilike '%elektr%' then 'electronics'
  when slug ilike '%fashion%' then 'fashion'
  when slug ilike '%cantik%' then 'beauty'
  when slug ilike '%rumah%' then 'home'
  when slug ilike '%bayi%' then 'baby'
  when slug ilike '%olahraga%' then 'sport'
  when slug ilike '%otomotif%' then 'auto'
  when slug ilike '%makan%' then 'food'
  else coalesce(icon_name,'bag')
end
where icon_name is null or icon_name='bag';

alter table public.categories drop constraint if exists categories_icon_type_check;
alter table public.categories add constraint categories_icon_type_check check (icon_type in ('default','upload'));

grant select on table public.categories to anon, authenticated;
grant insert, update, delete on table public.categories to authenticated;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('category-icons','category-icons',true,3145728,array['image/png','image/jpeg','image/webp','image/gif','image/svg+xml'])
on conflict(id) do update set public=true,file_size_limit=excluded.file_size_limit,allowed_mime_types=excluded.allowed_mime_types;

drop policy if exists "category icons public read" on storage.objects;
create policy "category icons public read" on storage.objects for select using(bucket_id='category-icons');
drop policy if exists "category icons auth upload" on storage.objects;
create policy "category icons auth upload" on storage.objects for insert to authenticated with check(bucket_id='category-icons');
drop policy if exists "category icons auth update" on storage.objects;
create policy "category icons auth update" on storage.objects for update to authenticated using(bucket_id='category-icons') with check(bucket_id='category-icons');
drop policy if exists "category icons auth delete" on storage.objects;
create policy "category icons auth delete" on storage.objects for delete to authenticated using(bucket_id='category-icons');
