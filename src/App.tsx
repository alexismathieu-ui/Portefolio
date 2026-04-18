import { useEffect, useRef, useState } from 'react'
import { ScrollTrigger } from './lib/gsap'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import { useTheme } from './hooks/useTheme'
import { useLenis } from './hooks/useLenis'
import { useHeroWebGL } from './hooks/useHeroWebGL'
import { SiteLoader } from './components/layout/SiteLoader'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { HeroSection } from './components/hero/HeroSection'
import { AboutSection } from './components/sections/AboutSection'
import { SkillsSection } from './components/sections/SkillsSection'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { ContactSection } from './components/sections/ContactSection'
import { PageAmbience } from './components/layout/PageAmbience'

const SECTION_IDS = ['accueil', 'apropos', 'projets', 'contact'] as const

function App() {
  const { theme, toggleTheme } = useTheme()
  const reducedMotion = usePrefersReducedMotion()
  const useWebGL = useHeroWebGL(reducedMotion)
  useLenis(!reducedMotion)

  const [loaderDone, setLoaderDone] = useState(false)
  const [activeId, setActiveId] = useState<string>('accueil')
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!loaderDone) return

    const triggers = SECTION_IDS.map((id) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top 55%',
        end: 'bottom 45%',
        onToggle: (self) => {
          if (self.isActive) setActiveId(id)
        },
      }),
    )

    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })

    return () => {
      triggers.forEach((t) => t.kill())
    }
  }, [loaderDone])

  return (
    <>
      {!loaderDone ? (
        <SiteLoader
          reducedMotion={reducedMotion}
          onComplete={() => {
            setLoaderDone(true)
            requestAnimationFrame(() => ScrollTrigger.refresh())
          }}
        />
      ) : null}

      <a
        className="skip-link"
        href="#contenu"
        onClick={(e) => {
          e.preventDefault()
          mainRef.current?.scrollIntoView({
            behavior: reducedMotion ? 'auto' : 'smooth',
            block: 'start',
          })
          window.requestAnimationFrame(() => mainRef.current?.focus())
        }}
      >
        Aller au contenu
      </a>

      <PageAmbience reducedMotion={reducedMotion} />

      <Header
        activeId={activeId}
        theme={theme}
        onToggleTheme={toggleTheme}
        onNavigate={() => mainRef.current?.focus()}
      />

      <main id="contenu" ref={mainRef} tabIndex={-1} className="site-main">
        <HeroSection
          useWebGL={useWebGL}
          reducedMotion={reducedMotion}
          theme={theme}
        />
        <AboutSection reducedMotion={reducedMotion} />
        <SkillsSection reducedMotion={reducedMotion} />
        <ProjectsSection reducedMotion={reducedMotion} />
        <ContactSection />
      </main>

      <Footer />
    </>
  )
}

export default App

