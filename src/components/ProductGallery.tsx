import { useState } from 'react'
import type { Product } from '../types'

interface ProductGalleryProps {
  product: Product
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(0)
  const images = product.images || []

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 rounded-luxury flex items-center justify-center">
        <span className="text-gray-400">Aucune image disponible</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Image principale */}
      <div className="aspect-square overflow-hidden rounded-luxury bg-white">
        <img
          src={images[activeImage]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Miniatures */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto py-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`w-20 h-20 flex-shrink-0 rounded-luxury overflow-hidden
                      ${activeImage === index ? 'ring-2 ring-luxury-gold' : ''}`}
            >
              <img
                src={image}
                alt={`${product.name} - vue ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
