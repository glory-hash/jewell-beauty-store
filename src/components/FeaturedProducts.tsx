import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from '../contexts/products-impl'
import type { Product } from '../types'
import ProductCard from './ProductCard'

export default function FeaturedProducts() {
  const { products } = useProducts()
  const [featured, setFeatured] = useState<Product[]>([])

  useEffect(() => {
    // Sélectionne 3 produits aléatoires pour la mise en avant
    const randomProducts = [...products]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
    setFeatured(randomProducts)
  }, [products])

  if (featured.length === 0) return null

  return (
    <section className="bg-luxury-cream-light py-16">
      <div className="luxury-container">
        <h2 className="section-title">
          Nos Coups de Cœur
        </h2>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((product) => (
            <ProductCard 
              key={product.id}
              product={product}
              featured={true}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link 
            to="/catalog"
            className="btn-outline inline-flex items-center space-x-2
                      hover:shadow-lg transform transition-all duration-300
                      hover:-translate-y-0.5"
          >
            <span>Découvrir toute la collection</span>
            <svg xmlns="http://www.w3.org/2000/svg" 
                 className="h-5 w-5 transition-transform duration-300
                          group-hover:translate-x-1" 
                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" 
                    strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
