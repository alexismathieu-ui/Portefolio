import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/gsap'

type Props = {
  onComplete: () => void
  reducedMotion: boolean
}

const MIN_MS = 900

/**
 * Overlay de chargement : attend window.load + durée minimale, puis sortie animée.
 * `aria-live` informe les lecteurs d’écran que le chargement se termine.
 */
export function SiteLoader({ onComplete, reducedMotion }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState('Chargement en cours…')

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const start = performance.now()
    let cancelled = false

    const finish = () => {
      if (cancelled) return
      setStatus('Contenu prêt.')
      const inner = el.querySelector('.site-loader__inner')

      const exit = () => {
        onComplete()
      }

      if (reducedMotion) {
        el.setAttribute('aria-hidden', 'true')
        el.setAttribute('aria-busy', 'false')
        exit()
        return
      }

      gsap
        .timeline({
          defaults: { ease: 'power3.inOut' },
          onComplete: () => {
            el.setAttribute('aria-hidden', 'true')
            el.setAttribute('aria-busy', 'false')
            exit()
          },
        })
        .to(inner, { opacity: 0, y: -12, duration: 0.35 })
        .to(
          el,
          {
            clipPath: 'inset(0 0 100% 0)',
            duration: 0.55,
          },
          '-=0.1',
        )
    }

    const onWindowLoad = () => {
      const elapsed = performance.now() - start
      const wait = Math.max(0, MIN_MS - elapsed)
      window.setTimeout(finish, wait)
    }

    if (document.readyState === 'complete') {
      onWindowLoad()
    } else {
      window.addEventListener('load', onWindowLoad, { once: true })
    }

    return () => {
      cancelled = true
      window.removeEventListener('load', onWindowLoad)
    }
  }, [onComplete, reducedMotion])

  return (
    <div
      ref={rootRef}
      className="site-loader"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="site-loader__inner">
        <div className="site-loader__ring" aria-hidden />
        <p className="site-loader__label">{status}</p>
      </div>
    </div>
  )
}
