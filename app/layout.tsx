import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = { title: 'AffiOne — One Store for Every Affiliate Product.', description: 'Buat toko affiliate sendiri dan kumpulkan semua produk affiliate dalam satu link.' }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="id"><body>{children}</body></html> }
