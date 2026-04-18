/**
 * Fond animé CSS (repli quand WebGL est désactivé ou en cours de chargement).
 */
export function HeroFallback() {
  return (
    <div className="hero-fallback" aria-hidden>
      <div className="hero-fallback__blob hero-fallback__blob--a" />
      <div className="hero-fallback__blob hero-fallback__blob--b" />
      <div className="hero-fallback__noise" />
    </div>
  )
}
