import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const idsString = searchParams.get('ids')

  if (!idsString) {
    return NextResponse.json([], { status: 200 })
  }

  const ids = idsString.split(',').filter(Boolean)

  try {
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: ids
        }
      },
      select: {
        id: true,
        nameUz: true,
        nameRu: true,
        slug: true,
        price: true,
        primaryImage: true,
      }
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching batch products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}
