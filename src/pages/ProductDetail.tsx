import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useProducts } from '../contexts/products-impl'
import { useCart } from '../contexts/cart-impl'
import { useFavorites } from '../contexts/favorites-impl'
import { formatPrice } from '../utils/price'
import ProductGallery from '../components/ProductGallery'
import AuthModal from '../components/AuthModal'
import Tooltip from '../components/Tooltip'
import Toast from '../components/Toast'
import { useAuth } from '../contexts/auth-impl'

export default function ProductDetail() {
  const { id } = useParams()
  const { getById } = useProducts()
  const { addItem } = useCart()
  const { addToFavorites, isInFavorites } = useFavorites()
  const [quantity, setQuantity] = useState(1)
  const { isAuthenticated } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [postLoginAction, setPostLoginAction] = useState<(() => void) | null>(null)
  const [showAddedToast, setShowAddedToast] = useState(false)

  const product = getById(id || '')
  
  if (!product) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-display text-luxury-black">
            Produit non trouvé
          </h2>
        </div>
      </main>
    )
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      // show modal and preserve a callback to execute after login
      // We store a small callback which will be executed after successful login.
      // This preserves the user's intent (add this product) across the auth flow.
      setPostLoginAction(() => () => addItem(product, quantity))
      setShowAuthModal(true)
      return
    }
    addItem(product, quantity)
    // Vous pourriez ajouter une notification ici
  }

  const handleAddToFavorites = () => {
    addToFavorites(product.id)
    // Vous pourriez ajouter une notification ici
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        {/* Galerie d'images */}
        <ProductGallery product={product} />

        {/* Informations produit */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-display font-bold text-luxury-black">
            {product.name}
          </h1>
          
          <div className="mt-3">
            <h2 className="sr-only">Information produit</h2>
            <p className="text-3xl text-luxury-gold font-medium">
              {formatPrice(product.price)}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div className="text-base text-gray-700 space-y-6">
              {product.description}
            </div>
          </div>

          <div className="mt-8">
            {/* Sélecteur de quantité */}
            <div className="flex items-center space-x-4">
              <span className="text-luxury-black font-medium">Quantité</span>
              <div className="flex items-center border border-gray-300 rounded-luxury">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-2 hover:bg-gray-100 transition-colors rounded-l-luxury"
                >
                  <span className="sr-only">Diminuer</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="px-4 py-2 text-center w-12">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="p-2 hover:bg-gray-100 transition-colors rounded-r-luxury"
                >
                  <span className="sr-only">Augmenter</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              {isAuthenticated ? (
                <button
                  onClick={handleAddToCart}
                  className={`btn flex-1 flex items-center justify-center`}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Ajouter au panier
                </button>
              ) : (
                <Tooltip content={<span>Connexion requise — nous sauvegardons votre panier et sécurisons le paiement</span>} position="top">
                  <button
                    onClick={handleAddToCart}
                    className={`btn-outline flex-1 flex items-center justify-center`}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Se connecter pour finaliser l'achat
                  </button>
                </Tooltip>
              )}
              
              <button
                onClick={handleAddToFavorites}
                className="btn-outline flex items-center justify-center"
                aria-label="Ajouter aux favoris"
              >
                <svg 
                  className={`w-6 h-6 ${isInFavorites(product.id) ? 'fill-luxury-gold' : 'fill-none'}`}
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            <AuthModal
              isOpen={showAuthModal}
              onClose={() => { setShowAuthModal(false); setPostLoginAction(null) }}
              message="Connectez-vous pour ajouter ce produit à votre panier"
              onSuccess={() => {
                if (postLoginAction) {
                  postLoginAction()
                  setPostLoginAction(null)
                  // Afficher un toast confirmant l'ajout automatique
                  setShowAddedToast(true)
                }
              }}
            />

            {/* Toast indiquant qu'un article a été ajouté automatiquement après connexion */}
            {showAddedToast && (
              <Toast
                message="Article ajouté au panier"
                type="success"
                onDismiss={() => setShowAddedToast(false)}
                duration={2500}
              />
            )}
          </div>

          {/* Caractéristiques supplémentaires */}
          <div className="mt-8 border-t border-gray-200 pt-8">
            <h3 className="text-sm font-medium text-luxury-black">Points forts</h3>
            <div className="mt-4 prose prose-sm text-gray-500">
              <ul role="list" className="list-disc pl-4 space-y-2">
                <li>Qualité premium</li>
                <li>Livraison express disponible</li>
                <li>Garantie satisfaction</li>
                {product.stock && <li>Stock disponible : {product.stock} unités</li>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
