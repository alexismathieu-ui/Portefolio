import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { Theme } from '../../hooks/useTheme'
import { profile } from '../../data/profile'
import { withBase } from '../../lib/withBase'

const nav = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#apropos', label: 'À propos' },
  { href: '#projets', label: 'Projets' },
  { href: '#contact', label: 'Contact' },
]

type Props = {
  activeId: string
  theme: Theme
  onToggleTheme: () => void
  onNavigate?: () => void
}

export function Header({ activeId, theme, onToggleTheme, onNavigate }: Props) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) document.body.classList.add('nav-open')
    else document.body.classList.remove('nav-open')
    return () => document.body.classList.remove('nav-open')
  }, [open])

  const handleNav = () => {
    setOpen(false)
    onNavigate?.()
  }

  return (
    <header className="site-header">
      <a className="site-header__brand" href="#accueil" onClick={handleNav}>
        <span className="site-header__dot" aria-hidden />
        {profile.brandName}
      </a>

      <nav className="site-header__nav" aria-label="Navigation principale">
        <ul>
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={
                  activeId === item.href.slice(1) ? 'is-active' : undefined
                }
                onClick={handleNav}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="site-header__actions">
        <a className="btn btn--ghost btn--sm" href={withBase('cv.pdf')} download>
          CV
        </a>
        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={
            theme === 'dark'
              ? 'Activer le thème clair'
              : 'Activer le thème sombre'
          }
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>
        <button
          type="button"
          className="site-header__burger"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            className="site-header__mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} onClick={handleNav}>
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={withBase('cv.pdf')} download onClick={handleNav}>
                  Télécharger le CV
                </a>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
