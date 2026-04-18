import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../lib/gsap'

/**
 * Smooth scroll Lenis synchronisé avec le ticker GSAP pour que ScrollTrigger
 * reste cohérent pendant le défilement inertiel.
 */
export function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const ticker = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(ticker)
      lenis.destroy()
    }
  }, [enabled])
}
