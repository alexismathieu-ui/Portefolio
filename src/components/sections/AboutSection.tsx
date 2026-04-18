import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { profile } from '../../data/profile'

type Props = { reducedMotion: boolean }

export function AboutSection({ reducedMotion }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const headRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const head = headRef.current
    const items = itemsRef.current
    if (!section || !head || !items) return

    if (reducedMotion) {
      gsap.set([head, items.children], { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.from(head, {
        opacity: 0,
        y: 36,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 72%',
          toggleActions: 'play none none reverse',
        },
      })
      gsap.from(items.children, {
        opacity: 0,
        y: 28,
        stagger: 0.1,
        duration: 0.55,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: items,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      })
    }, section)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section id="apropos" ref={sectionRef} className="section about">
      <div ref={headRef} className="section__head">
        <h2>À propos</h2>
        <p className="section__intro">
          Parcours, méthode de travail et ce qui me motive au quotidien.
        </p>
      </div>
      <div className="about__grid">
        <div className="about__bio">
          {profile.bio.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <div ref={itemsRef} className="about__timeline">
          {profile.timeline.map((item) => (
            <article
              key={`${item.year}-${item.role}`}
              className="timeline-card"
            >
              <span className="timeline-card__year">{item.year}</span>
              <h3>{item.role}</h3>
              <p className="timeline-card__org">{item.org}</p>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
