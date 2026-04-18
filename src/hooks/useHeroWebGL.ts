import { useMemo } from 'react'

/**
 * Active le canvas WebGL uniquement quand le motion réduit est off et
 * que l’appareil / viewport semble suffisamment confortable pour le GPU.
 */
export function useHeroWebGL(reducedMotion: boolean): boolean {
  return useMemo(() => {
    if (reducedMotion) return false
    if (typeof window === 'undefined') return false

    const narrow = window.matchMedia('(max-width: 900px)').matches
    if (narrow) return false

    const cores = navigator.hardwareConcurrency
    if (typeof cores === 'number' && cores < 4) return false

    return true
  }, [reducedMotion])
}
