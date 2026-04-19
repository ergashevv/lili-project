'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { OrderStatus } from '@prisma/client'

// ─── CATEGORY ACTIONS ────────────────────────────────────────────────────────

export async function saveCategory(formData: FormData) {
  const id = formData.get('id') as string | null
  const nameUz = formData.get('nameUz') as string
  const nameRu = formData.get('nameRu') as string
  const slug = formData.get('slug') as string
  const imageUrl = formData.get('imageUrl') as string
  const mainColor = formData.get('mainColor') as string
  const secondaryColor = formData.get('secondaryColor') as string

  if (!nameUz || !slug) return { error: "Majburiy maydonlar: Nomi va Slug" }

  if (id) {
    // UPDATE
    await prisma.category.update({
      where: { id },
      data: { nameUz, nameRu, imageUrl, mainColor, secondaryColor, slug }
    })
  } else {
    // CREATE
    await prisma.category.upsert({
      where: { slug },
      update: { nameUz, nameRu, imageUrl, mainColor, secondaryColor },
      create: { slug, nameUz, nameRu, imageUrl, mainColor, secondaryColor }
    })
  }

  revalidatePath('/admin/categories')
  revalidatePath('/')
  return { success: true }
}

export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({ where: { id } })
    revalidatePath('/admin/categories')
    revalidatePath('/')
    return { success: true }
  } catch {
    return { error: "Kategoriyani o'chirishda xatolik. Avval mahsulotlarni o'chiring." }
  }
}

// ─── PRODUCT ACTIONS ─────────────────────────────────────────────────────────

export async function saveProduct(formData: FormData) {
  const id = formData.get('id') as string | null
  const nameUz = formData.get('nameUz') as string
  const nameRu = formData.get('nameRu') as string
  const slug = formData.get('slug') as string
  const descriptionUz = formData.get('descriptionUz') as string
  const descriptionRu = formData.get('descriptionRu') as string
  const categoryId = formData.get('categoryId') as string
  const price = parseFloat(formData.get('price') as string)
  const primaryImage = formData.get('primaryImage') as string
  const isActiveRaw = formData.get('isActive') as string
  const isActive = isActiveRaw === 'true'
  
  const colorsRaw = formData.get('colors') as string
  const sizesRaw = formData.get('sizes') as string
  
  const colors = colorsRaw ? colorsRaw.split(',').map(s => s.trim()).filter(Boolean) : []
  const sizes = sizesRaw ? sizesRaw.split(',').map(s => s.trim()).filter(Boolean) : []

  if (!nameUz || !slug || !categoryId || isNaN(price)) {
    return { error: "Majburiy maydonlar: Nomi, Slug, Kategoriya va Narx" }
  }

  if (id) {
    // UPDATE
    await prisma.product.update({
      where: { id },
      data: { nameUz, nameRu, descriptionUz, descriptionRu, price, primaryImage, categoryId, isActive, slug, colors, sizes }
    })
  } else {
    // CREATE
    await prisma.product.upsert({
      where: { slug },
      update: { nameUz, nameRu, descriptionUz, descriptionRu, price, primaryImage, categoryId, isActive, colors, sizes },
      create: { slug, nameUz, nameRu, descriptionUz, descriptionRu, price, primaryImage, categoryId, images: [], isActive, colors, sizes }
    })
  }

  revalidatePath('/admin/products')
  revalidatePath('/')
  revalidatePath('/categories/[slug]', 'page')
  revalidatePath(`/categories/${categoryId}`) // If product details are fetched via category
  return { success: true }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({ where: { id } })
    revalidatePath('/admin/products')
    revalidatePath('/')
    return { success: true }
  } catch {
    return { error: "Mahsulotni o'chirishda xatolik." }
  }
}

// ─── ORDER ACTIONS ───────────────────────────────────────────────────────────

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  await prisma.order.update({
    where: { id: orderId },
    data: { status }
  })
  revalidatePath('/admin/orders')
  return { success: true }
}

export async function deleteOrder(id: string) {
  try {
    await prisma.order.delete({ where: { id } })
    revalidatePath('/admin/orders')
    return { success: true }
  } catch {
    return { error: "Buyurtmani o'chirishda xatolik." }
  }
}
