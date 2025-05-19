"use client"

import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useScroll } from "@react-three/drei"
import * as THREE from "three"

interface BackgroundSceneProps {
  count?: number
  colors?: [string, string, string]
}

export function BackgroundScene({ count = 100, colors = ["#444444", "#666666", "#888888"] }: BackgroundSceneProps) {
  const particles = useRef<THREE.Points>(null)
  const scroll = useScroll()
  const { viewport } = useThree()

  // Generate random particles
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 10
      positions[i3 + 1] = (Math.random() - 0.5) * 10
      positions[i3 + 2] = (Math.random() - 0.5) * 10
    }

    return positions
  }, [count])

  // Generate random colors for particles
  const particlesColors = useMemo(() => {
    const colorArray = new Float32Array(count * 3)
    const colorObjects = colors.map((color) => new THREE.Color(color))

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const randomColor = colorObjects[Math.floor(Math.random() * colorObjects.length)]
      colorArray[i3] = randomColor.r
      colorArray[i3 + 1] = randomColor.g
      colorArray[i3 + 2] = randomColor.b
    }

    return colorArray
  }, [count, colors])

  // Animation based on scroll
  useFrame((state) => {
    if (!particles.current) return

    // Get scroll data (0 to 1)
    const scrollOffset = scroll.offset

    // Rotate based on scroll position
    particles.current.rotation.y = scrollOffset * Math.PI * 2
    particles.current.rotation.x = scrollOffset * Math.PI

    // Scale based on scroll
    const scale = 1 + scrollOffset * 0.5
    particles.current.scale.set(scale, scale, scale)

    // Subtle continuous animation
    particles.current.rotation.z += 0.001
  })

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particlesColors.length / 3}
          array={particlesColors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.6} sizeAttenuation depthWrite={false} />
    </points>
  )
}
