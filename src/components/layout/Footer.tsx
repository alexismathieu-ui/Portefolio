import { profile } from '../../data/profile'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <p>
        © {year} {profile.name} — Construit avec un max de Passion et de Boisson.
      </p>
    </footer>
  )
}
