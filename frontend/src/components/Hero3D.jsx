import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import { useRef, useMemo } from "react"
import * as THREE from "three"

function Particles() {

  const ref = useRef()

  const particles = useMemo(() => {

    const positions = new Float32Array(5000)

    for (let i = 0; i < 5000; i++) {
      positions[i] = (Math.random() - 0.5) * 10
    }

    return positions

  }, [])

  useFrame((state, delta) => {

    ref.current.rotation.x += delta * 0.02
    ref.current.rotation.y += delta * 0.03

  })

  return (
    <Points ref={ref} positions={particles} stride={3}>

      <PointMaterial
        transparent
        color="#D4AF37"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
      />

    </Points>
  )
}

export default function Hero3D() {

  return (

    <div className="absolute inset-0 -z-10">

      <Canvas camera={{ position: [0, 0, 3] }}>

        <ambientLight intensity={0.5} />

        <Particles />

      </Canvas>

    </div>

  )
}