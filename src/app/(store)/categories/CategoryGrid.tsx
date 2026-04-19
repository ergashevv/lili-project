'use client'

import React from 'react'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { motion } from 'framer-motion'
import styles from './CategoriesListPage.module.css'

const PLACEHOLDER =
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=60&w=900&auto=format&fit=crop'

type Category = {
  id: string
  slug: string
  nameUz: string
  nameRu: string
  imageUrl: string | null
  mainColor: string | null
  _count: { products: number }
}

export function CategoryGrid({ categories }: { categories: Category[] }) {
  const { lang, t } = useI18n()

  if (categories.length === 0) {
    return (
      <div className={styles.empty}>
        <p>{lang === 'uz' ? "Hozircha kategoriyalar yo'q." : 'Категории пока недоступны.'}</p>
        <Link href="/" className={styles.backBtn}>
          {lang === 'uz' ? 'Bosh sahifaga qaytish' : 'На главную'}
        </Link>
      </div>
    )
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  }

  return (
    <motion.div 
      className={styles.grid}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {categories.map((category) => {
        const name = lang === 'uz' ? category.nameUz : category.nameRu
        const countLabel = lang === 'uz'
          ? `${category._count.products} ta mahsulot`
          : `${category._count.products} ${t('category.products')}`

        return (
          <motion.div key={category.id} variants={item}>
            <Link
              href={`/categories/${category.slug}`}
              className={styles.card}
            >
              <div className={styles.imageWrapper}>
                <motion.img
                  src={category.imageUrl || PLACEHOLDER}
                  alt={name}
                  className={styles.image}
                  loading="lazy"
                />
                <div className={styles.overlay} />
              </div>
              <div className={styles.content}>
                <h2 className={styles.name}>{name}</h2>
                <span className={styles.count}>{countLabel}</span>
              </div>
            </Link>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export function CategoriesPageHeader() {
  const { t } = useI18n()

  return (
    <div className={styles.header}>
      <div className="container">
        <motion.span 
          className={styles.tagline}
          initial={{ opacity: 0, letterSpacing: '0px' }}
          animate={{ opacity: 0.8, letterSpacing: '4px' }}
          transition={{ duration: 1 }}
        >
          Simpaty Collection
        </motion.span>
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t('categories.all')}
        </motion.h1>
      </div>
    </div>
  )
}
