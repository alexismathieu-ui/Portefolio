import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { profile } from '../../data/profile'

type Props = { reducedMotion: boolean }

export function SkillsSection({ reducedMotion }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const barsRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const root = barsRef.current
    if (!section || !root) return

    const fills = root.querySelectorAll<HTMLElement>('.skill-bar__fill')

    if (reducedMotion) {
      fills.forEach((el) => {
        const v = el.dataset.value
        if (v) el.style.width = `${v}%`
      })
      return
    }

    const ctx = gsap.context(() => {
      fills.forEach((el) => {
        const v = Number(el.dataset.value ?? 0)
        gsap.fromTo(
          el,
          { width: '0%' },
          {
            width: `${v}%`,
            duration: 1.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      })
    }, section)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section
      ref={sectionRef}
      className="section skills"
      aria-labelledby="skills-title"
    >
      <div className="section__head">
        <h2 id="skills-title">Compétences</h2>
        <p className="section__intro">
          Barres indicatives + outils et thèmes que j’explore au quotidien ou en
          projet.
        </p>
      </div>
      <div ref={barsRef} className="skills__bars">
        {profile.skills.map((s) => (
          <div key={s.name} className="skill-bar">
            <div className="skill-bar__top">
              <span>{s.name}</span>
              <span>{s.value}%</span>
            </div>
            <div className="skill-bar__track">
              <div
                className="skill-bar__fill"
                data-value={s.value}
                style={{ width: reducedMotion ? `${s.value}%` : undefined }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="skills__tags-wrap">
        <h3 className="skills__tags-title">Également au programme</h3>
        <ul className="skills__tags" aria-label="Compétences complémentaires">
          {profile.skillTags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
