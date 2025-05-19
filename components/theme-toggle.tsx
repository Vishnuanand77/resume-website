"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [isTransitioning, setIsTransitioning] = React.useState(false)

  // After mounting, we can safely show the theme toggle
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeChange = () => {
    setIsTransitioning(true)
    setTheme(theme === "light" ? "dark" : "light")
    setTimeout(() => {
      setIsTransitioning(false)
    }, 800) // Match the transition duration
  }

  if (!mounted) {
    return null
  }

  return (
    <>
      <div className={`theme-transition ${isTransitioning ? 'active' : ''}`} />
      <Button
        variant="ghost"
        size="icon"
        onClick={handleThemeChange}
        className="relative hover:bg-accent hover:text-accent-foreground transition-colors duration-300"
      >
        <div className="relative w-5 h-5">
          <Sun 
            className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-500 ease-in-out ${
              theme === "light" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"
            }`}
          />
          <Moon 
            className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-500 ease-in-out ${
              theme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
            }`}
          />
        </div>
        <span className="sr-only">Toggle theme</span>
      </Button>
    </>
  )
} 