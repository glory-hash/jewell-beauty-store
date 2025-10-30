/**
 * scripts/list-orphans.cjs
 * Liste les images dans public/produit non référencées dans src/data/products.json
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

if (!fs.existsSync(productsFile)) {
  console.error('products.json introuvable:', productsFile)
  process.exit(1)
}
const products = JSON.parse(fs.readFileSync(productsFile, 'utf-8')).products || []
const referenced = new Set()
products.forEach((p) => {
  if (Array.isArray(p.images)) p.images.forEach((i) => referenced.add(i))
})

const files = walk(imagesRoot)
const orphans = []
files.forEach((f) => {
  const rel = pathFromPublic(f)
  if (!rel) return
  if (!referenced.has(rel)) orphans.push({ full: f, rel })
})

console.log(`Total images trouvées: ${files.length}`)
console.log(`Images orphelines: ${orphans.length}`)
if (orphans.length > 0) {
  console.log('\n--- Liste des images orphelines ---')
  orphans.forEach((o) => console.log(o.rel))
  console.log('---------------------------------\n')
  // simple détection de catégories potentielles
  const suggestions = {}
  orphans.forEach((o) => {
    const parts = o.rel.split('/')
    if (parts.length >= 3) {
      const folder = parts[2]
      suggestions[folder] = (suggestions[folder] || 0) + 1
    }
  })
  if (Object.keys(suggestions).length > 0) {
    console.log('Dossiers détectés parmi les orphelins (potentielles catégories):')
    Object.entries(suggestions).forEach(([k, v]) => console.log(` - ${k}: ${v} fichier(s)`))
  }
}
