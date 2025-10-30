// CartItem.tsx
// -----------------
// Représente une ligne du panier (item) affichée sur la page panier.
// Comportements :
// - montre image, nom, prix unitaire et total ligne
// - boutons +/- pour modifier la quantité (utilise setQuantity du contexte)
// - bouton supprimer pour retirer l'article du panier
//
// Le composant suppose que `item` suit le type `CartItem` défini dans `src/types`.
import type { CartItem as CartItemType } from '../types'
import { useCart } from '../contexts/cart-impl'
import { formatPriceWithSpaces } from '../utils/price'

export default function CartItem({ item }: { item: CartItemType }) {
  const { setQuantity, removeItem } = useCart()

  return (
    <div className="flex items-center gap-4 p-4 border-b">
      <div className="w-24 h-24 bg-gray-100 flex items-center justify-center">
        {item.product.images?.[0] ? <img src={item.product.images![0]} alt={item.product.name} className="object-contain h-full" /> : <div className="text-sm text-gray-400">No image</div>}
      </div>
      <div className="flex-1">
  <div className="font-medium">{item.product.name}</div>
  {/* Prix unitaire formaté en FCFA */}
  <div className="text-sm text-gray-600">{formatPriceWithSpaces(item.product.price)}</div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => setQuantity(item.product.id, item.quantity - 1)} className="px-2">-</button>
        <div>{item.quantity}</div>
        <button onClick={() => setQuantity(item.product.id, item.quantity + 1)} className="px-2">+</button>
      </div>
      <div className="w-28 text-right">
        {/* Total ligne formaté en FCFA */}
        <div className="font-semibold">{formatPriceWithSpaces(item.product.price * item.quantity)}</div>
        <button onClick={() => removeItem(item.product.id)} className="text-sm text-red-600">Supprimer</button>
      </div>
    </div>
  )
}
