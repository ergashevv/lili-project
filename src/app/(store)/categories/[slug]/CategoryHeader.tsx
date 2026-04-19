'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import styles from './CategoryPage.module.css'

type Props = {
  nameUz: string
  nameRu: string
  productCount: number
}

export function CategoryHeader({ nameUz, nameRu, productCount }: Props) {
  const { lang, t } = useI18n()

  const name = lang === 'uz' ? nameUz : nameRu
  const countLabel = lang === 'uz'
    ? `${productCount} ta mahsulot`
    : `${productCount} товаров`

  return (
    <div className={`container ${styles.headerContent}`}>
      <motion.nav 
        className={styles.breadcrumb}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Link href="/" className={styles.breadcrumbLink}>{t('category.breadcrumb.home')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <Link href="/categories" className={styles.breadcrumbLink}>{t('category.breadcrumb.categories')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span className={styles.activeBreadcrumb}>{name}</span>
      </motion.nav>

      <motion.h1 
        className={styles.title}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {name}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <span className={styles.productCount}>{countLabel}</span>
      </motion.div>
    </div>
  )
}
