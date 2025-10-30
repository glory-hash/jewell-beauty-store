import Hero from '../components/Hero'
import FeaturedProducts from '../components/FeaturedProducts'
import CategoryShowcase from '../components/CategoryShowcase'

// Page d'accueil
// Cette page compose les sections principales de la vitrine : Hero, catégories,
// produits en vedette et une bannière newsletter. Les composants enfants
// sont responsables de leur propre logique et données.
export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero />
      
      {/* Catégories */}
      <CategoryShowcase />
      
      {/* Produits en vedette */}
      <FeaturedProducts />
      
      {/* Bannière newsletter */}
      <section className="bg-luxury-black py-16">
        <div className="luxury-container">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="font-display text-3xl text-white">
              Restez informé de nos nouveautés
            </h2>
            <p className="text-gray-300">
              Inscrivez-vous à notre newsletter pour recevoir en avant-première
              nos offres exclusives et nouveautés.
            </p>
            <form className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="input bg-luxury-black-light border-luxury-gold/30 
                         text-white placeholder-gray-400 max-w-sm"
              />
              <button 
                type="submit"
                className="btn whitespace-nowrap"
              >
                S'inscrire
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
