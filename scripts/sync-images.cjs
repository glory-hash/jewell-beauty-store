/**
 * scripts/sync-images.cjs
 *
 * Script utilitaire pour synchroniser les images placées dans `public/produit`
 * avec le fichier `src/data/products.json`.
 *
 * Comportement :
 * - Parcourt récursivement le dossier d'images (par défaut `public/produit`).
 * - Pour chaque image trouvée, tente d'associer un produit existant dans
 *   `src/data/products.json` en utilisant :
 *     1) l'`id` du produit (exact) ;
 *     2) un slug calculé à partir du `name` (ex: "Montre Dorée" -> "montre-doree") ;
 *     3) la présence du slug ou de l'id dans le nom de fichier ;
 *     4) la catégorie (nom du sous-dossier) si aucun match direct.
 * - Ajoute le chemin relatif (ex: `/produit/Montres/monimage.jpg`) dans
 *   `product.images` s'il n'est pas déjà présent.
 * - Ecrit `src/data/products.json` avec les modifications.
 *
 * Usage (depuis la racine du projet) :
 *   node scripts/sync-images.cjs [chemin_vers_dossier_images]
 * Exemple :
 *   node scripts/sync-images.cjs "public/produit"
 */

const fs = require('fs')
const path = require('path')

const argPath = process.argv[2]
const projectRoot = process.cwd()
const imagesDir = argPath ? path.resolve(projectRoot, argPath) : path.join(projectRoot, 'public', 'produit')
const productsFile = path.join(projectRoot, 'src', 'data', 'products.json')

function slugify(s) {
  return String(s)
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
}

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
    // si le chemin n'inclut pas `public`, on essaie de trouver `produit`
    const prodIdx = parts.findIndex((p) => p.toLowerCase() === 'produit')
    if (prodIdx === -1) return null
    const sub = parts.slice(prodIdx)
    return '/' + sub.join('/')
  }
  const sub = parts.slice(idx + 1)
  return '/' + sub.join('/')
}

function loadProducts() {
  if (!fs.existsSync(productsFile)) {
    console.error('Fichier products.json introuvable:', productsFile)
    process.exit(1)
  }
  const raw = fs.readFileSync(productsFile, 'utf-8')
  try {
    return JSON.parse(raw)
  } catch (err) {
    console.error('Erreur parsing products.json :', err)
    process.exit(1)
  }
}

function saveProducts(obj) {
  const data = JSON.stringify(obj, null, 2)
  fs.writeFileSync(productsFile, data, 'utf-8')
}

function findMatch(products, filename, folderName) {
  const base = path.basename(filename)
  const nameNoExt = base.replace(path.extname(base), '')
  const lowered = nameNoExt.toLowerCase()

  // 1) match exact id
  let p = products.find((prod) => prod.id && prod.id.toLowerCase() === lowered)
  if (p) return p

  // 2) match slug of name
  p = products.find((prod) => {
    if (!prod.name) return false
    const s = slugify(prod.name)
    if (s === nameNoExt.toLowerCase()) return true
    // also check inclusion
    if (lowered.includes(s)) return true
    if (String(prod.id).toLowerCase() && lowered.includes(String(prod.id).toLowerCase())) return true
    return false
  })
  if (p) return p

  // 3) Try match by category (folder name)
  if (folderName) {
    const folderLower = folderName.toLowerCase()
    p = products.find((prod) => prod.category && String(prod.category).toLowerCase() === folderLower)
    if (p) return p
  }

  return null
}

function run() {
  console.log('Synchronisation images → products.json')
  console.log('Images directory:', imagesDir)
  const files = walk(imagesDir)
  console.log(`Fichiers images trouvés: ${files.length}`)

  const data = loadProducts()
  if (!Array.isArray(data.products)) data.products = []
  const products = data.products

  let updated = 0
  let associated = 0
  let orphan = 0

  files.forEach((full) => {
    const rel = pathFromPublic(full)
    if (!rel) return
    const parts = rel.split('/')
    // ex: ['', 'produit', 'Montres', 'file.jpg'] -> folderName = 'Montres'
    const folderName = parts.length >= 3 ? parts[2] : null

    const match = findMatch(products, full, folderName)
    if (match) {
      associated += 1
      match.images = match.images || []
      if (!match.images.includes(rel)) {
        match.images.push(rel)
        updated += 1
      }
    } else {
      orphan += 1
      // Ne pas créer automatiquement un produit par défaut sans validation.
      // On se contente d'afficher les fichiers orphelins pour que l'utilisateur
      // puisse les renommer ou créer manuellement les produits.
    }
  })

  if (updated > 0) {
    saveProducts(data)
    console.log(`Mise à jour : ${updated} images ajoutées à des produits existants.`)
  } else {
    console.log('Aucune modification nécessaire dans products.json.')
  }

  if (orphan > 0) {
    console.log(`Fichiers orphelins (non associés) : ${orphan}. Renommez-les ou créez manuellement les produits.`)
  }
  console.log(`Traitement terminé. ${associated} images associées, ${updated} ajoutées, ${orphan} orphelines.`)
}

run()
