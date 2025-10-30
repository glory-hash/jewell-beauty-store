import { useProducts } from '../contexts/products-impl'
import { useFavorites } from '../contexts/favorites-impl'
import ProductCard from '../components/ProductCard'

export default function Favorites() {
  const { products } = useProducts()
  const { favorites } = useFavorites()
  
  console.log('Favorites - products:', products)
  console.log('Favorites - favoriteIds:', favorites)
  
  const favoriteProducts = products.filter(product => favorites.includes(product.id))
  console.log('Favorites - filtered products:', favoriteProducts)

  return (
    <main className="min-h-screen bg-luxury-cream-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold text-luxury-black mb-4">
            Mes Favoris
          </h1>
          <p className="text-luxury-black-light max-w-2xl mx-auto">
            Les produits que vous avez sauvegardés pour plus tard.
          </p>
        </div>

        {/* Liste des favoris */}
        {favoriteProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-luxury-black-light">
              Vous n'avez pas encore de favoris.
              <br />
              Parcourez notre catalogue et ajoutez des produits à vos favoris !
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}