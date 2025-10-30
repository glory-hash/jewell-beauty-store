import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../contexts/auth-impl'
import { useCart } from '../contexts/cart-impl'
import Toast from './Toast'

// Composant placé dans App.tsx pour écouter les changements d'auth
// et afficher une notification si l'utilisateur se connecte alors
// qu'il y a des articles dans le panier (panier sauvegardé).
export default function AuthCartReminder() {
  const { isAuthenticated } = useAuth()
  const { items } = useCart()
  const wasAuthenticated = useRef<boolean>(isAuthenticated)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    // Si on passe de déconnecté -> connecté et qu'il y a des items, afficher le toast
    if (!wasAuthenticated.current && isAuthenticated && items.length > 0) {
      setShowToast(true)
    }
    wasAuthenticated.current = isAuthenticated
  }, [isAuthenticated, items.length])

  if (!showToast) return null

  return (
    <Toast
      message="Votre panier est sauvegardé"
      type="success"
      onDismiss={() => setShowToast(false)}
      duration={2500}
    />
  )
}
