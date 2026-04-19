'use client'

import React from 'react'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import styles from './Header.module.css'
import { User, Search, Heart, ShoppingBag } from 'lucide-react'
import { SearchModal } from './SearchModal'
import { getUser } from '@/app/actions/auth'
import { useCart } from '@/store/useCart'
import { useWishlist } from '@/store/useWishlist'

export function Header() {
  const { t, lang, setLang } = useI18n()
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)
  const [user, setUser] = React.useState<{ name: string | null; role: string } | null>(null)
  
  const cartCount = useCart(state => state.totalItems())
  const wishlistCount = useWishlist(state => state.items.length)

  React.useEffect(() => {
    async function checkUser() {
      const userData = await getUser()
      setUser(userData)
    }
    checkUser()
  }, [])

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link
          href="/"
          className={styles.logo}
          aria-label="Simpaty"
        >
          <img
            src="/logo-simpaty.svg"
            alt="Simpaty"
            width={140}
            height={36}
            className={styles.logoImage}
          />
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>{t('nav.home')}</Link>
          <Link href="/categories" className={styles.navLink}>{t('nav.categories')}</Link>
          <Link href="/about" className={styles.navLink}>{t('nav.about')}</Link>
          <Link href="/delivery" className={styles.navLink}>{t('nav.delivery')}</Link>
          <Link href="/contacts" className={styles.navLink}>{t('nav.contacts')}</Link>
        </nav>
        <div className={styles.actions}>
          <button 
            className={styles.langBtn} 
            onClick={() => setLang(lang === 'uz' ? 'ru' : 'uz')}
          >
            {lang.toUpperCase()}
          </button>
          
          <button 
            className={styles.iconBtn} 
            onClick={() => setIsSearchOpen(true)}
            aria-label={t('nav.search')}
          >
            <Search size={20} />
          </button>

          <Link 
            href="/wishlist" 
            className={styles.iconBtn} 
            aria-label={t('nav.wishlist')}
          >
            <Heart size={20} />
            {wishlistCount > 0 && <span className={styles.badge}>{wishlistCount}</span>}
          </Link>

          <Link 
            href="/cart"
            className={styles.iconBtn} 
            aria-label={t('nav.cart')}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </Link>

          <Link 
            href={user ? "/profile" : "/login"} 
            className={styles.iconBtn} 
            aria-label={user ? t('profile.title') : t('nav.login')}
          >
            <User size={20} />
            {user && user.role === 'ADMIN' && <span className={styles.adminBadge}>Admin</span>}
          </Link>
        </div>
      </div>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  )
}
