import { useState, type ReactNode } from 'react'
// Context de produits
// Fournit la liste des produits, catégories calculées et helpers pour
// rafraîchir ou récupérer un produit par id. Les données sont actuellement
// chargées depuis `data/products.json` (fixture) pour simplifier le développement.
import type { Product } from '../types'
import { ProductsContext } from './products-impl'
import productsData from '../data/products.json'

export default function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(productsData.products)

  const categories = [...new Set(products.map(p => p.category || '').filter(Boolean))]

  const refresh = () => {
    setProducts(productsData.products)
  }

  const getById = (id: string) => {
    return products.find(p => p.id === id)
  }

  return (
    <ProductsContext.Provider value={{
      products,
      categories,
      refresh,
      getById
    }}>
      {children}
    </ProductsContext.Provider>
  )
}
