import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface Product {
  id: string
  name: string
  price: number
  color: string
}

interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
  total: number
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  increaseQuantity: (productId: string) => void
  decreaseQuantity: (productId: string) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      addItem: (product) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id)
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
              ),
              total: state.total + product.price,
            }
          } else {
            return {
              items: [...state.items, { ...product, quantity: 1 }],
              total: state.total + product.price,
            }
          }
        })
      },
      removeItem: (productId) => {
        set((state) => {
          const itemToRemove = state.items.find((item) => item.id === productId)
          if (itemToRemove) {
            return {
              items: state.items.filter((item) => item.id !== productId),
              total: state.total - (itemToRemove.price * itemToRemove.quantity),
            }
          }
          return state
        })
      },
      increaseQuantity: (productId) => {
        set((state) => {
          const updatedItems = state.items.map((item) =>
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
          )
          const newTotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
          return { items: updatedItems, total: newTotal }
        })
      },
      decreaseQuantity: (productId) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === productId)
          if (existingItem && existingItem.quantity > 1) {
            const updatedItems = state.items.map((item) =>
              item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
            )
            const newTotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
            return { items: updatedItems, total: newTotal }
          } else if (existingItem && existingItem.quantity === 1) {
            // Remove item if quantity becomes 0
            return {
              items: state.items.filter((item) => item.id !== productId),
              total: state.total - existingItem.price,
            }
          }
          return state
        })
      },
      clearCart: () => set({ items: [], total: 0 }),
    }),
    {
      name: 'cart-storage', // unique name
      storage: createJSONStorage(() => localStorage), // use localStorage for persistence
    }
  )
)
