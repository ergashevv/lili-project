import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { transliterate } from '@/lib/transliterate'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  // If no query or very short query, return latest products as "trending" or "new"
  if (!query || query.trim().length < 2) {
    try {
      const latestProducts = await prisma.product.findMany({
        where: { isActive: true },
        select: {
          id: true,
          slug: true,
          nameUz: true,
          nameRu: true,
          price: true,
          primaryImage: true,
        },
        orderBy: { createdAt: 'desc' },
        take: 8,
      })
      return NextResponse.json(latestProducts)
    } catch (error) {
      console.error('Search API (trending) error:', error)
      return NextResponse.json([])
    }
  }

  const terms = query.trim().toLowerCase().split(/\s+/)
  console.log('Search API querying for terms:', terms)

  try {
    const products = await prisma.product.findMany({
      where: {
        AND: terms.map(term => ({
          OR: transliterate(term).flatMap(variation => [
            { nameUz: { contains: variation, mode: 'insensitive' } },
            { nameRu: { contains: variation, mode: 'insensitive' } },
            { descriptionUz: { contains: variation, mode: 'insensitive' } },
            { descriptionRu: { contains: variation, mode: 'insensitive' } },
            { slug: { contains: variation, mode: 'insensitive' } },
          ])
        })),
        isActive: true,
      },
      select: {
        id: true,
        slug: true,
        nameUz: true,
        nameRu: true,
        price: true,
        primaryImage: true,
        categoryId: true,
        category: {
          select: {
            nameUz: true,
            nameRu: true,
          }
        }
      },
      take: 24,
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
