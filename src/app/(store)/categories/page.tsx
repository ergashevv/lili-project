import React from 'react'
import type { Metadata } from 'next'
import prisma from '@/lib/prisma'
import styles from './CategoriesListPage.module.css'
import { CategoryGrid, CategoriesPageHeader } from './CategoryGrid'

export const metadata: Metadata = {
  title: 'Категории женской одежды | Simpaty',
  description:
    'Все категории премиальной женской одежды Simpaty: вечерние платья, деловой стиль, весенние коллекции и элегантные аксессуары.',
}

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'asc' },
    include: {
      _count: { select: { products: { where: { isActive: true } } } },
    },
  })

  return (
    <main className={styles.page}>
      {/* Page Header — client component (uses i18n) */}
      <CategoriesPageHeader />

      {/* Categories Grid — client component (handles onError + i18n) */}
      <section className={styles.section}>
        <div className="container">
          <CategoryGrid categories={categories} />
        </div>
      </section>
    </main>
  )
}
