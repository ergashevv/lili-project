import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import { ProductDetails } from './ProductDetails'
import { CategoryThemeSetter } from '@/components/CategoryThemeSetter'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  })

  if (!product) {
    return {
      title: 'Товар не найден | Simpaty',
      description: 'Запрошенный товар не найден в каталоге Simpaty.',
    }
  }

  const nameRu = product.nameRu || product.nameUz
  const description =
    product.descriptionRu ||
    product.descriptionUz ||
    `Премиальное платье и женская одежда Simpaty в категории ${product.category.nameRu || product.category.nameUz}.`

  const image = product.primaryImage || product.images[0]

  return {
    title: `${nameRu} | Simpaty`,
    description,
    openGraph: {
      title: `${nameRu} | Simpaty`,
      description,
      images: image
        ? [
            {
              url: image,
              alt: nameRu,
            },
          ]
        : undefined,
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params
  const product = await prisma.product.findUnique({
    where: { slug: resolvedParams.slug },
    include: { category: true },
  })

  if (!product) {
    notFound()
  }

  return (
    <>
      <CategoryThemeSetter
        primary={product.category.mainColor || '#800020'}
        secondary={product.category.secondaryColor || '#d4af37'}
      />
      <ProductDetails product={product} />
    </>
  )
}
