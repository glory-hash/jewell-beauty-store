import { createContext, useContext } from 'react'

export type FavoritesContextType = {
  favorites: string[] // IDs des produits favoris
  addToFavorites: (productId: string) => void
  removeFromFavorites: (productId: string) => void
  isInFavorites: (productId: string) => boolean
}

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  isInFavorites: () => false
})

export function useFavorites() {
  return useContext(FavoritesContext)
}
