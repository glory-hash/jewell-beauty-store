import { Link } from 'react-router-dom'
import { PLACEHOLDER_IMAGES, PLACEHOLDER_REMOTE } from '../utils/images'

export default function Hero() {
  return (
    <section className="relative bg-luxury-black overflow-hidden">
      {/* Overlay décoratif */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20" />
      
      <div className="luxury-container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-16 md:py-24">
          {/* Contenu texte */}
          <div className="text-white space-y-8 animate-fade-in">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl 
                         font-bold leading-tight">
              <span className="text-luxury-gold">L'élégance</span> à portée 
              <br className="hidden md:block" /> de main
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-xl">
              Découvrez notre collection exclusive de bijoux et accessoires 
              qui subliment votre beauté naturelle.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/catalog" className="btn">
                Explorer la collection
              </Link>
              <Link to="/about" className="btn-outline border-white text-white 
                                         hover:bg-white hover:text-luxury-black">
                Notre histoire
              </Link>
            </div>
          </div>

          {/* Image hero avec effet de parallaxe */}
          <div className="relative h-[400px] lg:h-[600px]">
            <div className="absolute inset-0 transform 
                          hover:scale-105 transition-transform duration-700">
              <img 
                src={PLACEHOLDER_IMAGES.hero}
                alt="Collection de bijoux luxueux"
                className="w-full h-full object-cover rounded-luxury"
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement
                  if (!img.dataset.fallback) {
                    img.dataset.fallback = '1'
                    img.src = PLACEHOLDER_REMOTE.hero
                  }
                }}
              />
              {/* Effet de brillance */}
              <div className="absolute inset-0 bg-gradient-to-tr 
                            from-luxury-gold/20 to-transparent" />
            </div>
            
            {/* Badge décoratif */}
            <div className="absolute -bottom-6 right-6 bg-luxury-gold 
                          text-white px-6 py-4 rounded-luxury shadow-lg 
                          transform rotate-3 animate-float">
              <p className="font-display text-lg">Nouvelle Collection</p>
              <p className="text-sm opacity-90">Automne 2025</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
