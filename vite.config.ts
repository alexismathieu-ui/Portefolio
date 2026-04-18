import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * GitHub Pages — site « projet » : https://user.github.io/nom-du-depot/
 * Dépôt USERNAME.github.io (site utilisateur) : base à la racine `/`.
 */
function githubPagesBase(): string {
  if (process.env.VITE_BASE_PATH) {
    const b = process.env.VITE_BASE_PATH
    return b.endsWith('/') ? b : `${b}/`
  }
  const full = process.env.GITHUB_REPOSITORY
  if (!full) return '/'
  const repo = full.split('/')[1]
  if (!repo) return '/'
  if (repo.endsWith('.github.io')) return '/'
  return `/${repo}/`
}

// https://vite.dev/config/
export default defineConfig({
  base: githubPagesBase(),
  plugins: [react()],
  resolve: {
    dedupe: ['three'],
  },
})
