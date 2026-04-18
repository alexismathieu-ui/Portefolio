import { useEffect, useState } from 'react'

function countForWidth(w: number, reducedMotion: boolean): number {
  if (reducedMotion) return 36
  if (w < 480) return 52
  if (w < 768) return 78
  if (w < 1100) return 108
  return 140
}

/**
 * Densité de lucioles adaptée à la largeur d’écran (performance + lisibilité).
 */
export function useFireflyCount(reducedMotion: boolean): number {
  const [count, setCount] = useState(() =>
    typeof window === 'undefined' ? 108 : countForWidth(window.innerWidth, reducedMotion),
  )

  useEffect(() => {
    const onResize = () => setCount(countForWidth(window.innerWidth, reducedMotion))
    onResize()
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [reducedMotion])

  return count
}
