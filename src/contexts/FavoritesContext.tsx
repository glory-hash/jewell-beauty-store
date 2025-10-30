import { useState, useEffect, type ReactNode } from 'react'
import { FavoritesContext } from './favorites-impl'

export default function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('favorites')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const addToFavorites = (productId: string) => {
    setFavorites(current => {
      if (current.includes(productId)) {
        return current
      }
      return [...current, productId]
    })
  }

  const removeFromFavorites = (productId: string) => {
    setFavorites(current => current.filter(id => id !== productId))
  }

  const isInFavorites = (productId: string) => favorites.includes(productId)

  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites))
    } catch {
      // ignore
    }
  }, [favorites])

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      isInFavorites
    }}>
      {children}
    </FavoritesContext.Provider>
  )
}
