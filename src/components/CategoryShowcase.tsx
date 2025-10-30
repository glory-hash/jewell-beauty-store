import { Link } from 'react-router-dom'
import { PLACEHOLDER_IMAGES, PLACEHOLDER_REMOTE } from '../utils/images'

const categories = [
  {
    id: 'parfums',
    name: 'Parfums',
    image: PLACEHOLDER_IMAGES.parfums,
    description: 'Des fragrances exclusives pour une élégance intemporelle'
  },
  {
    id: 'bijoux',
    name: 'Chaînes & Colliers',
    image: PLACEHOLDER_IMAGES.bijoux,
    description: 'Des pièces uniques qui subliment votre style'
  },
  {
    id: 'montres',
    name: 'Montres & Ensembles',
    image: PLACEHOLDER_IMAGES.montres,
    description: 'Le luxe au quotidien, à votre poignet'
  }
]

export default function CategoryShowcase() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-luxury-cream-light">
      <div className="luxury-container">
        <h2 className="section-title">
          Nos Collections
        </h2>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={`/catalog?category=${category.id}`}
              className="group relative overflow-hidden rounded-luxury"
            >
              {/* Image avec overlay */}
              <div className="aspect-[4/5] relative overflow-hidden">
                <img 
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transform transition-transform 
                           duration-700 group-hover:scale-110"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement
                    if (!img.dataset.fallback) {
                      img.dataset.fallback = '1'
                      // choisir la remote correspondante selon l'id
                      const remote = PLACEHOLDER_REMOTE[category.id as keyof typeof PLACEHOLDER_REMOTE] || PLACEHOLDER_REMOTE.product
                      img.src = remote
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t 
                              from-luxury-black/80 to-transparent" />
              </div>
              
              {/* Contenu */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="font-display text-2xl text-white mb-2
                             transform transition-transform duration-300
                             group-hover:-translate-y-2">
                  {category.name}
                </h3>
                
                <p className="text-gray-300 mb-4 transform transition-all
                             duration-300 group-hover:-translate-y-2
                             opacity-0 group-hover:opacity-100">
                  {category.description}
                </p>
                
                <span className="inline-flex items-center text-luxury-gold
                               transform transition-all duration-300
                               translate-y-4 group-hover:translate-y-0
                               opacity-0 group-hover:opacity-100">
                  Découvrir la collection
                  <svg xmlns="http://www.w3.org/2000/svg"
                       className="h-5 w-5 ml-2 transition-transform duration-300
                                group-hover:translate-x-2"
                       fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
              
              {/* Bordure décorative */}
              <div className="absolute inset-0 border-2 border-luxury-gold/0
                            group-hover:border-luxury-gold/50
                            transition-colors duration-300 rounded-luxury" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
