import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'portfolio-pro-theme'

export type Theme = 'light' | 'dark'

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
      if (stored === 'light' || stored === 'dark') return stored
    } catch {
      /* ignore */
    }
    return getSystemTheme()
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  const setTheme = useCallback((t: Theme) => setThemeState(t), [])
  const toggleTheme = useCallback(
    () => setThemeState((t) => (t === 'dark' ? 'light' : 'dark')),
    [],
  )

  return { theme, setTheme, toggleTheme }
}
