/**
 * scripts/ensure-all-images-products.cjs
 *
 * Crée des produits placeholders pour chaque image présente dans `public/produit`
 * qui n'est référencée par aucun produit dans `src/data/products.json`.
 * Usage : node scripts/ensure-all-images-products.cjs
 */

const fs = require('fs')
const path = require('path')

const projectRoot = process.cwd()
const imagesRoot = path.join(projectRoot, 'public', 'produit')
const productsFile = path.join(projectRoot, 'src', 'data', 'products.json')

function walk(dir) {
  const results = []
  if (!fs.existsSync(dir)) return results
  const list = fs.readdirSync(dir)
  list.forEach((file) => {
    const full = path.join(dir, file)
    const stat = fs.statSync(full)
    if (stat && stat.isDirectory()) {
      results.push(...walk(full))
    } else {
      const ext = path.extname(full).toLowerCase()
      if (['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'].includes(ext)) {
        results.push(full)
      }
    }
  })
  return results
}

function pathFromPublic(fullPath) {
  const parts = fullPath.split(path.sep)
  const idx = parts.findIndex((p) => p.toLowerCase() === 'public')
  if (idx === -1) {
    const prodIdx = parts.findIndex((p) => p.toLowerCase() === 'produit')
    if (prodIdx === -1) return null
    const sub = parts.slice(prodIdx)
    return '/' + sub.join('/')
  }
  const sub = parts.slice(idx + 1)
  return '/' + sub.join('/')
}

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

const referenced = new Set()
products.forEach((p) => {
  if (Array.isArray(p.images)) p.images.forEach((i) => referenced.add(i))
})

const files = walk(imagesRoot)
let created = 0
files.forEach((full) => {
  const rel = pathFromPublic(full)
  if (!rel) return
  if (referenced.has(rel)) return

  // create a placeholder product
  const base = path.basename(full)
  const nameNoExt = base.replace(path.extname(base), '')
  const parts = rel.split('/')
  const folder = parts.length >= 3 ? parts[2] : 'autre'

  // ensure unique id
  let id = slugify(nameNoExt)
  if (!id) id = `prod-${Date.now()}`
  // avoid id collision
  const existingIds = new Set(products.map((p) => p.id))
  let candidate = id
  let i = 1
  while (existingIds.has(candidate)) {
    candidate = `${id}-${i++}`
  }
  id = candidate

  const product = {
    id,
    name: nameNoExt,
    description: `Placeholder automatique pour l'image ${base}`,
    price: 12000,
    category: folder.toLowerCase().replace(/[^a-z0-9]+/gi, '-'),
    images: [rel],
    stock: 10
  }
  products.push(product)
  referenced.add(rel)
  created += 1
})

if (created > 0) {
  fs.writeFileSync(productsFile, JSON.stringify(data, null, 2), 'utf-8')
  console.log(`Créés ${created} produits placeholders pour images non référencées.`)
} else {
  console.log('Aucun produit à créer : toutes les images sont déjà référencées.')
}
