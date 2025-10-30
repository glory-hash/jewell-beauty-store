import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-luxury-black text-white mt-auto">
      <div className="luxury-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="inline-block">
              <span className="font-display text-2xl text-luxury-gold">
                Jewell Beauty
              </span>
            </Link>
            <p className="mt-4 text-gray-400 max-w-md">
              Découvrez notre collection exclusive de bijoux et accessoires de luxe.
              Livraison rapide dans tout le Cameroun.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/catalog" className="text-gray-400 hover:text-luxury-gold transition-colors">
                  Catalogue
                </Link>
              </li>
              <li>
                <Link to="/new" className="text-gray-400 hover:text-luxury-gold transition-colors">
                  Nouveautés
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-luxury-gold transition-colors">
                  À propos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="tel:+237600000000" className="hover:text-luxury-gold transition-colors">
                  +237 600 000 000
                </a>
              </li>
              <li>
                <a href="mailto:contact@jewellbeauty.com" className="hover:text-luxury-gold transition-colors">
                  contact@jewellbeauty.com
                </a>
              </li>
              <li>Yaoundé, Cameroun</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Jewell Beauty. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
