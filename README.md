# Portfolio — Alexis MATHIEU (portfolio-pro)

Site portfolio statique construit avec **Vite**, **React**, **TypeScript**, **GSAP** (ScrollTrigger), **Framer Motion**, **Lenis** (scroll fluide) et **Three.js / React Three Fiber** pour la sphère du hero. Profil et dépôts alignés sur [github.com/alexismathieu-ui](https://github.com/alexismathieu-ui).

## Mettre le projet sur GitHub et le publier (GitHub Pages)

1. **Créer un dépôt** sur GitHub (vide, sans ajouter de README si tu pousses depuis ton PC).
2. **À la racine du dossier** `portfolio-pro` :

   ```bash
   git init
   git add .
   git commit -m "Portfolio Vite + React"
   git branch -M main
   git remote add origin https://github.com/TON_USER/TON_REPO.git
   git push -u origin main
   ```

3. **Activer Pages** : sur le dépôt GitHub → **Settings** → **Pages** → **Build and deployment** → **Source** : **GitHub Actions** (pas « Deploy from a branch »).
4. Un **workflow** (`.github/workflows/deploy-github-pages.yml`) lance le build à chaque push sur `main` ou `master` et publie le dossier `dist`. Après la première exécution réussie, l’URL s’affiche dans **Settings → Pages** (souvent `https://TON_USER.github.io/TON_REPO/`).

**Dépôt de site utilisateur** (`USERNAME.github.io`) : l’URL est `https://USERNAME.github.io/` ; le `base` Vite reste `/` automatiquement.

**Tester un build « sous-chemin » en local** (optionnel) :

```bash
set GITHUB_REPOSITORY=ton-user/ton-repo
npm run build
npm run preview
```

Sur PowerShell : `$env:GITHUB_REPOSITORY='ton-user/ton-repo'; npm run build`. Tu peux aussi forcer la base avec `VITE_BASE_PATH=/mon-sous-chemin/`.

## Démarrage

```bash
npm install
npm run dev
```

Build de production :

```bash
npm run build
npm run preview
```

## Personnalisation

- **Profil, bio, compétences, liens** : modifiez [`src/data/profile.ts`](src/data/profile.ts) (notamment `email` et `social`).
- **Projets** : [`src/data/projects.ts`](src/data/projects.ts) — remplacez les URLs d’images par vos captures locales si besoin (`import` depuis `src/assets` ou fichiers dans `public/`).
- **CV** : le fichier [`public/cv.pdf`](public/cv.pdf) correspond au CV d’Alexis (copie depuis le dossier Téléchargements). Remplacez-le après une mise à jour du CV si besoin.

## Accessibilité & performances

- Le hero **WebGL** est désactivé sur petits écrans (`max-width: 900px`), si le CPU est faible (`hardwareConcurrency < 4`) ou si l’utilisateur a **`prefers-reduced-motion`** : un **fond CSS** animé prend le relais.
- **Lenis** est désactivé lorsque `prefers-reduced-motion` est activé.

## Ancien site statique

Un brouillon HTML/CSS reste à la racine du dossier parent : `portfolio-developpeur.html` (non modifié par ce projet).

## Messages dans la console du navigateur

- **« Download the React DevTools… »** : simple invitation en **mode développement** (`npm run dev`). Ce n’est pas une erreur ; en build production elle n’apparaît pas.
- **`THREE.Clock` déprécié** : le projet utilise **`three@0.182.0`** (sans ce message). Si tu le vois encore, supprime `node_modules`, réinstalle avec `npm install`, ou vide le cache du navigateur (souvent une vieille version de `three` en cache).
- **`chrome-extension://… querySelector`** : erreur d’une **extension Chrome** (souvent un thème / injecteur de styles), **pas du portfolio**. Teste en navigation privée sans extensions ou désactive l’extension indiquée dans l’URL.
