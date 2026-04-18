import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/gsap'
import { HeroFallback } from './HeroFallback'
import { profile } from '../../data/profile'
import { withBase } from '../../lib/withBase'
import type { Theme } from '../../hooks/useTheme'

const HeroCanvas = lazy(() =>
  import('./HeroCanvas').then((m) => ({ default: m.HeroCanvas })),
)

type Props = {
  useWebGL: boolean
  reducedMotion: boolean
  theme: Theme
}

export function HeroSection({ useWebGL, reducedMotion, theme }: Props) {
  const rootRef = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const el = rootRef.current
    if (!el || reducedMotion) return

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const x = ((e.clientX - r.left) / r.width) * 2 - 1
      const y = ((e.clientY - r.top) / r.height) * 2 - 1
      setMouse({ x, y: -y })
    }
    el.addEventListener('pointermove', onMove)
    return () => el.removeEventListener('pointermove', onMove)
  }, [reducedMotion])

  /** Parallaxe légère du panneau — désactivée sous 901px pour garder le bloc centré au tactile. */
  useEffect(() => {
    const panel = panelRef.current
    if (!panel || reducedMotion) return

    const mq = window.matchMedia('(max-width: 900px)')

    const clearTransform = () => {
      panel.style.transform = ''
    }

    const onMove = (e: PointerEvent) => {
      if (mq.matches) {
        clearTransform()
        return
      }
      const cx = window.innerWidth * 0.5
      const cy = window.innerHeight * 0.5
      const nx = (e.clientX - cx) / cx
      const ny = (e.clientY - cy) / cy
      const tx = nx * 9
      const ty = ny * -7
      const ry = nx * 2.2
      const rx = ny * -1.6
      panel.style.transform = `translate3d(${tx}px, ${ty}px, 0) perspective(900px) rotateY(${ry}deg) rotateX(${rx}deg)`
    }

    const onMq = () => {
      if (mq.matches) clearTransform()
    }

    mq.addEventListener('change', onMq)
    window.addEventListener('pointermove', onMove, { passive: true })
    onMq()
    return () => {
      mq.removeEventListener('change', onMq)
      window.removeEventListener('pointermove', onMove)
    }
  }, [reducedMotion])

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return

    const targets = panel.querySelectorAll<HTMLElement>('.hero-reveal')

    if (reducedMotion) {
      gsap.set(targets, { opacity: 1, y: 0, filter: 'none' })
      return
    }

    gsap.set(targets, { opacity: 0, y: 28, filter: 'blur(6px)' })
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      delay: 0.08,
    })
    tl.to(targets, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.75,
      stagger: 0.09,
    })

    return () => {
      tl.kill()
    }
  }, [reducedMotion])

  return (
    <section
      id="accueil"
      ref={rootRef}
      className="hero-section"
      aria-labelledby="hero-title"
    >
      {!useWebGL ? (
        <HeroFallback />
      ) : (
        <Suspense fallback={<HeroFallback />}>
          <HeroCanvas mouse={mouse} theme={theme} />
        </Suspense>
      )}

      <div className="hero-section__layout">
        <div
          ref={panelRef}
          className="hero-section__panel"
          style={{ willChange: reducedMotion ? undefined : 'transform' }}
        >
          <p className="hero-eyebrow hero-reveal">
            <span className="hero-eyebrow__inner">Portfolio développeur</span>
          </p>

          <h1 id="hero-title" className="hero-title hero-reveal">
            <span className="hero-title__line">
              <span className="hero-title__first">Alexis</span>{' '}
              <span className="hero-title__last">Mathieu</span>
            </span>
            <span className="hero-title__role">{profile.title}</span>
          </h1>

          <p className="hero-lead hero-reveal">{profile.tagline}</p>
          <p className="hero-sub hero-reveal">{profile.heroIntro}</p>

          <ul className="hero-badges hero-reveal" aria-label="Axes principaux">
            <li>GitHub</li>
            <li>3D &amp; rendu</li>
            <li>Web &amp; langages</li>
          </ul>

          <div className="hero-cta hero-reveal">
            <a className="btn btn--primary" href="#projets">
              Voir les projets
            </a>
            <a className="btn btn--ghost" href="#contact">
              Me contacter
            </a>
            <a className="btn btn--outline" href={withBase('cv.pdf')} download>
              Télécharger le CV
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
