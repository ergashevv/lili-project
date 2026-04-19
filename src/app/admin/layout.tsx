'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { logout } from '@/app/actions/auth'
import styles from './AdminLayout.module.css'
import { Home, Layers, ShoppingBag, ListOrdered, LogOut } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>SIMPATY</div>
        
        <nav className={styles.nav}>
          <Link href="/admin" className={styles.navLink}>
            <Home size={18} /> Dashboard
          </Link>
          <Link href="/admin/categories" className={styles.navLink}>
            <Layers size={18} /> Kategoriyalar
          </Link>
          <Link href="/admin/products" className={styles.navLink}>
            <ShoppingBag size={18} /> Mahsulotlar
          </Link>
          <Link href="/admin/orders" className={styles.navLink}>
            <ListOrdered size={18} /> Buyurtmalar
          </Link>
        </nav>
        
        <div className={styles.footer}>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <LogOut size={18} /> Chiqish
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}
