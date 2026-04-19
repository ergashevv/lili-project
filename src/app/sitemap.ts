import type { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

const siteUrl = 'https://www.simpatiya.uz'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, products] = await Promise.all([
    prisma.category.findMany({
      where: { isActive: true },
    }),
    prisma.product.findMany({
      where: { isActive: true },
    }),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/categories',
    '/login',
    '/signup',
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }))

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${siteUrl}/categories/${category.slug}`,
    lastModified: category.updatedAt,
  }))

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteUrl}/product/${product.slug}`,
    lastModified: product.updatedAt,
  }))

  return [...staticRoutes, ...categoryRoutes, ...productRoutes]
}

