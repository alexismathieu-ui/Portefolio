/**
 * Préfixe les chemins publics avec `import.meta.env.BASE_URL`
 * (ex. `/nom-du-depot/` sur GitHub Pages « projet »).
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL
  const p = path.startsWith('/') ? path.slice(1) : path
  return `${base}${p}`
}
