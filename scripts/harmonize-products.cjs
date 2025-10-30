/**
 * scripts/harmonize-products.cjs
 *
 * Normalise les produits dans `src/data/products.json` :
 * - Harmonise les noms (Title Case), supprime espaces en trop et corrige fautes courantes
 * - Nettoie les descriptions (trim)
 * - Normalise `category` en minuscules et remplace les espaces par '-'
 * - Arrondit les prix à la centaine la plus proche (ex: 12345 -> 12300)
 * - Assure que `stock` est un entier >= 0
 *
 * Usage : node scripts/harmonize-products.cjs
 */

const fs = require('fs')
const path = require('path')

const projectRoot = process.cwd()
const productsFile = path.join(projectRoot, 'src', 'data', 'products.json')

function titleCase(s) {
  if (!s) return s
  return s
    .split(/\s+/)
    .map((w) => {
      // garder les apostrophes ex: d'oreilles
      if (w.includes("'")) {
        return w
          .split("'")
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
          .join("'")
      }
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    })
    .join(' ')
}

function roundToHundred(n) {
  if (!Number.isFinite(n)) return n
  return Math.round(n / 100) * 100
}

const corrections = {
  'pondentif': 'pendentif',
  'bracetets': 'bracelet',
  'orilles': 'oreilles',
  "boucle d'orilles": "boucles d'oreilles"
}

function applyCorrections(s) {
  if (!s) return s
  let res = s
  Object.entries(corrections).forEach(([bad, good]) => {
    const re = new RegExp(bad, 'gi')
    res = res.replace(re, good)
  })
  return res
}

if (!fs.existsSync(productsFile)) {
  console.error('products.json introuvable :', productsFile)
  process.exit(1)
}

const raw = fs.readFileSync(productsFile, 'utf-8')
const data = JSON.parse(raw)
if (!Array.isArray(data.products)) data.products = []

let changed = 0
data.products = data.products.map((p) => {
  const prod = { ...p }

  // name
  let name = String(prod.name || '').trim()
  name = applyCorrections(name)
  name = titleCase(name)
  if (name !== prod.name) {
    prod.name = name
    changed += 1
  }

  // description
  if (typeof prod.description === 'string') {
    const desc = applyCorrections(prod.description.trim())
    if (desc !== prod.description) {
      prod.description = desc
      changed += 1
    }
  }

  // category
  if (prod.category) {
    const cat = String(prod.category).trim().toLowerCase().replace(/\s+/g, '-')
    if (cat !== prod.category) {
      prod.category = cat
      changed += 1
    }
  }

  // price
  if (typeof prod.price === 'number') {
    const rounded = roundToHundred(prod.price)
    if (rounded !== prod.price) {
      prod.price = rounded
      changed += 1
    }
  }

  // stock
  if (!Number.isInteger(prod.stock) || prod.stock < 0) {
    prod.stock = Math.max(0, Math.round(Number(prod.stock) || 0))
    changed += 1
  }

  return prod
})

if (changed > 0) {
  fs.writeFileSync(productsFile, JSON.stringify(data, null, 2), 'utf-8')
  console.log(`Harmonisation terminée : ${changed} champs modifiés.`)
} else {
  console.log('Aucune modification nécessaire lors de l\'harmonisation.')
}
