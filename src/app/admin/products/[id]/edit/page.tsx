import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import EditProductClient from './EditProductClient'

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id: params.id } }),
    prisma.category.findMany({ select: { id: true, nameUz: true }, orderBy: { nameUz: 'asc' } })
  ])
  
  if (!product) notFound()

  return <EditProductClient product={product} categories={categories} />
}
