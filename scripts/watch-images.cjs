/**
 * scripts/watch-images.cjs
 *
 * Watcher simple qui détecte l'ajout de nouvelles images dans `public/produit`
 * et ré-exécute le script de synchronisation `sync-images.cjs`.
 *
 * Nécessite `chokidar`.
 * Usage : node scripts/watch-images.cjs [chemin_vers_dossier_images]
 */

const path = require('path')
const { spawn } = require('child_process')

const argPath = process.argv[2]
const projectRoot = process.cwd()
const imagesDir = argPath ? path.resolve(projectRoot, argPath) : path.join(projectRoot, 'public', 'produit')

let child = null

function runSync() {
  if (child) {
    // éviter de lancer plusieurs instances en parallèle
    return
  }
  child = spawn(process.execPath, [path.join(__dirname, 'sync-images.cjs'), imagesDir], { stdio: 'inherit' })
  child.on('close', () => {
    child = null
  })
}

// On essaye d'importer chokidar localement ; si absent, on sort avec un message.
let chokidar
try {
  chokidar = require('chokidar')
} catch (e) {
  console.error('Le paquet `chokidar` est requis pour watch-images. Installez-le : npm install --save-dev chokidar')
  process.exit(1)
}

console.log('Watcher images démarré sur', imagesDir)
const watcher = chokidar.watch(imagesDir, { persistent: true, ignoreInitial: false })

watcher.on('add', (p) => {
  console.log('Fichier ajouté:', p)
  runSync()
})

watcher.on('change', (p) => {
  console.log('Fichier modifié:', p)
  runSync()
})

watcher.on('ready', () => {
  console.log('Watcher prêt — toute nouvelle image déclenchera la synchro.')
})
