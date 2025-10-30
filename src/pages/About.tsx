import { Link } from 'react-router-dom'

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      {/* En-tête héroïque */}
      <div className="relative bg-black text-white py-24">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            L'Excellence du Luxe Accessible
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200">
            Depuis 2020, Jewell Beauty redéfinit l'expérience du bijou et du parfum de luxe au Cameroun
          </p>
        </div>
      </div>

      {/* Notre Histoire */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
              Notre Histoire
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Née d'une passion pour l'excellence et d'un désir de rendre le luxe accessible, 
              Jewell Beauty a commencé son voyage en 2020 à Yaoundé. Notre mission était claire : 
              offrir des bijoux et des parfums d'exception à des prix raisonnables, sans jamais 
              compromettre la qualité.
            </p>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif font-bold text-gray-900 text-center mb-16">
            Nos Valeurs
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">Qualité</h3>
              <p className="text-gray-600">
                Chaque pièce est minutieusement sélectionnée pour sa qualité exceptionnelle 
                et sa durabilité.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">Accessibilité</h3>
              <p className="text-gray-600">
                Le luxe ne devrait pas être un privilège. Nous rendons l'élégance 
                accessible à tous.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">Service</h3>
              <p className="text-gray-600">
                Un accompagnement personnalisé et un service client d'excellence 
                pour une expérience unique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Notre Engagement */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-bold mb-8">
              Notre Engagement
            </h2>
            <p className="text-lg leading-relaxed mb-12">
              Nous nous engageons à offrir une expérience de luxe authentique, 
              éthique et durable. Chaque produit raconte une histoire d'excellence 
              et de passion, transmise à travers des générations d'artisans.
            </p>
            <Link 
              to="/catalog"
              className="inline-block bg-yellow-600 text-white px-8 py-4 rounded-md
                       font-medium transition-all duration-300 hover:bg-yellow-700
                       transform hover:-translate-y-1"
            >
              Découvrir Nos Collections
            </Link>
          </div>
        </div>
      </section>

      {/* Chiffres Clés */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-600 mb-2">3+</div>
              <div className="text-gray-600">Années d'Excellence</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-600 mb-2">1000+</div>
              <div className="text-gray-600">Clients Satisfaits</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-600 mb-2">100+</div>
              <div className="text-gray-600">Produits Uniques</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-600 mb-2">2</div>
              <div className="text-gray-600">Boutiques au Cameroun</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact et Service Client */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
            Une Question ? Contactez-nous
          </h2>
          <p className="text-gray-600 mb-8">
            Notre équipe est à votre disposition pour vous conseiller et répondre à toutes vos questions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/contact"
              className="px-8 py-3 border-2 border-gray-900 text-gray-900 font-medium rounded-md
                       hover:bg-gray-900 hover:text-white transition-colors duration-300
                       w-full sm:w-auto"
            >
              Nous Contacter
            </Link>
            <a 
              href="tel:+237600000000"
              className="px-8 py-3 bg-yellow-600 text-white font-medium rounded-md
                       hover:bg-yellow-700 transition-colors duration-300
                       w-full sm:w-auto"
            >
              +237 600 000 000
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
