import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'framer-motion'
import type { Project } from '../../data/projects'

type Props = { project: Project }

/**
 * Carte projet : tilt 3D léger (springs) + élévation au survol sur un enfant
 * pour ne pas écraser le transform du tilt.
 */
export function ProjectCard({ project }: Props) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(mx, { stiffness: 120, damping: 18 })
  const ry = useSpring(my, { stiffness: 120, damping: 18 })
  const transform = useMotionTemplate`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    mx.set(-py * 10)
    my.set(px * 12)
  }

  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      className="project-card-wrap"
      style={{ transform, transformStyle: 'preserve-3d' }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <motion.article
        className="project-card"
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      >
        <div className="project-card__media">
          <img
            src={project.image}
            alt=""
            loading="lazy"
            decoding="async"
            width={800}
            height={500}
          />
        </div>
        <div className="project-card__body">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <ul className="project-card__tags">
            {project.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <div className="project-card__links">
            <a href={project.demoUrl} target="_blank" rel="noreferrer">
              Démo
            </a>
            <a href={project.repoUrl} target="_blank" rel="noreferrer">
              Code
            </a>
          </div>
        </div>
      </motion.article>
    </motion.div>
  )
}
