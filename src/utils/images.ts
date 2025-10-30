// Les images placeholder sont maintenant attendues en local dans `public/placeholder-images/`.
// Si elles n'existent pas encore, le script `npm run download:placeholders` permet de
// les télécharger automatiquement depuis Unsplash pour le développement.
export const PLACEHOLDER_IMAGES = {
  hero: '/placeholder-images/hero.jpg',
  parfums: '/placeholder-images/parfums.jpg',
  bijoux: '/placeholder-images/bijoux.jpg',
  montres: '/placeholder-images/montres.jpg',
  product: '/placeholder-images/product.jpg'
}

// Fallback remote URLs (utiles si tu n'as pas encore téléchargé les images)
export const PLACEHOLDER_REMOTE = {
  hero: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070',
  parfums: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=2048',
  bijoux: 'https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?q=80&w=2070',
  montres: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2080',
  product: 'https://images.unsplash.com/photo-1517613367530-b0570f49a3d3?q=80&w=2070'
}