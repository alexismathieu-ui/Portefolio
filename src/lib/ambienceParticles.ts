export type FireflyParticle = {
  id: number
  left: string
  top: string
  delay: string
  duration: string
  /** Taille relative à la fenêtre (vmin) pour rester lisible sur tout écran. */
  size: string
  dx: string
  dy: string
  dx2: string
  dy2: string
}

function pr01(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453123
  return x - Math.floor(x)
}

export function buildFireflies(count: number, seedBase: number): FireflyParticle[] {
  const items: FireflyParticle[] = []
  for (let i = 0; i < count; i += 1) {
    const s = i * 7919 + seedBase
    items.push({
      id: i,
      left: `${4 + pr01(s) * 92}%`,
      top: `${2 + pr01(s + 1) * 96}%`,
      delay: `${pr01(s + 2) * 18}s`,
      duration: `${28 + pr01(s + 3) * 30}s`,
      size: `${0.26 + pr01(s + 4) * 0.38}vmin`,
      dx: `${-18 + pr01(s + 5) * 36}vmin`,
      dy: `${-22 + pr01(s + 6) * 44}vmin`,
      dx2: `${-14 + pr01(s + 7) * 28}vmin`,
      dy2: `${-16 + pr01(s + 8) * 32}vmin`,
    })
  }
  return items
}

