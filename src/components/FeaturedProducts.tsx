'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ProductCard } from './ProductCard'

type Product = {
  id: string
  slug: string
  nameUz: string
  nameRu: string
  price: number
  primaryImage: string | null
  isActive: boolean
  categoryId: string
  subCategoryId: string | null
  images: string[]
  createdAt: Date
  updatedAt: Date
  descriptionUz: string | null
  descriptionRu: string | null
}
import { useI18n } from '@/lib/i18n'
import styles from './FeaturedProducts.module.css'

export function FeaturedProducts({ products }: { products: Product[] }) {
  const { t } = useI18n()

  if (!products || products.length === 0) return null

  return (
    <section className={styles.section}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <span className={styles.tagline}>{t('home.featured.tagline')}</span>
          <h2 className={styles.title}>{t('home.featured.title')}</h2>
          <div className={styles.divider}></div>
        </motion.div>

        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
