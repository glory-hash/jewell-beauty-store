import { createContext, useContext } from 'react'
import type { Product } from '../types'

export type ProductsContextType = {
  products: Product[]
  categories: string[]
  refresh: () => void
  getById: (id: string) => Product | undefined
}

export const ProductsContext = createContext<ProductsContextType>({
  products: [],
  categories: [],
  refresh: () => {},
  getById: () => undefined
})

export function useProducts() {
  return useContext(ProductsContext)
}