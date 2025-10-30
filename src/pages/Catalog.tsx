import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProducts } from '../contexts/products-impl'
import Filters from '../components/Filters'
import ProductCard from '../components/ProductCard'

export default function Catalog() {
  const { products, categories } = useProducts()
  const [searchParams, setSearchParams] = useSearchParams()
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 })

  // Filtres
  const category = searchParams.get('category')
  const search = searchParams.get('q')?.toLowerCase()

  // Gestionnaire pour le changement de prix
  const handlePriceChange = (min: number, max: number) => {
    setPriceRange({ min, max })
  }

  // Filtrage des produits
  const filteredProducts = products.filter(product => {
    // Filtre par catégorie
    if (category && product.category !== category) return false

    // Filtre par recherche
    if (search && !product.name.toLowerCase().includes(search)) return false

    // Filtre par prix
    if (product.price < priceRange.min || product.price > priceRange.max) return false

    return true
  })

  return (
    <main className="min-h-screen bg-luxury-cream-light">
      <div className="luxury-container py-12">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold text-luxury-black mb-4">
            Notre Collection
          </h1>
          <p className="text-luxury-black-light max-w-2xl mx-auto">
            Découvrez notre sélection de bijoux et accessoires de luxe,
            soigneusement choisis pour vous.
          </p>
        </div>

        {/* Conteneur flex pour les filtres et la grille */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Barre latérale des filtres */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <Filters products={products} onPriceChange={handlePriceChange} />
          </aside>

          {/* Zone principale */}
          <section className="flex-1">
            {/* Filtres */}
            <div className="flex flex-wrap gap-4 mb-8">
              <button
                onClick={() => setSearchParams({})}
                className={`btn-outline text-sm ${!category ? 'bg-luxury-gold text-white' : ''}`}
              >
                Tous
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSearchParams({ category: cat })}
                  className={`btn-outline text-sm ${category === cat ? 'bg-luxury-gold text-white' : ''}`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            {/* Grille de produits */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Message si aucun produit */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-luxury-black-light">
                  Aucun produit ne correspond à vos critères.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
