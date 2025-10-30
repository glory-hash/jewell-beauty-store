import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { useCart } from '../contexts/cart-impl'
import { useFavorites } from '../contexts/favorites-impl'
import { formatPrice } from '../utils/price'
import { useAuth } from '../contexts/auth-impl'

export default function Header() {
  // Etat local pour l'ouverture du menu utilisateur
  const [menuOpen, setMenuOpen] = useState(false)
  // Etat local pour l'aperçu du logo (modal)
  const [logoPreviewOpen, setLogoPreviewOpen] = useState(false)
  // Le chemin de l'image du logo : on privilégie le PNG fourni (/logo-jewel.png)
  // et on tombe en secours sur le SVG existant si le PNG est introuvable.
  const [logoSrc, setLogoSrc] = useState('/logo-jewel.png')
  const menuRef = useRef<HTMLDivElement | null>(null)
  const { items, total } = useCart()
  const { favorites } = useFavorites()
  const { user, isAuthenticated, logout } = useAuth()
  
  // Ferme le menu utilisateur si on clique à l'extérieur
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!menuRef.current) return
      if (!(e.target instanceof Node)) return
      if (!menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
  // Fermer l'aperçu du logo avec la touche Echap et gérer le scroll du body
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setLogoPreviewOpen(false)
    }
    if (logoPreviewOpen) {
      document.addEventListener('keydown', onKey)
      // empêcher le scroll du body lorsque le modal est ouvert
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [logoPreviewOpen])
  return (
    <header className="bg-white shadow-sm">
      <div className="luxury-container py-4">
        <div className="flex items-center justify-between">
          {/* 
            Zone gauche : nom de la boutique + logo + bouton Accueil
            - Le nom est placé à gauche du logo (texte en minuscules demandé)
            - Le logo conserve l'aperçu modal au clic
            - Un bouton "Accueil" est ajouté à droite du logo (visible sur tous les écrans)
            - La police / style d'origine est conservée (classes existantes)
          */}
          <div className="flex items-center space-x-3">
            {/* Nom de la boutique (en minuscules, conserve la police existante) */}
            <div className="flex-shrink-0">
              <span className="text-lg sm:text-xl font-semibold text-luxury-black">
                jewel beauty store
              </span>
            </div>

            {/* Logo cliquable — ouvre un aperçu sans naviguer */}
            <div>
              <Link to="/" aria-label="Accueil - Jewell Beauty" className="block">
                {/* img depuis /public pour éviter require/import compilé */}
                <img
                  src={logoSrc}
                  alt="Jewell Beauty Store"
                  className="h-12 w-auto cursor-pointer"
                  // si le src échoue (404), on bascule sur le SVG de secours
                  onError={() => {
                    if (logoSrc !== '/logo-jewel.svg') setLogoSrc('/logo-jewel.svg')
                  }}
                  // ouvrir l'aperçu au clic (préserver le lien vers l'accueil)
                  onClick={(e) => {
                    // empêcher la navigation normale si l'utilisateur veut juste voir l'aperçu
                    e.preventDefault()
                    setLogoPreviewOpen(true)
                  }}
                />
              </Link>
            </div>

            {/* Bouton Accueil — visible à droite du logo sur tous les écrans */}
            <div>
              <Link 
                to="/"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-luxury-black rounded-md shadow-sm hover:bg-luxury-gold transition-colors"
                aria-label="Retour à l'accueil"
              >
                Accueil
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/catalog" 
              className="text-luxury-black hover:text-luxury-gold transition-colors"
            >
              Catalogue
            </Link>
            <Link 
              to="/new" 
              className="text-luxury-black hover:text-luxury-gold transition-colors"
            >
              Nouveautés
            </Link>
            <Link
              to="/contact"
              className="text-luxury-black hover:text-luxury-gold transition-colors"
            >
              Nous Contacter
            </Link>
            <Link 
              to="/about" 
              className="text-luxury-black hover:text-luxury-gold transition-colors"
            >
              À propos
            </Link>
            {isAuthenticated ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen(s => !s)}
                  className="flex items-center space-x-2 text-luxury-black hover:text-luxury-gold"
                  aria-haspopup="true"
                  aria-expanded={menuOpen}
                >
                  <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-luxury-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.6 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="absolute -top-1 -right-1 block w-2 h-2 rounded-full bg-luxury-gold" aria-hidden="true" />
                  </div>
                  <span className="hidden sm:inline">Bonjour, {user?.name.split(' ')[0]}</span>
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg py-2 z-50">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Mon profil</Link>
                    <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Déconnexion</button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="text-luxury-black hover:text-luxury-gold">Connexion</Link>
                <Link to="/signup" className="text-luxury-black hover:text-luxury-gold">S'inscrire</Link>
              </>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Favoris */}
            <Link 
              to="/favorites"
              className="relative p-2 text-luxury-black hover:text-luxury-gold transition-colors"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                />
              </svg>
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-luxury-gold text-white 
                               w-5 h-5 rounded-full text-xs flex items-center 
                               justify-center animate-pulse">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Panier */}
            <Link 
              to="/cart"
              className="relative p-2 text-luxury-black hover:text-luxury-gold transition-colors"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
                />
              </svg>
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-luxury-gold text-white 
                               w-5 h-5 rounded-full text-xs flex items-center 
                               justify-center">
                  {items.length}
                </span>
              )}
              {total > 0 && (
                <span className="absolute top-full right-0 bg-white shadow-lg 
                               rounded-luxury py-1 px-2 text-sm font-medium 
                               text-luxury-black whitespace-nowrap">
                  {formatPrice(total)}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Aperçu modal du logo (accessible) */}
      {logoPreviewOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Aperçu du logo Jewell Beauty"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
          onClick={() => setLogoPreviewOpen(false)}
        >
          <div className="max-w-lg w-full p-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLogoPreviewOpen(false)}
              className="mb-2 text-white bg-transparent hover:underline"
              aria-label="Fermer l'aperçu"
            >
              Fermer
            </button>
            <div className="bg-white p-4 rounded shadow-lg">
              {/* Le logo en grand — utilise la même source que l'entête (logoSrc) */}
              <img src={logoSrc} alt="Aperçu du logo Jewell Beauty" className="w-full h-auto" onError={(e) => {
                const img = e.currentTarget as HTMLImageElement
                if (img.src.endsWith('/logo-jewel.png')) img.src = '/logo-jewel.svg'
              }} />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
