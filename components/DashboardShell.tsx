'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { getBrowserSupabase } from '@/lib/supabase'
import Logo from './Logo'

const nav = [
  ['/dashboard','Overview','⌂'],
  ['/dashboard/products','Produk','▦'],
  ['/dashboard/categories','Kategori','◫'],
  ['/dashboard/store','Tampilan Toko','✦'],
  ['/dashboard/analytics','Analytics','↗'],
  ['/dashboard/guide','Panduan','?']
]

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); const router = useRouter()
  async function logout(){ await getBrowserSupabase().auth.signOut(); router.replace('/login') }
  return <div className="dashLayout">
    <aside className="sidebar">
      <div className="sideLogo"><Logo /></div>
      <nav>{nav.map(([href,label,icon]) => <Link key={href} href={href} className={pathname===href || (href!='/dashboard' && pathname.startsWith(href)) ? 'active' : ''}><span>{icon}</span>{label}</Link>)}</nav>
      <button className="logoutBtn" onClick={logout}>↪ Keluar</button>
    </aside>
    <main className="dashMain">{children}</main>
    <nav className="mobileNav">{nav.slice(0,5).map(([href,label,icon]) => <Link key={href} href={href} className={pathname===href || (href!='/dashboard' && pathname.startsWith(href)) ? 'active' : ''}><span>{icon}</span><small>{label}</small></Link>)}</nav>
  </div>
}
