'use server'

import prisma from '@/lib/prisma'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'

interface CartOrderItem {
  productId: string
  quantity: number
  color?: string
  size?: string
}

interface DecodedSession {
  sub: string
  role: string
}

export async function placeOrder(formData: FormData) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    let session: DecodedSession | null = null
    
    if (token) {
      session = await verifyToken(token) as unknown as DecodedSession
    }

    const productId = formData.get('productId') as string
    const clientName = formData.get('clientName') as string
    const clientPhone = formData.get('clientPhone') as string
    const address = formData.get('address') as string
    const selectedColor = formData.get('selectedColor') as string
    const selectedSize = formData.get('selectedSize') as string

    if (!productId || !clientName || !clientPhone) {
      return { success: false, error: "Iltimos, barcha majburiy maydonlarni to'ldiring" }
    }

    await prisma.order.create({
      data: {
        productId,
        clientName,
        clientPhone,
        ...(session?.sub ? { userId: session.sub } : {}),
        ...(address ? { address } : {}),
        ...(selectedColor ? { selectedColor } : {}),
        ...(selectedSize ? { selectedSize } : {}),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any
    })

    return { success: true }
  } catch (error) {
    console.error('Order Error:', error)
    return { success: false, error: "Kutilmagan xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko'ring." }
  }
}

export async function placeCartOrder(formData: FormData) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    let session: DecodedSession | null = null
    
    if (token) {
      session = await verifyToken(token) as unknown as DecodedSession
    }

    const clientName = formData.get('clientName') as string
    const clientPhone = formData.get('clientPhone') as string
    const address = formData.get('address') as string
    const itemsJson = formData.get('items') as string
    
    if (!clientName || !clientPhone || !itemsJson) {
      return { success: false, error: "Iltimos, barcha majburiy maydonlarni to'ldiring" }
    }

    const items: CartOrderItem[] = JSON.parse(itemsJson)

    // Create an order for each item in the cart
    await prisma.$transaction(
      items.map((item) => 
        prisma.order.create({
          data: {
            productId: item.productId,
            clientName,
            clientPhone,
            notes: `Savatdan buyurtma. Miqdori: ${item.quantity || 1}`,
            ...(session?.sub ? { userId: session.sub } : {}),
            ...(address ? { address } : {}),
            ...(item.color ? { selectedColor: item.color } : {}),
            ...(item.size ? { selectedSize: item.size } : {}),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any
        })
      )
    )

    return { success: true }
  } catch (error) {
    console.error('Cart Order Error:', error)
    return { success: false, error: "Kutilmagan xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko'ring." }
  }
}
