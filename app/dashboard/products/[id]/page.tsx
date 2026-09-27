import ProductForm from '@/components/ProductForm'
export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params;return <div><div className="dashHeader"><div><span className="eyebrow">EDIT PRODUK</span><h1>Edit Produk</h1><p>Perbarui informasi dan link affiliate.</p></div></div><ProductForm id={id}/></div>}
