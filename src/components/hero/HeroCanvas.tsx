import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import type { Theme } from '../../hooks/useTheme'

type Mouse = { x: number; y: number }

/** Évite le rechargement brutal de la page si le GPU perd le contexte WebGL. */
function WebglContextGuards() {
  const gl = useThree((s) => s.gl)

  useEffect(() => {
    const el = gl.domElement
    const onLost = (e: Event) => {
      e.preventDefault()
    }
    el.addEventListener('webglcontextlost', onLost, false)
    return () => el.removeEventListener('webglcontextlost', onLost)
  }, [gl])

  return null
}

function Scene({ mouse, theme }: { mouse: Mouse; theme: Theme }) {
  const group = useRef<THREE.Group>(null)
  const { viewport, size } = useThree()
  const minPx = Math.min(size.width, size.height)
  /** Sphère plus petite sur mobile, proche de l’actuel sur grand écran. */
  const meshScale = THREE.MathUtils.clamp(minPx / 420, 0.62, 1.32)

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    /** Portrait / mobile : sphère centrée ; paysage large : décalée à gauche du texte. */
    const narrow = viewport.width < viewport.height * 0.92
    const baseX = narrow ? 0 : -viewport.width * 0.26
    const mouseXGain = narrow ? viewport.width * 0.045 : viewport.width * 0.1
    const mouseYGain = narrow ? viewport.height * 0.045 : viewport.height * 0.08
    group.current.rotation.y = t * 0.2 + mouse.x * (narrow ? 0.22 : 0.38)
    group.current.rotation.x = mouse.y * (narrow ? 0.14 : 0.22)
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      baseX + mouse.x * mouseXGain,
      0.07,
    )
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      mouse.y * mouseYGain,
      0.07,
    )
  })

  return (
    <group ref={group}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 6]} intensity={1.1} />
      <Float
        speed={theme === 'light' ? 1.45 : 2.15}
        rotationIntensity={theme === 'light' ? 0.28 : 0.36}
        floatIntensity={theme === 'light' ? 0.46 : 0.62}
      >
        <mesh scale={meshScale}>
          <icosahedronGeometry args={[1.42, 1]} />
          <meshStandardMaterial
            color={theme === 'light' ? '#4f46e5' : '#818cf8'}
            emissive={theme === 'light' ? '#e0e7ff' : '#1e1b4b'}
            emissiveIntensity={theme === 'light' ? 0.2 : 0.35}
            metalness={0.65}
            roughness={0.25}
            wireframe
          />
        </mesh>
      </Float>
    </group>
  )
}

type Props = {
  mouse: Mouse
  theme: Theme
}

export function HeroCanvas({ mouse, theme }: Props) {
  return (
    <div className="hero-canvas" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.35]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'default',
          stencil: false,
          depth: true,
        }}
      >
        <WebglContextGuards />
        <Scene mouse={mouse} theme={theme} />
      </Canvas>
    </div>
  )
}

