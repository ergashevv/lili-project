import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import { Product } from '@prisma/client'
import { CategoryThemeSetter } from '@/components/CategoryThemeSetter'
import { ProductCard } from '@/components/ProductCard'
import { CategoryHeader } from './CategoryHeader'
import { CategoryEmptyState } from './CategoryEmptyState'
import styles from './CategoryPage.module.css'
import { CategoryControls } from '@/components/CategoryControls'

interface ExtendedProduct extends Product {
  colors: string[]
  sizes: string[]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = await prisma.category.findUnique({ where: { slug } })

  if (!category) {
    return {
      title: 'Категория не найдена | Simpaty',
      description: 'Запрошенная категория не найдена в каталоге Simpaty.',
    }
  }

  const titleRu = category.nameRu || category.nameUz
  const description =
    `Simpaty — категория «${titleRu}» с премиальной женской одеждой в Узбекистане. ` +
    'Выберите образ для особых случаев и на каждый diyan.'

  return {
    title: `${titleRu} | Simpaty`,
    description,
    openGraph: {
      title: `${titleRu} | Simpaty`,
      description,
      images: category.imageUrl
        ? [
            {
              url: category.imageUrl,
              alt: titleRu,
            },
          ]
        : undefined,
    },
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ sub?: string; color?: string; size?: string; sort?: string }>
}) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams

  const category = await prisma.category.findUnique({
    where: { slug: resolvedParams.slug },
    include: {
      subCategories: true,
      products: {
        where: { isActive: true },
      },
    },
  })

  if (!category) {
    notFound()
  }

  const products = category.products as unknown as ExtendedProduct[]

  // Extract all available colors and sizes for the controls
  const allColors = Array.from(new Set(products.flatMap((p) => p.colors || [])))
  const allSizes = Array.from(new Set(products.flatMap((p) => p.sizes || [])))

  // Filtration logic
  let filteredProducts = [...products]

  if (resolvedSearchParams.sub) {
    const sub = category.subCategories.find((s) => s.slug === resolvedSearchParams.sub)
    if (sub) {
      filteredProducts = filteredProducts.filter((p) => p.subCategoryId === sub.id)
    }
  }

  if (resolvedSearchParams.color) {
    filteredProducts = filteredProducts.filter((p) =>
      p.colors.includes(resolvedSearchParams.color!)
    )
  }

  if (resolvedSearchParams.size) {
    filteredProducts = filteredProducts.filter((p) => p.sizes.includes(resolvedSearchParams.size!))
  }

  // Sorting logic
  if (resolvedSearchParams.sort === 'price_asc') {
    filteredProducts.sort((a, b) => a.price - b.price)
  } else if (resolvedSearchParams.sort === 'price_desc') {
    filteredProducts.sort((a, b) => b.price - a.price)
  } else {
    // default: newest
    filteredProducts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  return (
    <div className={styles.page}>
      <CategoryThemeSetter
        primary={category.mainColor || '#800020'}
        secondary={category.secondaryColor || '#d4af37'}
      />

      {/* Hero banner */}
      <div className={styles.hero}>
        <div
          className={styles.heroImage}
          style={{ backgroundImage: category.imageUrl ? `url(${category.imageUrl})` : 'none' }}
        />
        <div className={styles.overlay} />
        <CategoryHeader
          nameUz={category.nameUz}
          nameRu={category.nameRu}
          productCount={filteredProducts.length}
        />
      </div>

      {/* Controls Bar */}
      <CategoryControls
        colors={allColors}
        sizes={allSizes}
        subCategories={category.subCategories.map((s) => ({
          slug: s.slug,
          nameUz: s.nameUz,
          nameRu: s.nameRu,
        }))}
      />

      {/* Products */}
      <div className={`container ${styles.content}`}>
        {filteredProducts.length > 0 ? (
          <div className={styles.grid}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <CategoryEmptyState />
        )}
      </div>
    </div>
  )
}

