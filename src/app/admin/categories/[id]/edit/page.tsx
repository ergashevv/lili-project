import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import EditCategoryClient from './EditCategoryClient'

export default async function EditCategoryPage({ params }: { params: { id: string } }) {
  const category = await prisma.category.findUnique({ where: { id: params.id } })
  if (!category) notFound()

  return <EditCategoryClient category={category} />
}
