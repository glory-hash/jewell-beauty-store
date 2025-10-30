/**
 * scripts/expand-images-to-products.cjs
 *
 * Pour chaque produit qui contient plusieurs images dans `src/data/products.json`,
 * ce script crée des produits supplémentaires (placeholders) pour que chaque image
 * apparaisse comme produit séparé dans le catalogue. L'objectif: s'assurer que
 * toutes les images deviennent visibles individuellement dans la grille produit.
 *
 * Usage : node scripts/expand-images-to-products.cjs
 */

const fs = require('fs')
const path = require('path')

const projectRoot = process.cwd()
const productsFile = path.join(projectRoot, 'src', 'data', 'products.json')

function slugify(s) {
  return String(s)
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
}

if (!fs.existsSync(productsFile)) {
  console.error('products.json introuvable:', productsFile)
  process.exit(1)
}

const data = JSON.parse(fs.readFileSync(productsFile, 'utf-8'))
if (!Array.isArray(data.products)) data.products = []
const products = data.products

const existingIds = new Set(products.map((p) => p.id))
let created = 0

// For each product with multiple images, create a separate product for each image
// except keep the original product as-is (so it still acts as a bundle/gallery).
const additions = []
products.forEach((p) => {
  if (!Array.isArray(p.images) || p.images.length <= 1) return
  p.images.forEach((img, idx) => {
    // create a separate product for every image (including index 0) only if
    // there isn't already another product that references exactly that image as its main image
    const already = products.find((q) => Array.isArray(q.images) && q.images[0] === img && q.id !== p.id)
    if (already) return

    // create product id based on original id + index or slug of image
    const baseName = path.basename(img).replace(path.extname(img), '')
    let candidateId = slugify(`${p.id}-${idx}-${baseName}`)
    if (!candidateId) candidateId = `prod-${Date.now()}-${Math.random().toString(36).slice(2,6)}`
    let uniqueId = candidateId
    let i = 1
    while (existingIds.has(uniqueId)) {
      uniqueId = `${candidateId}-${i++}`
    }
    existingIds.add(uniqueId)

    const newProd = {
      id: uniqueId,
      name: `${p.name} — ${baseName}`,
      description: p.description ? `${p.description} (variation d'image)` : `Variation créée automatiquement à partir de ${p.name}`,
      price: p.price || 12000,
      category: p.category || 'autre',
      images: [img],
      stock: p.stock ?? 10
    }
    additions.push(newProd)
    created += 1
  })
})

if (additions.length > 0) {
  data.products = data.products.concat(additions)
  fs.writeFileSync(productsFile, JSON.stringify(data, null, 2), 'utf-8')
  console.log(`Créés ${created} produits additionnels pour exposer chaque image individuellement.`)
} else {
  console.log('Aucun produit additionnel nécessaire (toutes les images sont déjà exposées individuellement).')
}
