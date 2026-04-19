'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, Trash2 } from 'lucide-react'
import { useWishlist } from '@/store/useWishlist'
import { useI18n } from '@/lib/i18n'
import Image from 'next/image'
import styles from './WishlistPage.module.css'

interface Product {
  id: string
  nameUz: string
  nameRu: string
  slug: string
  price: number
  primaryImage: string
}

export default function WishlistPage() {
  const { items: wishlistIds, toggleItem } = useWishlist()
  const { lang, t } = useI18n()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchWishlistProducts() {
      if (wishlistIds.length === 0) {
        setProducts([])
        setLoading(false)
        return
      }

      try {
        // Fetch products by IDs
        const res = await fetch(`/api/products/batch?ids=${wishlistIds.join(',')}`)
        if (res.ok) {
          const data = await res.json()
          setProducts(data)
        }
      } catch (error) {
        console.error('Failed to fetch wishlist products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchWishlistProducts()
  }, [wishlistIds])

  if (loading) {
    return <div className={styles.loading}>{t('common.loading')}</div>
  }

  return (
    <div className={`container ${styles.container}`}>
      <h1 className={styles.title}>{t('nav.wishlist')}</h1>
      
      {products.length === 0 ? (
        <div className={styles.empty}>
          <Heart size={48} className={styles.emptyIcon} />
          <p>{t('wishlist.empty') || "Sizga yoqqan mahsulotlar hozircha yo'q"}</p>
          <Link href="/categories" className={styles.shopBtn}>
            {t('home.hero.cta')}
          </Link>
        </div>
      ) : (
        <div className={styles.grid}>
          {products.map((product) => (
            <motion.div 
              key={product.id} 
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Link href={`/product/${product.slug}`} className={styles.imageWrapper}>
                <Image 
                  src={product.primaryImage} 
                  alt={lang === 'uz' ? product.nameUz : product.nameRu}
                  width={400}
                  height={533}
                  className={styles.image}
                />
              </Link>
              <div className={styles.info}>
                <h3 className={styles.productName}>
                  {lang === 'uz' ? product.nameUz : product.nameRu}
                </h3>
                <p className={styles.price}>
                  {new Intl.NumberFormat(lang === 'uz' ? 'uz-UZ' : 'ru-RU', {
                    style: 'currency',
                    currency: 'UZS',
                    minimumFractionDigits: 0,
                  }).format(product.price)}
                </p>
                <div className={styles.actions}>
                  <button 
                    className={styles.removeBtn}
                    onClick={() => toggleItem(product.id)}
                  >
                    <Trash2 size={18} />
                    <span>{t('filter.clear') || "O'chirish"}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
