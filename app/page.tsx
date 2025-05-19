"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Download, Mail, Github, Linkedin, ExternalLink, Menu, X } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "next-themes"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const heroAnimation = useScrollAnimation({ threshold: 0.1 })
  const aboutAnimation = useScrollAnimation({ threshold: 0.1 })
  const experienceAnimation = useScrollAnimation({ threshold: 0.1 })
  const educationAnimation = useScrollAnimation({ threshold: 0.1 })
  const skillsAnimation = useScrollAnimation({ threshold: 0.1 })
  const projectsAnimation = useScrollAnimation({ threshold: 0.1 })
  const contactAnimation = useScrollAnimation({ threshold: 0.1 })

  const { scrollToSection } = useSmoothScroll({ offset: 70 })

  // Typing animation for name
  const fullName = "Vishnu Anand"
  const [displayedName, setDisplayedName] = useState("")
  const [typingDone, setTypingDone] = useState(false)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setDisplayedName(fullName.slice(0, i + 1))
      i++
      if (i === fullName.length) {
        clearInterval(interval)
        setTypingDone(true)
      }
    }, 120)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => { setMounted(true) }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    scrollToSection(e, id)
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen relative">
      {/* Background Container */}
      <div className="background-container">
        {mounted && (
          <div className={`background-image ${theme === 'dark' ? 'dark' : 'light'}`} />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-10 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              {/* Left spacer */}
              <div className="flex-1" />
              {/* Centered Nav Links */}
              <nav className="hidden md:flex items-center space-x-3 text-sm font-medium">
                <Link
                  href="#about"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                  onClick={(e) => scrollToSection(e, "about")}
                >
                  About
                </Link>
                <Link
                  href="#experience"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                  onClick={(e) => scrollToSection(e, "experience")}
                >
                  Experience
                </Link>
                <Link
                  href="#education"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                  onClick={(e) => scrollToSection(e, "education")}
                >
                  Education
                </Link>
                <Link
                  href="#skills"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                  onClick={(e) => scrollToSection(e, "skills")}
                >
                  Skills
                </Link>
                <Link
                  href="#projects"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                  onClick={(e) => scrollToSection(e, "projects")}
                >
                  Projects
                </Link>
              </nav>
              {/* Right-justified Action Items */}
              <div className="flex-1 flex justify-end items-center space-x-2">
                <Button
                  size="sm"
                  className="hidden md:flex ml-4 bg-black text-white dark:bg-white dark:text-black hover:bg-white hover:text-black hover:border-black dark:hover:bg-zinc-900 dark:hover:text-white border border-transparent"
                >
                  <Download className="mr-2 h-4 w-4 transition-none" />
                  Download CV
                </Button>
                <ThemeToggle />
                {/* Mobile Menu Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-foreground hover:bg-accent"
                  onClick={toggleMobileMenu}
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[5] bg-background/95 backdrop-blur pt-16 px-4 md:hidden">
            <nav className="flex flex-col items-center space-y-6 text-lg font-medium">
              <Link
                href="#about"
                className="w-full py-3 text-center transition-colors hover:text-foreground/80"
                onClick={(e) => handleMobileNavClick(e, "about")}
              >
                About
              </Link>
              <Link
                href="#experience"
                className="w-full py-3 text-center transition-colors hover:text-foreground/80"
                onClick={(e) => handleMobileNavClick(e, "experience")}
              >
                Experience
              </Link>
              <Link
                href="#education"
                className="w-full py-3 text-center transition-colors hover:text-foreground/80"
                onClick={(e) => handleMobileNavClick(e, "education")}
              >
                Education
              </Link>
              <Link
                href="#skills"
                className="w-full py-3 text-center transition-colors hover:text-foreground/80"
                onClick={(e) => handleMobileNavClick(e, "skills")}
              >
                Skills
              </Link>
              <Link
                href="#projects"
                className="w-full py-3 text-center transition-colors hover:text-foreground/80"
                onClick={(e) => handleMobileNavClick(e, "projects")}
              >
                Projects
              </Link>
              <div className="flex space-x-2 pt-4">
                <Button variant="outline" className="border-border hover:bg-accent hover:text-accent-foreground">
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </Button>
              </div>
            </nav>
          </div>
        )}

        {/* Main Content */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
          {/* Hero Section */}
          <section
            id="hero-section"
            ref={heroAnimation.ref}
            className={`flex flex-col items-center justify-center space-y-4 text-center py-12 md:py-24 transition-all duration-1000 ease-out ${
              heroAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Avatar className="h-[25rem] w-[25rem] md:h-[25rem] md:w-[25rem] border-[10px] border-zinc-800 dark:border-zinc-100 overflow-hidden">
              <AvatarImage src="/profile_picture.jpg" alt="Vishnu Anand" className="object-cover rounded-full" />
              <AvatarFallback className="bg-border text-foreground">VA</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl flex items-center justify-center">
                {displayedName}
                <span className={`ml-1 w-4 h-[1em] relative -top-1 ${typingDone ? "animate-blink" : ""}`}>|</span>
              </h1>
              <h2 className="text-lg md:text-xl text-foreground/50">Business Analyst and AI Software Engineer</h2>
            </div>
            <div className="flex space-x-4">
              <Link href="https://github.com/Vishnuanand77" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="hover:bg-accent hover:text-accent-foreground bg-black text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-100 border border-transparent">
                  <Github className="h-32 w-32" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
              <Link href="https://www.linkedin.com/in/vishnuanand77/" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="hover:bg-accent hover:text-accent-foreground bg-black text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-100 border border-transparent">
                  <Linkedin className="h-32 w-32" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </Link>
            </div>
          </section>

          {/* About Section */}
          <section
            id="about"
            ref={aboutAnimation.ref}
            className={`pt-4 pb-12 transition-all duration-1000 ease-out ${
              aboutAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-5xl font-bold tracking-tighter mb-6 text-foreground">About Me</h1>
            <Card className="bg-card/5 backdrop-blur-md shadow-lg shadow-black/20 border border-white dark:border-black hover:border-border/80 transition-all duration-300">
              <CardHeader>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <img
                    src="/camera.png"
                    alt="Vishnu Anand with Camera"
                    className="w-40 h-40 md:w-64 md:h-64 rounded-lg object-cover shrink-0"
                  />
                  <p className="text-lg text-black dark:text-white">
                    I’m a data enthusiast, AI engineer, and someone who genuinely enjoys turning messy datasets into meaningful solutions. With a background in Business Analytics and Computer Science, I specialize in building full-stack systems, designing machine learning workflows, and asking, “Can we automate that?”
                    <br /><br />
                    Originally from India and currently based in the U.S., I’ve worked on everything from LLM-powered agents to high-volume data pipelines, combining technical rigor with practical impact. When I'm not working with data, you'll find me cooking up experiments in the kitchen or chasing perfect frame!
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Experience Section */}
          <section
            id="experience"
            ref={experienceAnimation.ref}
            className={`py-12 transition-all duration-1000 ease-out ${
              experienceAnimation.isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <h2 className="text-5xl font-bold tracking-tighter mb-6 text-foreground">Work Experience</h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
              
              <div className="space-y-12">
                {/* First Experience */}
                <div className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-0 w-8 h-8 rounded-full bg-background border-2 border-border flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-foreground" />
                  </div>
                  
                  <div className="ml-12">
                    <div className="text-sm text-foreground/50 mb-2">Jan 2021 - Present</div>
                    <Card className="bg-card/5 backdrop-blur-md shadow-lg shadow-black/20 border border-white dark:border-black hover:border-border/80 transition-all duration-300">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-foreground">Senior Software Engineer</h3>
                        <p className="text-foreground/50 mb-4">Tech Solutions Inc.</p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Led the development of a React-based dashboard that improved user engagement by 40%</li>
                          <li>Implemented CI/CD pipelines that reduced deployment time by 60%</li>
                          <li>Mentored junior developers and conducted code reviews</li>
                          <li>Collaborated with design and product teams to deliver high-quality features</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Second Experience */}
                <div className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-0 w-8 h-8 rounded-full bg-background border-2 border-border flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-foreground" />
                  </div>
                  
                  <div className="ml-12">
                    <div className="text-sm text-foreground/50 mb-2">Jun 2018 - Dec 2020</div>
                    <Card className="bg-card/5 backdrop-blur-md shadow-lg shadow-black/20 border border-white dark:border-black hover:border-border/80 transition-all duration-300">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-foreground">Frontend Developer</h3>
                        <p className="text-foreground/50 mb-4">Web Innovators LLC</p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Developed responsive web applications using React and Redux</li>
                          <li>Optimized application performance, improving load times by 35%</li>
                          <li>Integrated RESTful APIs and implemented state management solutions</li>
                          <li>Participated in agile development processes and sprint planning</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Third Experience */}
                <div className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-0 w-8 h-8 rounded-full bg-background border-2 border-border flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-foreground" />
                  </div>
                  
                  <div className="ml-12">
                    <div className="text-sm text-foreground/50 mb-2">Jan 2017 - May 2018</div>
                    <Card className="bg-card/5 backdrop-blur-md shadow-lg shadow-black/20 border border-white dark:border-black hover:border-border/80 transition-all duration-300">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-foreground">Junior Developer</h3>
                        <p className="text-foreground/50 mb-4">Digital Creations</p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Built and maintained client websites using modern web technologies</li>
                          <li>Collaborated with senior developers on large-scale projects</li>
                          <li>Implemented responsive designs and cross-browser compatibility</li>
                          <li>Participated in code reviews and team meetings</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Education Section */}
          <section
            id="education"
            ref={educationAnimation.ref}
            className={`py-12 transition-all duration-1000 ease-out ${
              educationAnimation.isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <h2 className="text-5xl font-bold tracking-tighter mb-6 text-foreground">Education</h2>
            <Card className="bg-card/5 backdrop-blur-md shadow-lg shadow-black/20 border border-white dark:border-black hover:border-border/80 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Bachelor of Science in Computer Science</h3>
                    <p className="text-foreground/50">University of Technology</p>
                  </div>
                  <div className="text-foreground/50 mt-2 md:mt-0">2014 - 2018</div>
                </div>
                <p>Graduated with honors. Specialized in software engineering and web development.</p>
              </CardContent>
            </Card>
          </section>

          {/* Skills Section */}
          <section
            id="skills"
            ref={skillsAnimation.ref}
            className={`py-12 transition-all duration-1000 ease-out ${
              skillsAnimation.isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <h2 className="text-5xl font-bold tracking-tighter mb-6 text-foreground">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-card/5 backdrop-blur-md shadow-lg shadow-black/20 border border-white dark:border-black hover:border-border/80 transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4 text-foreground">Frontend</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-background border border-border text-foreground" variant="outline">
                      React
                    </Badge>
                    <Badge className="bg-background border border-border text-foreground" variant="outline">
                      Next.js
                    </Badge>
                    <Badge className="bg-background border border-border text-foreground" variant="outline">
                      TypeScript
                    </Badge>
                    <Badge className="bg-background border border-border text-foreground" variant="outline">
                      JavaScript
                    </Badge>
                    <Badge className="bg-background border border-border text-foreground" variant="outline">
                      HTML5
                    </Badge>
                    <Badge className="bg-background border border-border text-foreground" variant="outline">
                      CSS3
                    </Badge>
                    <Badge className="bg-background border border-border text-foreground" variant="outline">
                      Tailwind CSS
                    </Badge>
                    <Badge className="bg-background border border-border text-foreground" variant="outline">
                      Redux
                    </Badge>
                    <Badge className="bg-background border border-border text-foreground" variant="outline">
                      Webpack
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card/5 backdrop-blur-md shadow-lg shadow-black/20 border border-white dark:border-black hover:border-border/80 transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4 text-foreground">Backend</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-background border border-border text-foreground" variant="outline">
                      Node.js
                    </Badge>
                    <Badge className="bg-background border border-border text-foreground" variant="outline">
                      Express
                    </Badge>
                    <Badge className="bg-background border border-border text-foreground" variant="outline">
                      GraphQL
                    </Badge>
                    <Badge className="bg-background border border-border text-foreground" variant="outline">
                      REST APIs
                    </Badge>
                    <Badge className="bg-background border border-border text-foreground" variant="outline">
                      MongoDB
                    </Badge>
                    <Badge className="bg-background border border-border text-foreground" variant="outline">
                      PostgreSQL
                    </Badge>
                    <Badge className="bg-background border border-border text-foreground" variant="outline">
                      Firebase
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card/5 backdrop-blur-md shadow-lg shadow-black/20 border border-white dark:border-black hover:border-border/80 transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4 text-foreground">Tools & Practices</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-background border border-border text-foreground" variant="outline">
                      Git
                    </Badge>
                    <Badge className="bg-background border border-border text-foreground" variant="outline">
                      GitHub
                    </Badge>
                    <Badge className="bg-background border border-border text-foreground" variant="outline">
                      CI/CD
                    </Badge>
                    <Badge className="bg-background border border-border text-foreground" variant="outline">
                      Jest
                    </Badge>
                    <Badge className="bg-background border border-border text-foreground" variant="outline">
                      Testing Library
                    </Badge>
                    <Badge className="bg-background border border-border text-foreground" variant="outline">
                      Agile
                    </Badge>
                    <Badge className="bg-background border border-border text-foreground" variant="outline">
                      Scrum
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card/5 backdrop-blur-md shadow-lg shadow-black/20 border border-white dark:border-black hover:border-border/80 transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4 text-foreground">Soft Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-background border border-border text-foreground" variant="outline">
                      Team Leadership
                    </Badge>
                    <Badge className="bg-background border border-border text-foreground" variant="outline">
                      Communication
                    </Badge>
                    <Badge className="bg-background border border-border text-foreground" variant="outline">
                      Problem Solving
                    </Badge>
                    <Badge className="bg-background border border-border text-foreground" variant="outline">
                      Time Management
                    </Badge>
                    <Badge className="bg-background border border-border text-foreground" variant="outline">
                      Mentoring
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Projects Section */}
          <section
            id="projects"
            ref={projectsAnimation.ref}
            className={`py-12 transition-all duration-1000 ease-out ${
              projectsAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-5xl font-bold tracking-tighter mb-6 text-foreground">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-card/5 backdrop-blur-md shadow-lg shadow-black/20 border border-white dark:border-black hover:border-border/80 transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2 text-foreground">E-commerce Platform</h3>
                  <p className="text-foreground/50 mb-4">A full-stack e-commerce solution with payment integration</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className="bg-background border border-border text-foreground" variant="outline">
                      React
                    </Badge>
                    <Badge className="bg-background border border-border text-foreground" variant="outline">
                      Node.js
                    </Badge>
                    <Badge className="bg-background border border-border text-foreground" variant="outline">
                      MongoDB
                    </Badge>
                    <Badge className="bg-background border border-border text-foreground" variant="outline">
                      Stripe
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border hover:border-border/80 hover:bg-accent hover:text-accent-foreground"
                      asChild
                    >
                      <Link href="#" className="flex items-center">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border hover:border-border/80 hover:bg-accent hover:text-accent-foreground"
                      asChild
                    >
                      <Link href="#" className="flex items-center">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Demo
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/5 backdrop-blur-md shadow-lg shadow-black/20 border border-white dark:border-black hover:border-border/80 transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2 text-foreground">Task Management App</h3>
                  <p className="text-foreground/50 mb-4">A collaborative task management application with real-time updates</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className="bg-background border border-border text-foreground" variant="outline">
                      Next.js
                    </Badge>
                    <Badge className="bg-background border border-border text-foreground" variant="outline">
                      TypeScript
                    </Badge>
                    <Badge className="bg-background border border-border text-foreground" variant="outline">
                      Prisma
                    </Badge>
                    <Badge className="bg-background border border-border text-foreground" variant="outline">
                      PostgreSQL
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border hover:border-border/80 hover:bg-accent hover:text-accent-foreground"
                      asChild
                    >
                      <Link href="#" className="flex items-center">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border hover:border-border/80 hover:bg-accent hover:text-accent-foreground"
                      asChild
                    >
                      <Link href="#" className="flex items-center">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Demo
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Contact Section */}
          <section
            id="contact"
            ref={contactAnimation.ref}
            className={`py-12 transition-all duration-1000 ease-out ${
              contactAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-5xl font-bold tracking-tighter mb-6 text-foreground">Contact</h2>
            <Card className="bg-card/5 backdrop-blur-md shadow-lg shadow-black/20 border border-white dark:border-black hover:border-border/80 transition-all duration-300">
              <CardContent className="p-6">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your message"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>

      {/* Add CSS for blinking cursor */}
      <style jsx global>{`
      @keyframes blink {
        0%, 49% { opacity: 1; }
        50%, 100% { opacity: 0; }
      }
      .animate-blink {
        animation: blink 1s step-end infinite;
      }
      `}</style>
    </div>
  )
}
