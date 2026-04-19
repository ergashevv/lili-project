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
      title: 'Mahsulot topilmadi | Lili',
      description: 'So‘ralgan mahsulot Lili katalogida topilmadi.',
    }
  }

  const nameRu = product.nameRu || product.nameUz
  const description =
    product.descriptionRu ||
    product.descriptionUz ||
    `Lili ning premium liboslari va ayollar kiyimi, ${product.category.nameRu || product.category.nameUz} kategoriyasida.`

  const image = product.primaryImage || product.images[0]

  return {
    title: `${nameRu} | Lili`,
    description,
    openGraph: {
      title: `${nameRu} | Lili`,
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
