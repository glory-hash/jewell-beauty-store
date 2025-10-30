// Types globaux utilisés dans l'application
export type Product = {
  id: string
  name: string
  description?: string
  price: number
  category?: string
  images?: string[]
  stock?: number
  // tags, attributes etc. peuvent être ajoutés selon le besoin
}

export type CartItem = {
  product: Product
  quantity: number
}

export type User = {
  id: string
  name: string
  email: string
  // commandes passées par l'utilisateur
  orders?: Order[]
  // favoris du user
  favorites?: string[] // liste d'ids de produits
}

export type Order = {
  id: string
  items: CartItem[]
  total: number
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
  createdAt?: string
  // informations additionnelles (adresse, paiement) peuvent être ajoutées
}
