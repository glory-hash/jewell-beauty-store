import axios from 'axios'

// Petit utilitaire axios centralisé
// Objectif : définir un point unique pour les appels réseau.
// Actuellement la baseURL est '/'. Pour intégrer une API distante,
// modifier `baseURL` ici (ou utiliser les variables d'environnement).
const api = axios.create({
  baseURL: '/',
  headers: { 'Content-Type': 'application/json' },
})

export default api
