# Jewell Beauty Store

Bienvenue dans le projet "Jewell Beauty Store" — une application e‑commerce front-end créée avec Vite, React et TypeScript. Ce dépôt sert de starter pour une boutique de bijoux et accessoires, avec intégration Tailwind CSS, React Router, gestion d'un panier et pages principales déjà prêtes.

Toutes les instructions ci‑dessous sont en français pour faciliter la compréhension et la maintenance.

## Objectifs du projet
- Starter e‑commerce avec : React + TypeScript, Vite, Tailwind CSS
- Pages incluses : Accueil, Catalogue, Détail produit (galerie), Panier, Paiement, Confirmation, À propos, Contact
- Composants réutilisables : Header, Footer, ProductCard, ProductGallery, CartItem, Filters, Breadcrumb, PromoBanner, SearchBar
- Contexte `CartContext` pour la gestion du panier

## Structure importante

- `src/` : code source React
  - `components/` : composants réutilisables
  - `pages/` : pages principales (Catalog, ProductDetail, Cart...)
  - `contexts/CartContext.tsx` : logique du panier
  - `data/products.json` : fichier JSON des produits (mock / généré)
- `produit/` : dossier racine contenant les images des produits (sous-dossiers autorisés)
- `Img/` : assets (ex: logo)

## Logo de la boutique (inséré dans l'entête)

- Le logo utilisé dans l'entête est placé dans `public/logo-jewel.svg` et est affiché automatiquement par le composant `src/components/Header.tsx`.
- Comportement ajouté : cliquer sur le logo ouvre un aperçu (modal) pour voir le logo en grand. Le modal est accessible et se ferme avec le bouton "Fermer" ou la touche Esc.
- Remplacer par ton image fournie : si tu préfères utiliser l'image PNG que tu m'as envoyée, copie-la dans le dossier `public/` et nomme-la `logo-jewel.png`. Le composant `Header` utilise `/logo-jewel.svg` par défaut ; pour utiliser le PNG, tu peux soit :
  - renommer `logo-jewel.png` en `logo-jewel.svg` (remplacer le fichier existant), ou
  - modifier `src/components/Header.tsx` pour utiliser `/logo-jewel.png` à la place de `/logo-jewel.svg`.

Exemple rapide (PowerShell) pour remplacer le logo :

```powershell
# Copier ton image (ex: depuis le dossier Téléchargements)
copy "C:\Users\<ton-username>\Downloads\ma-image.png" "public\\logo-jewel.png"

# (optionnel) modifier le composant pour pointer vers .png si tu préfères garder l'ancien svg
# ou renommer le fichier en logo-jewel.svg pour ne rien changer au code.
```

Les commentaires explicatifs en français ont été ajoutés dans `src/components/Header.tsx` pour expliquer le fonctionnement du logo et du modal.

## Pré-requis
- Node.js (>= 18 recommandé)
- npm

## Installation

Ouvrir un terminal PowerShell (Windows) et exécuter :

```powershell
cd "C:\Users\L.A.M.A.N.O\Pictures\Nouveau dossier\jewell-beauty-store"
npm install
```

## Commandes utiles

- Démarrer le serveur de développement :

```powershell
npm run dev
```

- Construire pour la production :

```powershell
npm run build
```

- Générer / régénérer automatiquement `src/data/products.json` à partir des images présentes dans `produit/` :

```powershell
npm run generate:products
```

