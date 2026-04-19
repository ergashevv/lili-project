'use server'

import prisma from '@/lib/prisma'

export async function getCategories() {
  const categories = await prisma.category.findMany({
    select: { id: true, nameUz: true },
    orderBy: { nameUz: 'asc' }
  })
  return categories
}
