import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { CartContext } from './cart-impl'
import type { Product } from '../types'

export default function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Array<{ product: Product; quantity: number }>>(() => {
    try {
      const saved = localStorage.getItem('cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Calculer le total
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  // Ajouter un produit
  const addItem = (product: Product, quantity = 1) => {
    setItems(current => {
      const exists = current.find(item => item.product.id === product.id)
      if (exists) {
        return current.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...current, { product, quantity }]
    })
  }

  // Supprimer un produit
  const removeItem = (productId: string) => {
    setItems(current => current.filter(item => item.product.id !== productId))
  }

  // Modifier la quantité
  const setQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId)
      return
    }
    setItems(current =>
      current.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    )
  }

  // Vider le panier
  const clearCart = () => setItems([])

  // Sauvegarder dans localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items))
    } catch {
      // ignore
    }
  }, [items])

  return (
    <CartContext.Provider value={{
      items,
      total,
      addItem,
      removeItem,
      setQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  )
}