- Télécharger les images placeholder (utilisées sur la page d'accueil) pour les rendre disponibles hors-ligne :

```powershell
npm run download:placeholders
```

Le script télécharge plusieurs images dans `public/placeholder-images/`. Après exécution, les images de l'accueil s'afficheront même sans connexion Internet.

Le script `generate:products` parcourt le dossier `produit/`, crée un objet produit par image trouvée (id basé sur le nom de fichier) et écrit `src/data/products.json` (écrase le fichier existant). Après exécution, tu peux corriger les prix, catégories, noms ou ajouter d'autres champs manuellement.

## Comment ajouter des images produits

1. Copier les images dans `produit/` (tu peux organiser par sous-dossiers : `Parfums/`, `Montres/`, `Chaines/`, ...).
2. Lancer `npm run generate:products` pour régénérer `src/data/products.json`.
3. Ouvrir `src/data/products.json` et ajuster : `name`, `price`, `category`, `images[]` si nécessaire.

## Import automatique des images (synchronisation)

Vous pouvez désormais coller directement vos images dans `public/produit` (ou un sous-dossier)
et lancer une synchronisation automatique qui associe les images aux produits existants
dans `src/data/products.json`.

Conventions supportées (configurées pour être tolérantes) :
- Option A (recommandée) : le nom de fichier contient l'`id` ou le `slug` du produit
  (ex: `watch-gold-1.jpg` ou `montre-doree-1.jpg`). Le script tentera une correspondance
  par `id`, puis par slug calculé à partir du `name` du produit, puis par inclusion.
- Option B : organisation par sous-dossier catégoriel (ex: `public/produit/Montres/`),
  le script utilisera le nom du dossier (`Montres`) pour aider à retrouver un produit
  dont la `category` correspond.

Comportement choisi :
- Mode automatique : un watcher peut être lancé pour détecter les nouveaux fichiers et
  relancer la synchronisation.
- Les images non associées (orphelines) sont listées en sortie. Le script n'ajoute
  pas automatiquement de nouveau produit sans validation humaine.

Commandes :

```powershell
# synchroniser maintenant (manuel)
npm run sync-images

# lancer le watcher (démarre un processus qui écoute les ajouts/modifs)
npm run watch-images
```

Le script utilise comme dossier par défaut `public/produit`. Si vous souhaitez
indiquer un dossier différent, vous pouvez passer le chemin en argument à la commande :

```powershell
node scripts/sync-images.cjs "public/produit"
```

Notes techniques et sécurité :
- Le script `sync-images.cjs` met à jour `src/data/products.json` en ajoutant les
  chemins d'images trouvés (`/produit/...`). Il n'écrase pas d'autres champs.
- Les fichiers orphelins sont signalés pour être traités manuellement (renommage
  ou création d'un produit dans `products.json`).
- Pour le watcher (`watch-images`), la dépendance `chokidar` est utilisée. Installez
  les dépendances via `npm install` si nécessaire.

Exemple de flux recommandé :
1. Coller les images dans `public/produit`.
2. Exécuter `npm run sync-images` (ou laisser `npm run watch-images` actif).
3. Ouvrir `src/data/products.json` pour valider les correspondances et compléter
   les informations manquantes (prix, description, stock...).

## Argumentation des choix techniques et de standardisation

Pour garantir une expérience cohérente et faciliter la maintenance, plusieurs automatisations
et conventions ont été ajoutées au projet. Voici pourquoi et comment elles ont été appliquées :

- Harmonisation des libellés (noms / descriptions) :
  - Raison : noms incohérents (majuscules/accents/typos) rendent la navigation moins professionnelle
    et compliquent les recherches/filtering. Une convention Title Case augmente la lisibilité.
  - Action : script `scripts/harmonize-products.cjs` — nettoie espaces, corrige fautes courantes,
    met en Title Case, normalise catégories.

- Standardisation des prix et du stock :
  - Raison : garantir un affichage uniforme et faciliter la comparaison (ex: pas de décimales inappropriées).
  - Action : arrondir au cent (100 FCFA) et s'assurer que `stock` est un entier positif.

- Gestion des images et exposition dans le catalogue :
  - Raison : parfois une seule fiche produit contenait plusieurs images ; pour présenter
    visuellement chaque image comme un produit distinct en vitrine, nous pouvons exposer
    chaque image comme produit (utile pour les présentations e-commerce ou tests A/B).
  - Action : `scripts/expand-images-to-products.cjs` crée des produits additionnels basés
    sur chaque image (placeholders) ; vous pouvez ensuite nettoyer/ajuster ces fiches.

- Synchronisation automatique :
  - Raison : facilitation du flux de travail pour ajouter rapidement des lots d'images.
  - Action : `scripts/sync-images.cjs` associe images → produits par id/slug/catégorie ;
    `scripts/watch-images.cjs` permet d'automatiser la détection des ajouts.

Ces outils sont conçus pour le prototypage rapide et ne remplacent pas une API produit
professionnelle. Ils permettent cependant de gagner du temps lors de l'import initial
de contenu et d'améliorer l'uniformité visuelle du catalogue.

Si vous souhaitez que je mette en place des règles plus strictes (ex : refuser les noms
de fichiers non conformes, créer automatiquement des produits enrichis depuis une template,
ou intégrer un mini UI d'administration), je peux aussi le faire.

Conseil : utiliser des noms de fichiers lisibles (ex : `montre-doree-1.jpg`) afin que le generator produise des `id` et `name` propres.

## Comment fonctionne le mapping image → produit

- Les composants `ProductCard` et `ProductDetail` cherchent d'abord la propriété `product.images` (si fournie par l'API / JSON). Si non fournie, `ProductCard` utilise `import.meta.glob` pour référencer automatiquement les fichiers présents dans `produit/` et tenter de trouver la meilleure image selon l'id, slug du nom ou catégorie.
- Le script `generate-products.js` génère des objets produits basiques à partir des fichiers images (nom → `name`, slug → `id`, chemin relatif → `images[0]`).

## Mettre à jour le README

Ce README doit être maintenu à jour au fil des évolutions. Procédure recommandée :

1. Faire la modification du contenu / ajout de fonctionnalité.
2. Mettre à jour les sections correspondantes du README (ex: commandes, structure).
3. Commit et push le README.

Je peux aussi garder ce README synchronisé automatiquement si tu veux que j'ajoute des scripts ou des conventions pour l'update (ex: template de changelog, ou génération partielle depuis les fichiers sources).

## Développement futur / améliorations possibles

- Intégration d'une API réelle (produits / panier / commandes)
- Intégration d'un fournisseur de paiement (Stripe, PayPal)
- Persistance du panier (localStorage ou côté serveur)
- Tests unitaires pour `CartContext` et composants critiques
- Amélioration de l'accessibilité et du SEO

## Nouveautés locales : Auth, Modal, Tooltip et Toast

Dans cette branche locale, plusieurs améliorations UX ont été ajoutées côté client
pour améliorer le parcours d'achat et la conversion :

- Authentification mock (client-only) :
  - `AuthProvider` simule la gestion des comptes via `localStorage` (clé `mock_users`).
  - `register` renvoie un token de vérification (simulation) stocké sous `mock_verifications`.
  - `verifyEmail(token)` marque l'email comme vérifié.
  - `sendResetPassword(email)` et `resetPassword(token,newPassword)` simulent la réinitialisation.
  - Ces méthodes sont utiles pour prototyper les flux d'inscription, vérification et reset sans backend.

- Modal de connexion contextualisée :
  - `AuthModal` (composant réutilisable) permet de se connecter depuis n'importe quel point de l'interface
    (par ex. lorsqu'un utilisateur tente d'ajouter un produit au panier alors qu'il n'est pas connecté).
  - Le modal préserve l'intention de l'utilisateur (ex: ajouter un produit) et exécute l'action après
    connexion réussie (flow « preserve intent »). Ceci évite une redirection brutale vers une page de login.

- Tooltip stylisé :
  - `Tooltip` remplace les tooltips natifs sur les boutons produits déconseillés pour afficher
    des informations contextuelles (ex : "Connectez-vous pour ajouter ce produit à votre panier").
  - Comportement : apparait au hover et au focus (accessible au clavier), avec flèche et légère animation.

- Confirmation visuelle (Toast) :
  - `Toast` affiche des notifications temporaires en bas à droite (success / error / info).
  - Exemple d'usage : lorsque l'utilisateur se connecte via le modal et qu'un article est automatiquement
    ajouté au panier, un toast confirme l'ajout.

Ces éléments sont volontairement simulés côté client pour le prototypage rapide. Pour une version
production, il est recommandé d'intégrer un backend / service d'auth réel (Firebase Auth, Auth0, ou
une API REST/GraphQL) et de remplacer le stockage local par des appels sécurisés aux endpoints.

## Commentaires dans le code (ajouts récents)

Pour faciliter la maintenance et l'onboarding, des commentaires explicatifs en français ont été ajoutés
dans plusieurs fichiers clés du projet. Ils expliquent le rôle des fichiers et donnent des indications
rapides sur l'usage et les points à améliorer (accessibilité, focus-trap, tokens thème, etc.).

Exemples de fichiers commentés :
- `src/main.tsx` : point d'entrée et montage de `App`
- `src/components/Modal.tsx` : usage et notes accessibilité/interop
- `src/components/Toast.tsx` : utilisation et durée par défaut
- `src/components/AuthModal.tsx` : flux login/signup/forgot, validation en temps réel
- `src/contexts/AuthContext.tsx` : simulation JWT (access + refresh), méthodes exposées
- `src/contexts/ProductsContext.tsx` : source des données produits et helpers
- `src/utils/api.ts` : point central pour les appels réseau (configurable)

Si vous souhaitez que j'applique les commentaires à d'autres fichiers automatiquement
(pages, composants, utils), dites-le et je peux parcourir tout le dossier `src/` pour ajouter
des en-têtes concis dans chaque fichier.

## Standardisation de la devise et du format des prix

Changement appliqué : les affichages de prix ont été standardisés sur la monnaie locale
"FCFA" et un format lisible (séparateur de milliers par espace, pas de décimales). Cela
corrige les problèmes observés où certains composants affichaient des prix en euros
(`€12000.00`) ou utilisaient des formats incohérents.

Détails techniques :
- Un utilitaire central `src/utils/price.ts` fournit désormais `formatPrice(price: number)`
  qui renvoie par exemple `12 000 FCFA` (usage recommandé partout dans l'app).
- `formatPriceWithSpaces` existe comme alias historique et appelle `formatPrice`.
- J'ai mis à jour les composants suivants pour utiliser l'utilitaire central :
  - `src/components/CartItem.tsx` (prix unitaire et total ligne)
  - `src/pages/Cart.tsx` (total du panier et texte de confirmation)
  - Les autres composants (`ProductCard`, `ProductDetail`, `Header`, `Checkout`) utilisent
    déjà `formatPrice` et bénéficieront automatiquement de cette normalisation.

Pourquoi ce choix ?
- Lisibilité : les espaces comme séparateurs de milliers sont plus lisibles pour les montants
  importants (ex: `15 000` plutôt que `15000` ou `15,000`).
- Cohérence : centraliser le format évite les divergences visuelles entre pages.
- Facilité d'internationalisation : si vous souhaitez changer de devise ou locale
  (ex: passer à USD), il suffira de modifier `src/utils/price.ts` pour ajuster la
  `toLocaleString` ou utiliser un formatter plus avancé.

Comment modifier si besoin :
- Pour changer la devise (ex: EUR), editez `src/utils/price.ts` et remplacez
  `price.toLocaleString('fr-FR', { maximumFractionDigits: 0 }) + ' FCFA'` par
  `price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })`.
- Pour ajouter / enlever décimales, ajustez `maximumFractionDigits`.

Si vous voulez, j'uniformise aussi les messages marketing (ex: `PromoBanner`) pour
ne plus afficher de références à une devise différente (ex : `100€`) — je peux
remplacer ces messages par `100 000 FCFA` ou une logique dynamique.

## Test rapide des nouvelles fonctionnalités

1. Lancer le serveur de dev :

```powershell
npm run dev
```

2. Flow d'ajout protégé :
- Ouvrir un produit (ex: `/product/<id>`).
- Cliquer sur "Se connecter pour acheter" si vous êtes déconnecté : un modal s'ouvre.
- Se connecter (ou s'inscrire via le lien) ; après connexion, le produit est ajouté automatiquement
  et un toast confirme l'ajout.

3. Vérification / reset :
- Après l'inscription, vous arrivez sur `/verify-sent` : cliquer sur "Vérifier mon email" simule la
  vérification côté client. Pour la réinitialisation, `/forgot` génère un lien simulé vers `/reset-password`.

Si vous souhaitez que je remplace la simulation par une intégration Firebase (auth + email verification),
je peux ajouter les fichiers de configuration et le code client pour l'initialisation et les flows.

---

Si tu veux, je peux maintenant :
- exécuter `npm run generate:products` pour regénérer `src/data/products.json` (je peux le faire à tout moment),
- ou automatiser la mise à jour du README lors de changements importants (proposition : ajouter un script `npm run doc:update` qui insère un bloc CHANGELOG automatique). 

Dis-moi ce que tu préfères et je procède.
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
