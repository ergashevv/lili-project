'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import styles from './CategoryList.module.css'
import { Category } from '@prisma/client'

export function CategoryList({ categories }: { categories: Category[] }) {
  const { lang, t } = useI18n()

  if (!categories || categories.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>{t('categories.all')}</h2>
        <p>Hozircha kategoriyalar yo&apos;q</p>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {categories.map((category) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <Link 
              href={`/categories/${category.slug}`} 
              className={styles.card}
            >
              <div className={styles.imageWrapper}>
                <img 
                  src={category.imageUrl || 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=60&w=900&auto=format&fit=crop'} 
                  alt={lang === 'uz' ? category.nameUz : category.nameRu} 
                  className={styles.image}
                  loading="lazy"
                />
                <div className={styles.overlay} />
              </div>
              
              <div className={styles.content}>
                <h3 className={styles.name}>
                  {lang === 'uz' ? category.nameUz : category.nameRu}
                </h3>
                <span className={styles.shopNow}>{t('category.shopNow') || 'Shop Now'}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
