import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/cart-impl'
import { useAuth } from '../contexts/auth-impl'
import CartItem from '../components/CartItem'
import Modal from '../components/Modal'
import AuthModal from '../components/AuthModal'
import { formatPrice } from '../utils/price'

// Page panier: affiche les éléments, permet modifier quantité et lancer le checkout.
export default function Cart() {
  const { items, total } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)

  const handleConfirm = () => {
    if (items.length === 0) return
    // If user not authenticated, open auth modal (soft redirect)
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }
    setShowModal(true)
  }

  const handleCheckout = () => {
    setShowModal(false)
    navigate('/checkout')
  }

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Mon panier</h2>
      <div className="bg-white border rounded">
        {items.length === 0 ? (
          <div className="p-6 text-gray-600">Votre panier est vide.</div>
        ) : (
          <div>
            {items.map(i => <CartItem key={i.product.id} item={i} />)}

            {/* Bannière contextuelle pour inviter à se connecter avant finaliser */}
            {!isAuthenticated && (
              <div className="p-4 bg-gray-50 border-l-4 border-yellow-400 text-gray-800 rounded-md mb-4">
                  <div className="flex items-start justify-between">
                    <div className="pr-4">
                      <strong className="block text-luxury-black">Connectez-vous pour finaliser votre commande</strong>
                      <div className="text-sm text-luxury-muted">Nous sauvegardons votre panier et sécurisons le paiement pour vous offrir une expérience fluide et personnalisée.</div>
                    </div>
                    <div className="self-center">
                      <button onClick={() => setShowAuthModal(true)} className="text-luxury-gold underline">Se connecter</button>
                    </div>
                  </div>
              </div>
            )}

            <div className="p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Total formaté en FCFA via utilitaire central */}
              <div className="text-lg font-semibold">Total: {formatPrice(total)}</div>
              <div className="text-right">
                <button
                  onClick={handleConfirm}
                  disabled={items.length === 0}
                  className="inline-block bg-yellow-600 text-white px-6 py-3 rounded-md font-medium
                             hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Confirmer la commande
                </button>
              </div>
            </div>

            <Modal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              onConfirm={handleCheckout}
              title="Confirmation de commande"
            >
              <p>
                Vous allez être redirigé vers la page de paiement sécurisé.
                Le montant total de votre commande est de {formatPrice(total)}.
                Souhaitez-vous continuer ?
              </p>
            </Modal>

            <AuthModal
              isOpen={showAuthModal}
              onClose={() => setShowAuthModal(false)}
              message="Connectez-vous pour finaliser votre commande"
              onSuccess={() => {
                setShowAuthModal(false)
                navigate('/checkout')
              }}
            />
          </div>
        )}
      </div>
    </main>
  )
}
