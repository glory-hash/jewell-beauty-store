// Point d'entrée de l'application
// Ce fichier initialise React et monte le composant racine `App`.
// Commentaire en français : garder ce fichier minimal — la logique
// d'application et les providers sont définis dans `src/App.tsx`.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/playfair-display'
import '@fontsource/inter'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
