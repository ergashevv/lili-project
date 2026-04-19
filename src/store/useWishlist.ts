import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WishlistStore {
  items: string[] // Array of product IDs or slugs
  toggleItem: (productId: string) => void
  isWishlisted: (productId: string) => boolean
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (productId) => {
        const items = get().items
        if (items.includes(productId)) {
          set({ items: items.filter((id) => id !== productId) })
        } else {
          set({ items: [...items, productId] })
        }
      },
      isWishlisted: (productId) => get().items.includes(productId),
    }),
    {
      name: 'simpaty-wishlist',
    }
  )
)
