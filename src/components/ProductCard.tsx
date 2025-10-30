import { Link } from 'react-router-dom'
import type { Product } from '../types'
import { formatPrice } from '../utils/price'
import { PLACEHOLDER_IMAGES, PLACEHOLDER_REMOTE } from '../utils/images'
import { useFavorites } from '../contexts/favorites-impl'

interface ProductCardProps {
  product: Product
  featured?: boolean
}

export default function ProductCard({ product, featured }: ProductCardProps) {
  const { isInFavorites, addToFavorites, removeFromFavorites } = useFavorites()
  const isFavorite = isInFavorites(product.id)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault() // Empêche la navigation vers la page produit
    if (isFavorite) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product.id)
    }
  }

  return (
    <Link 
      to={`/product/${product.id}`}
      className="group"
    >
      <div className="relative overflow-hidden rounded-luxury bg-white shadow-xl
                    transform transition-all duration-500 
                    hover:-translate-y-2 hover:shadow-2xl">
        {featured && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-luxury-gold text-white px-4 py-1 rounded-full
                           text-sm font-medium tracking-wide">
              En vedette
            </span>
          </div>
        )}
        
        <button 
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 
                   backdrop-blur-sm shadow-lg transform transition-all duration-300
                   hover:scale-110 hover:bg-white"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 transition-colors duration-300
                      ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400 hover:text-red-500'}`}
            viewBox="0 0 24 24" 
            stroke="currentColor"
            strokeWidth={isFavorite ? 0 : 2}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
        </button>

        <div className="aspect-square overflow-hidden">
          <img 
            src={product.images?.[0] ? encodeURI(product.images[0]) : PLACEHOLDER_IMAGES.product}
            alt={product.name}
            className="w-full h-full object-cover transform transition-transform 
                     duration-700 group-hover:scale-110"
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement
              // éviter boucle infinie : n'appliquer le fallback distant qu'une fois
              if (!img.dataset.fallback) {
                img.dataset.fallback = '1'
                img.src = PLACEHOLDER_REMOTE.product
              }
            }}
          />
        </div>
        
        <div className="p-6 bg-gradient-to-t from-luxury-black/5 to-transparent">
          <h3 className="font-display text-xl font-medium mb-2 
                       text-luxury-black group-hover:text-luxury-gold-dark
                       transition-colors duration-300">
            {product.name}
          </h3>
          
          <p className="text-luxury-gold font-medium text-lg">
            {formatPrice(product.price)}
          </p>
          
          <div className="mt-4 transform opacity-0 translate-y-4 
                        group-hover:opacity-100 group-hover:translate-y-0
                        transition-all duration-300">
            <span className="text-sm text-luxury-black-light font-medium
                           flex items-center">
              Découvrir 
              <svg xmlns="http://www.w3.org/2000/svg" 
                   className="h-4 w-4 ml-2 transition-transform duration-300
                            group-hover:translate-x-2" 
                   fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" 
                      strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
