/**
 * Formate un prix en FCFA sans points de séparation des milliers
 * @param price - Le prix à formater
 * @returns Le prix formaté avec FCFA (ex: 15000 FCFA)
 */
export function formatPrice(price: number): string {
  // Formatage canonique des prix pour l'application :
  // - Utilise la locale 'fr-FR' pour obtenir les séparateurs de milliers (espaces)
  // - N'affiche pas de décimales (FCFA usuellement pas décimal)
  // - Ajoute le suffixe 'FCFA'
  try {
    return price.toLocaleString('fr-FR', { maximumFractionDigits: 0 }) + ' FCFA'
  } catch {
    return `${price} FCFA`
  }
}

/**
 * Formate un prix en FCFA avec séparation des milliers par espace
 * @param price - Le prix à formater
 * @returns Le prix formaté avec espaces et FCFA (ex: 15 000 FCFA)
 */
export function formatPriceWithSpaces(price: number): string {
  // Alias : conserve le comportement historique (espaces de milliers)
  return formatPrice(price)
}