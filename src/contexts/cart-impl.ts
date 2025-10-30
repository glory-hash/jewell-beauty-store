import { createContext, useContext } from 'react'
import type { Product } from '../types'

export type CartContextType = {
  items: Array<{
    product: Product
    quantity: number
  }>
  total: number
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  setQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextType>({
  items: [],
  total: 0,
  addItem: () => {},
  removeItem: () => {},
  setQuantity: () => {},
  clearCart: () => {}
})

export function useCart() {
  return useContext(CartContext)
}
