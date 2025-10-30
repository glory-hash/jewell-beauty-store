// scripts/generate-products.cjs
// -----------------------------
// Version CommonJS du script pour être compatible avec "type": "module" dans package.json.
const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const PRODUIT_DIR = path.join(ROOT, 'produit')
const OUT_FILE = path.join(ROOT, 'src', 'data', 'products.json')

function slugify(s) {
  return s.toString().toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function walk(dir) {
  const res = []
  const items = fs.readdirSync(dir, { withFileTypes: true })
  for (const it of items) {
    const full = path.join(dir, it.name)
    if (it.isDirectory()) {
      res.push(...walk(full))
    } else {
      const ext = path.extname(it.name).toLowerCase()
      if (['.png', '.jpg', '.jpeg', '.webp', '.gif'].includes(ext)) {
        res.push(full)
      }
    }
  }
  return res
}

function relUrl(file) {
  const rel = path.relative(ROOT, file).split(path.sep).join('/')
  return '/' + rel
}

function buildProducts() {
  if (!fs.existsSync(PRODUIT_DIR)) {
    console.error('Le dossier produit/ est introuvable :', PRODUIT_DIR)
    process.exit(1)
  }

  const files = walk(PRODUIT_DIR)
  const products = files.map((f) => {
    const parsed = path.parse(f)
    const category = path.basename(path.dirname(f))
    const name = parsed.name
    const id = slugify(name)
    return {
      id,
      name: name.replace(/[-_]+/g, ' '),
      price: 0,
      category: category.toLowerCase(),
      images: [relUrl(f)],
    }
  })

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true })
  fs.writeFileSync(OUT_FILE, JSON.stringify(products, null, 2), 'utf8')
  console.log('Generated', OUT_FILE, 'with', products.length, 'entries')
}

if (require.main === module) {
  buildProducts()
}

module.exports = { buildProducts }
