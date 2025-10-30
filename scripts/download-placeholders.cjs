#!/usr/bin/env node
// Télécharge les images placeholder dans public/placeholder-images
const https = require('https')
const fs = require('fs')
const path = require('path')

const outDir = path.resolve(__dirname, '..', 'public', 'placeholder-images')
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

const images = [
  { name: 'hero.jpg', url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070' },
  { name: 'parfums.jpg', url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=2048' },
  { name: 'bijoux.jpg', url: 'https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?q=80&w=2070' },
  { name: 'montres.jpg', url: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2080' },
  { name: 'product.jpg', url: 'https://images.unsplash.com/photo-1517613367530-b0570f49a3d3?q=80&w=2070' },
]

function download(image) {
  return new Promise((resolve, reject) => {
    const dest = path.join(outDir, image.name)
    const file = fs.createWriteStream(dest)
    https.get(image.url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download ${image.url} - status ${res.statusCode}`))
        return
      }
      res.pipe(file)
      file.on('finish', () => file.close(() => resolve(dest)))
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err))
    })
  })
}

;(async function main(){
  console.log('Téléchargement des images placeholder dans', outDir)
  for (const img of images) {
    try {
      const p = await download(img)
      console.log('Téléchargé:', p)
    } catch (err) {
      console.error('Erreur pour', img.url, err.message)
    }
  }
  console.log('Terminé.')
})()
