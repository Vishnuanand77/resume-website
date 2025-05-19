"use client"

import type React from "react"

import { useCallback } from "react"

interface UseSmoothScrollOptions {
  offset?: number
  duration?: number
}

export function useSmoothScroll({ offset = 80, duration = 800 }: UseSmoothScrollOptions = {}) {
  const scrollToSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
      e.preventDefault()

      const targetElement = document.getElementById(targetId)

      if (!targetElement) return

      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset
      const startPosition = window.scrollY
      const distance = targetPosition - startPosition
      let startTime: number | null = null

      function animation(currentTime: number) {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / duration, 1)

        // Easing function: easeInOutQuad
        const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)

        window.scrollTo(0, startPosition + distance * ease(progress))

        if (timeElapsed < duration) {
          requestAnimationFrame(animation)
        }
      }

      requestAnimationFrame(animation)
    },
    [offset, duration],
  )

  return { scrollToSection }
}
