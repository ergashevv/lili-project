import React from 'react'
import { Hero } from '@/components/Hero'
import { CategoryList } from '@/components/CategoryList'
import { FeaturedProducts } from '@/components/FeaturedProducts'
import { BrandStory } from '@/components/BrandStory'
import { Features } from '@/components/Features'
import prisma from '@/lib/prisma'

export default async function HomePage() {
  const [categories, featuredProducts] = await Promise.all([
    prisma.category.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'asc' },
    }),
    prisma.product.findMany({
      where: { isActive: true },
      take: 8,
      orderBy: { createdAt: 'desc' },
    })
  ])

  return (
    <div>
      <Hero />
      
      <section className="container" style={{ padding: '6rem 1rem 2rem' }}>
        <CategoryList categories={categories} />
      </section>
      
      <FeaturedProducts products={featuredProducts} />
      
      <BrandStory />
      
      <Features />
    </div>
  )
}
