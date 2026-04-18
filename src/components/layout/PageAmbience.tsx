import { useMemo, type CSSProperties } from 'react'
import { buildFireflies } from '../../lib/ambienceParticles'
import { useFireflyCount } from '../../hooks/useFireflyCount'

type Props = {
  reducedMotion: boolean
}

export function PageAmbience({ reducedMotion }: Props) {
  const fireflyCount = useFireflyCount(reducedMotion)
  const fireflies = useMemo(
    () => buildFireflies(fireflyCount, 101),
    [fireflyCount],
  )

  return (
    <div className="page-ambience" aria-hidden>
      <div className="page-ambience__layer page-ambience__fireflies">
        {fireflies.map((f) => (
          <span
            key={`ff-${f.id}`}
            className={reducedMotion ? 'page-firefly is-static' : 'page-firefly'}
            style={
              {
                left: f.left,
                top: f.top,
                animationDelay: f.delay,
                animationDuration: f.duration,
                width: f.size,
                height: f.size,
                '--ff-dx': f.dx,
                '--ff-dy': f.dy,
                '--ff-dx2': f.dx2,
                '--ff-dy2': f.dy2,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  )
}


