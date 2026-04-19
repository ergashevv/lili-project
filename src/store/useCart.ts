import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image: string
  color?: string
  size?: string
  slug: string
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  totalItems: () => number
  totalPrice: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) => {
        const items = get().items
        const existingItemIndex = items.findIndex(
          (item) => 
            item.productId === newItem.productId && 
            item.color === newItem.color && 
            item.size === newItem.size
        )

        if (existingItemIndex > -1) {
          const newItems = items.map((item, idx) => 
            idx === existingItemIndex 
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          )
          set({ items: newItems })
        } else {
          // Generate a unique ID for the cart item entry
          const itemWithId = { 
            ...newItem, 
            id: `${newItem.productId}-${newItem.color || 'none'}-${newItem.size || 'none'}` 
          }
          set({ items: [...items, itemWithId] })
        }
      },
      removeItem: (itemId) => {
        set({ items: get().items.filter((i) => i.id !== itemId) })
      },
      updateQuantity: (itemId, quantity) => {
        if (quantity < 1) return
        const newItems = get().items.map((i) => 
          i.id === itemId ? { ...i, quantity } : i
        )
        set({ items: newItems })
      },
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
      totalPrice: () => get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    {
      name: 'simpaty-cart',
    }
  )
)
