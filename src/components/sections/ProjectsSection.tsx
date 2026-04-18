import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { projects } from '../../data/projects'
import { ProjectCard } from '../projects/ProjectCard'

type Props = { reducedMotion: boolean }

export function ProjectsSection({ reducedMotion }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const grid = gridRef.current
    if (!section || !grid) return

    if (reducedMotion) {
      gsap.set(grid.children, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.from(grid.children, {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      })
    }, section)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section id="projets" ref={sectionRef} className="section projects">
      <div className="section__head">
        <h2>Projets</h2>
        <p className="section__intro">
          Une sélection de réalisations récentes — cartes interactives, images lazy-loadées.
        </p>
      </div>
      <div ref={gridRef} className="projects__grid">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  )
}
