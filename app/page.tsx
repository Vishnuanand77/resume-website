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

// At the top, after imports, add:
const basePath = process.env.NODE_ENV === 'production' ? '/resume-website' : '';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({})
  const [expandedEducation, setExpandedEducation] = useState<{ [key: string]: boolean }>({})
  const [expandedProjects, setExpandedProjects] = useState<{ [key: string]: boolean }>({})

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

  const toggleCard = (cardId: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }))
  }

  const toggleEducation = (cardId: string) => {
    setExpandedEducation(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }))
  }

  const toggleProject = (cardId: string) => {
    setExpandedProjects(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }))
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
                <Link
                  href="#certifications"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                  onClick={(e) => scrollToSection(e, "certifications")}
                >
                  Certifications
                </Link>
              </nav>
              {/* Right-justified Action Items */}
              <div className="flex-1 flex justify-end items-center space-x-2">
                <Button
                  size="sm"
                  className="hidden md:flex ml-4 bg-black text-white dark:bg-white dark:text-black hover:bg-white hover:text-black hover:border-black dark:hover:bg-zinc-900 dark:hover:text-white border border-transparent"
                  asChild
                >
                  <a href="/Resume-AI%20Engineering.pdf" download>
                  <Download className="mr-2 h-4 w-4 transition-none" />
                  Download CV
                  </a>
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
              <Link
                href="#certifications"
                className="w-full py-3 text-center transition-colors hover:text-foreground/80"
                onClick={(e) => handleMobileNavClick(e, "certifications")}
              >
                Certifications
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
            <Avatar className="h-[15rem] w-[15rem] md:h-[25rem] md:w-[25rem] border-[10px] border-zinc-800 dark:border-zinc-100 overflow-hidden">
              <AvatarImage src={`${basePath}/profile_picture.jpg`} alt="Vishnu Anand" className="object-cover rounded-full" />
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
              <Link href="https://www.instagram.com/visnu.jpg/" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="hover:bg-accent hover:text-accent-foreground bg-black text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-100 border border-transparent">
                  <svg className="h-32 w-32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span className="sr-only">Instagram</span>
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
            <Card className="bg-card/5 backdrop-blur-md shadow-lg shadow-black/20 border border-black hover:border-black transition-all duration-300">
              
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <img
                    src={`${basePath}/camera.png`}
                    alt="Vishnu Anand with Camera"
                    className="w-40 h-40 md:w-64 md:h-64 rounded-lg object-cover shrink-0"
                  />
                  <p className="text-lg text-black dark:text-white">
                    I'm a data enthusiast, AI engineer, and someone who genuinely enjoys turning messy datasets into meaningful solutions. With a background in Business Analytics and Computer Science, I specialize in building full-stack systems, designing machine learning workflows, and asking, "Can we automate that?"
                    <br /><br />
                    Originally from India and currently based in the U.S., I've worked on everything from LLM-powered agents to high-volume data pipelines, combining technical rigor with practical impact. When I'm not working with data, you'll find me cooking up experiments in the kitchen or chasing perfect frame!
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
              {/* Responsive Timeline line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-foreground -translate-x-1/2 z-0" />
              <div className="block md:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-foreground z-0" />
              <div className="space-y-0">
                {/* Timeline Items */}
                {[{
                  id: 'care',
                  date: 'May 2025 - Present',
                  logo: `${basePath}/care-logo.png`,
                  title: 'Full Stack AI Software Engineer',
                  company: 'Care.com',
                  bullets: [
                    'Collaborated with system architects to implement business logic using Java Spring Boot architecture, integrating PostgreSQL, Kafka, and Go-based adapters.',
                    'Developed RESTful APIs with versioned CRUD operations and MCP-based tooling, enabling robust service orchestration and real-time data flows.',
                    'Led migration of legacy system data into modular architecture, ensuring referential integrity and business continuity.'
                  ]
                }, {
                  id: 'prediction-guard',
                  date: 'Jan 2025 - Apr 2025',
                  logo: `${basePath}/prediction-guard-logo.png`,
                  title: 'AI Engineer Intern',
                  company: 'Prediction Guard',
                  bullets: [
                    'Built LLM-powered agents to automate lead qualification, demo scheduling, and follow-ups in B2B pipelines, resulting in 2–3× increase in engagement and 65% reduction in sales cycle time.',
                    'Benchmarked agent performance against human-led processes, collaborating with R&D to enhance accuracy, response quality, and cost-efficiency.',
                    'Designed scalable evaluation frameworks combining test generation, CI integration, and human-in-the-loop feedback to validate and deploy AI agents.'
                  ]
                }, {
                  id: 'purdue',
                  date: 'Jan 2025 - May 2025',
                  logo: `${basePath}/purdue-logo.png`,
                  title: 'Undergraduate Teaching Assistant',
                  company: 'Purdue University',
                  bullets: [
                    'MGMT 305: Business Statistics for Prof. Xing Wang',
                    'Graded undergraduate-level assignments and projects involving regression/statistics modeling and forecasting.',
                    'Held office hours and supported student understanding of core analytics concepts, and visualization techniques.',
                  ]
                }, {
                  id: 'cognizant',
                  date: 'Sep 2022 - Feb 2024',
                  logo: `${basePath}/cognizant-logo.png`,
                  title: 'Programmer Analyst',
                  company: 'Cognizant Technology Solutions',
                  bullets: [
                    'Automated large-scale data pipelines (1TB/month) using Python, SQL, and Shell, transforming raw sales data into analytics-ready outputs.',
                    'Reduced manual overhead by 50% through quality check automation and parameterized monitoring of incomplete/corrupt data.',
                    'Collaborated with downstream Decision Support Systems team; addressed infrastructure delays by engineering contingency processes and improving pipeline uptime.'
                  ]
                }, {
                  id: 'cognizant-intern',
                  date: 'Jan 2022 - Sep 2022',
                  logo: `${basePath}/cognizant-logo.png`,
                  title: 'Programmer Analyst Intern',
                  company: 'Cognizant Technology Solutions',
                  bullets: [
                    'Gained hands-on experience in Java, Spring Boot, React, and AWS through lab exercises and project-based learning.',
                    'Led a 5-member team to develop a hospital appointment system using full-stack technologies, streamlining scheduling and diagnosis visibility.'
                  ]
                }].map((exp, idx) => (
                  <div
                    key={exp.id}
                    className={
                      `relative flex flex-col items-center mb-6 md:mb-6 ` +
                      `md:grid md:grid-cols-9 md:gap-4`
                    }
                  >
                    {/* Mobile: vertical timeline, cards full width */}
                    <div className="md:hidden flex items-start w-full">
                      <div className="flex flex-col items-center mr-4">
                        <div className="w-8 h-8 rounded-full bg-background border-2 border-black flex items-center justify-center z-10">
                    <div className="w-2 h-2 rounded-full bg-foreground" />
                  </div>
                        {/* Vertical line for mobile, except last item */}
                        {idx !== 4 && (
                          <div className="hidden md:block flex-1 w-0.5 bg-foreground" style={{ minHeight: 40 }} />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-foreground/50 mb-2">{exp.date}</div>
                        {/* Card */}
                        <Card 
                          className="bg-card/5 backdrop-blur-md shadow-lg shadow-black/20 border border-black hover:border-black transition-all duration-300 cursor-pointer w-full mb-6 md:mb-0"
                          onClick={() => toggleCard(exp.id)}
                        >
                      <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <img
                                  src={exp.logo}
                                  alt={exp.company + ' Logo'}
                                  className="w-12 h-12 rounded-lg object-contain bg-white p-1"
                                />
                                <div>
                                  <h3 className="text-lg font-bold text-foreground">{exp.title}</h3>
                                  <p className="text-foreground/50">{exp.company}</p>
                                </div>
                              </div>
                              <div className={`transform transition-transform duration-300 ${expandedCards[exp.id] ? 'rotate-180' : ''}`}> 
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/50">
                                  <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                              </div>
                            </div>
                            <div className={`overflow-hidden transition-all duration-300 ${expandedCards[exp.id] ? 'max-h-96 mt-4' : 'max-h-0'}`}>
                        <ul className="list-disc pl-5 space-y-2">
                                {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
                        </ul>
                            </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                    {/* Desktop: alternating timeline */}
                    <div className="hidden md:contents">
                      {idx % 2 === 1 ? (
                        <>
                          <div className="md:col-span-4" />
                          <div className="md:col-span-1 flex justify-center z-10">
                            <div className="w-8 h-8 rounded-full bg-background border-2 border-black flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-foreground" />
                  </div>
                          </div>
                          <div className="md:col-span-4 flex flex-col items-start w-full">
                            <div className="text-sm text-foreground/50 mb-2 md:text-right md:pr-8">{exp.date}</div>
                            <Card 
                              className="bg-card/5 backdrop-blur-md shadow-lg shadow-black/20 border border-black hover:border-black transition-all duration-300 cursor-pointer w-full md:w-auto"
                              onClick={() => toggleCard(exp.id)}
                            >
                      <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                    <img
                                      src={exp.logo}
                                      alt={exp.company + ' Logo'}
                                      className="w-12 h-12 rounded-lg object-contain bg-white p-1"
                                    />
                                    <div>
                                      <h3 className="text-lg font-bold text-foreground">{exp.title}</h3>
                                      <p className="text-foreground/50">{exp.company}</p>
                                    </div>
                                  </div>
                                  <div className={`transform transition-transform duration-300 ${expandedCards[exp.id] ? 'rotate-180' : ''}`}> 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/50">
                                      <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                  </div>
                                </div>
                                <div className={`overflow-hidden transition-all duration-300 ${expandedCards[exp.id] ? 'max-h-96 mt-4' : 'max-h-0'}`}>
                        <ul className="list-disc pl-5 space-y-2">
                                    {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
                        </ul>
                                </div>
                      </CardContent>
                    </Card>
                  </div>
                        </>
                      ) : (
                        <>
                          <div className="md:col-span-4 flex flex-col items-end w-full">
                            <div className="text-sm text-foreground/50 mb-2 md:text-left md:pl-8">{exp.date}</div>
                            <Card 
                              className="bg-card/5 backdrop-blur-md shadow-lg shadow-black/20 border border-black hover:border-black transition-all duration-300 cursor-pointer w-full md:w-auto"
                              onClick={() => toggleCard(exp.id)}
                            >
                              <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                    <img
                                      src={exp.logo}
                                      alt={exp.company + ' Logo'}
                                      className="w-12 h-12 rounded-lg object-contain bg-white p-1"
                                    />
                                    <div>
                                      <h3 className="text-lg font-bold text-foreground">{exp.title}</h3>
                                      <p className="text-foreground/50">{exp.company}</p>
                </div>
                  </div>
                                  <div className={`transform transition-transform duration-300 ${expandedCards[exp.id] ? 'rotate-180' : ''}`}> 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/50">
                                      <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                </div>
                  </div>
                                <div className={`overflow-hidden transition-all duration-300 ${expandedCards[exp.id] ? 'max-h-96 mt-4' : 'max-h-0'}`}>
                        <ul className="list-disc pl-5 space-y-2">
                                    {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
                        </ul>
                                </div>
                      </CardContent>
                    </Card>
                  </div>
                          <div className="md:col-span-1 flex justify-center z-10">
                            <div className="w-8 h-8 rounded-full bg-background border-2 border-black flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-foreground" />
                </div>
                          </div>
                          <div className="hidden md:block md:col-span-4" />
                        </>
                      )}
                    </div>
                  </div>
                ))}
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
            <div className="space-y-8">
              {/* Purdue University – Daniels School of Business (MS) */}
              <Card className="bg-card/5 backdrop-blur-md shadow-lg shadow-black/20 border border-black hover:border-black transition-all duration-300 cursor-pointer" onClick={() => toggleEducation('purdue-ms')}>
              <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img src={`${basePath}/purdue-logo.png`} alt="Purdue University Logo" className="w-16 h-16 rounded-lg object-contain bg-white p-1" />
                  <div>
                        <h3 className="text-lg font-bold text-foreground">Master of Science in Business Analytics and Information Management</h3>
                        <p className="text-foreground/50">Purdue University – Daniels School of Business</p>
                        <p className="text-foreground/50">West Lafayette, IN | Expected Aug 2025</p>
                  </div>
                </div>
                    <div className={`transform transition-transform duration-300 ${expandedEducation['purdue-ms'] ? 'rotate-180' : ''}`}> 
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/50">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${expandedEducation['purdue-ms'] ? 'max-h-96 mt-4' : 'max-h-0'}`}>
                    <ul className="list-disc pl-5 space-y-2 mt-2">
                      <li>Focus: AI, Data Science, Business Analytics</li>
                      <li>Collaborated with Prediction Guard on LLM-powered AI agents</li>
                      <li>Conducted AI research under Dr. Matthew Lanham</li>
                      <li>Relevant Coursework: Web Data Analytics, Visual Analytics, Machine Learning, Cloud Computing, Business Statistics</li>
                    </ul>
                  </div>
              </CardContent>
            </Card>
              {/* PES University (BTech) */}
              <Card className="bg-card/5 backdrop-blur-md shadow-lg shadow-black/20 border border-black hover:border-black transition-all duration-300 cursor-pointer" onClick={() => toggleEducation('pes-btech')}>
              <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img src={`${basePath}/pes-logo.png`} alt="PES University Logo" className="w-16 h-16 rounded-lg object-contain bg-white p-1" />
                  <div>
                        <h3 className="text-lg font-bold text-foreground">Bachelor of Technology in Computer Science Engineering</h3>
                        <p className="text-foreground/50">PES University</p>
                        <p className="text-foreground/50">Bengaluru, India | Aug 2022</p>
                      </div>
                    </div>
                    <div className={`transform transition-transform duration-300 ${expandedEducation['pes-btech'] ? 'rotate-180' : ''}`}> 
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/50">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${expandedEducation['pes-btech'] ? 'max-h-96 mt-4' : 'max-h-0'}`}>
                    <ul className="list-disc pl-5 space-y-2 mt-2">
                      <li>Minor: Machine Intelligence and Data Science</li>
                      <li>Recipient of Academic Distinction Awards</li>
                      <li>Co-authored research on AI-powered note-taking app</li>
                      <li>Leadership: Club Head, Pixelloid Photography Club</li>
                    </ul>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* LLM-Powered AI Sales Agents */}
              <Card className="bg-card/5 backdrop-blur-md shadow-lg shadow-black/20 border border-black hover:border-black transition-all duration-300 flex flex-col relative overflow-hidden">
                <div className="relative w-full h-40 flex-shrink-0">
                  <img src={`${basePath}/ai-agent.png`} alt="Project preview" className="object-cover w-full h-full rounded-t-lg" />
                </div>
                <CardContent className="p-6 flex flex-col flex-grow relative z-10 w-full">
                  <h3 className="text-lg font-bold mb-2 text-foreground">LLM-Powered AI Sales Agents</h3>
                  <p className="text-foreground/50 mb-2">Prediction Guard</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    <Badge className="bg-transparent border border-black text-black dark:border-white dark:text-white px-1.5 py-0 text-[10px] font-normal" variant="outline">Prompt Engineering</Badge>
                    <Badge className="bg-transparent border border-black text-black dark:border-white dark:text-white px-1.5 py-0 text-[10px] font-normal" variant="outline">LLM Fine-tuning</Badge>
                    <Badge className="bg-transparent border border-black text-black dark:border-white dark:text-white px-1.5 py-0 text-[10px] font-normal" variant="outline">Agentic AI</Badge>
                    <Badge className="bg-transparent border border-black text-black dark:border-white dark:text-white px-1.5 py-0 text-[10px] font-normal" variant="outline">Sales Process Automation</Badge>
                  </div>
                  <div className="relative">
                    <ul className={`list-disc pl-5 space-y-2 mb-4 ${!expandedProjects['llm-sales'] ? 'line-clamp-1' : ''}`}> 
                      <li>Built and evaluated LLM agents to automate lead qualification, demo scheduling, and follow-ups in B2B pipelines.</li>
                      <li>Improved engagement by 2–3× and reduced sales cycle time by 65%.</li>

                    </ul>
                    <div className={`flex justify-center mt-2 ${!expandedProjects['llm-sales'] ? 'mb-6' : 'mb-2'}`}> 
                      <button
                        className="flex items-center gap-2 text-black dark:text-white font-medium focus:outline-none"
                        onClick={() => toggleProject('llm-sales')}
                        type="button"
                        aria-label="Expand project description"
                      >
                        <svg
                          className={`w-4 h-4 transition-transform duration-300 ${expandedProjects['llm-sales'] ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center gap-2 mt-3 mt-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-black text-white dark:bg-white dark:text-black border border-border hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white px-3 py-1 flex items-center gap-2"
                      asChild
                    >
                      <a href="https://github.com/Vishnuanand77/pg-sales-agent" target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                        GitHub
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-black text-white dark:bg-white dark:text-black border border-border hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white px-3 py-1 flex items-center gap-2"
                      asChild
                    >
                      <a href="https://www.youtube.com/watch?v=IkefBKis3eY&list=LL&index=8&t=57s" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        YouTube
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Predicting Airbnb Superhost Status */}
              <Card className="bg-card/5 backdrop-blur-md shadow-lg shadow-black/20 border border-black hover:border-black transition-all duration-300 flex flex-col relative overflow-hidden">
                <div className="relative w-full h-40 flex-shrink-0">
                  <img src={`${basePath}/airbnb-superhost.png`} alt="Project preview" className="object-cover w-full h-full rounded-t-lg" />
                </div>
                <CardContent className="p-6 flex flex-col flex-grow relative z-10 w-full">
                  <h3 className="text-lg font-bold mb-2 text-foreground">Predicting Airbnb Superhosts</h3>
                  <p className="text-foreground/50 mb-2">Course Project</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    <Badge className="bg-transparent border border-black text-black dark:border-white dark:text-white px-1.5 py-0 text-[10px] font-normal" variant="outline">Machine Learning</Badge>
                    <Badge className="bg-transparent border border-black text-black dark:border-white dark:text-white px-1.5 py-0 text-[10px] font-normal" variant="outline">Model Evaluation</Badge>
                    <Badge className="bg-transparent border border-black text-black dark:border-white dark:text-white px-1.5 py-0 text-[10px] font-normal" variant="outline">Tableau</Badge>
                    <Badge className="bg-transparent border border-black text-black dark:border-white dark:text-white px-1.5 py-0 text-[10px] font-normal" variant="outline">Feature Engineering</Badge>
                  </div>
                  <div className="relative">
                    <ul className={`list-disc pl-5 space-y-2 mb-4 ${!expandedProjects['airbnb-superhost'] ? 'line-clamp-1' : ''}`}> 
                      <li>Developed ML models to predict Superhost status using listing data.</li>
                      <li>Conducted Difference-in-Differences (DiD) analysis to evaluate program effectiveness.</li>
                      <li>Visualized trends and insights using Tableau.</li>
                    </ul>
                    <div className={`flex justify-center mt-2 ${!expandedProjects['airbnb-superhost'] ? 'mb-6' : 'mb-2'}`}> 
                      <button
                        className="flex items-center gap-2 text-black dark:text-white font-medium focus:outline-none"
                        onClick={() => toggleProject('airbnb-superhost')}
                        type="button"
                        aria-label="Expand project description"
                      >
                        <svg
                          className={`w-4 h-4 transition-transform duration-300 ${expandedProjects['airbnb-superhost'] ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center gap-2 mt-3 mt-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-black text-white dark:bg-white dark:text-black border border-border hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white px-3 py-1 flex items-center gap-2"
                      asChild
                    >
                      <a href="https://github.com/Vishnuanand77/airbnb-superhost-prediction" target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                        GitHub
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-black text-white dark:bg-white dark:text-black border border-border hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white px-3 py-1 flex items-center gap-2"
                      asChild
                    >
                      <a href="https://youtu.be/gTesgizhTmY" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        YouTube
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Note-ing Hill: Smart Note-Taking App */}
              <Card className="bg-card/5 backdrop-blur-md shadow-lg shadow-black/20 border border-black hover:border-black transition-all duration-300 flex flex-col relative overflow-hidden">
                <div className="relative w-full h-40 flex-shrink-0">
                  <img src={`${basePath}/notinghill.png`} alt="Project preview" className="object-cover w-full h-full rounded-t-lg" />
                </div>
                <CardContent className="p-6 flex flex-col flex-grow relative z-10 w-full">
                  <h3 className="text-lg font-bold mb-2 text-foreground">Note-ing Hill: Smart Note-Taking App</h3>
                  <p className="text-foreground/50 mb-2">Academic Research Project</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    <Badge className="bg-transparent border border-black text-black dark:border-white dark:text-white px-1.5 py-0 text-[10px] font-normal" variant="outline">OCR</Badge>
                    <Badge className="bg-transparent border border-black text-black dark:border-white dark:text-white px-1.5 py-0 text-[10px] font-normal" variant="outline">Text Summarization</Badge>
                    <Badge className="bg-transparent border border-black text-black dark:border-white dark:text-white px-1.5 py-0 text-[10px] font-normal" variant="outline">Android SDK</Badge>
                    <Badge className="bg-transparent border border-black text-black dark:border-white dark:text-white px-1.5 py-0 text-[10px] font-normal" variant="outline">NLP</Badge>
                    <Badge className="bg-transparent border border-black text-black dark:border-white dark:text-white px-1.5 py-0 text-[10px] font-normal" variant="outline">Java</Badge>
                  </div>
                  <div className="relative">
                    <ul className={`list-disc pl-5 space-y-2 mb-4 ${!expandedProjects['noting-hill'] ? 'line-clamp-1' : ''}`}> 
                      <li>Created an Android app using OCR, speech recognition, and text summarization to aid note-taking.</li>
                      <li>Co-authored a research paper on the application's AI-driven learning benefits.</li>
                    </ul>
                    <div className={`flex justify-center mt-2 ${!expandedProjects['noting-hill'] ? 'mb-6' : 'mb-2'}`}> 
                      <button
                        className="flex items-center gap-2 text-black dark:text-white font-medium focus:outline-none"
                        onClick={() => toggleProject('noting-hill')}
                        type="button"
                        aria-label="Expand project description"
                      >
                        <svg
                          className={`w-4 h-4 transition-transform duration-300 ${expandedProjects['noting-hill'] ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center gap-2 mt-3 mt-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-black text-white dark:bg-white dark:text-black border border-border hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white px-3 py-1 flex items-center gap-2"
                      asChild
                    >
                      <a href="https://github.com/Vishnuanand77/Note-ingHill" target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                      GitHub
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-black text-white dark:bg-white dark:text-black border border-border hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white px-3 py-1 flex items-center gap-2"
                      asChild
                    >
                      <a href="https://ieeexplore.ieee.org/document/9793320" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        Academic Paper
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* SWE-Bench Lite: LLM Issue Resolution with and without Documentation */}
              <Card className="bg-card/5 backdrop-blur-md shadow-lg shadow-black/20 border border-black hover:border-black transition-all duration-300 flex flex-col relative overflow-hidden">
                <div className="relative w-full h-40 flex-shrink-0">
                  <img src={`${basePath}/swe.png`} alt="Project preview" className="object-cover w-full h-full rounded-t-lg" />
                </div>
                <CardContent className="p-6 flex flex-col flex-grow relative z-10 w-full">
                  <h3 className="text-lg font-bold mb-2 text-foreground">SWE-Bench Lite: Does Documentation help?</h3>
                  <p className="text-foreground/50 mb-2">Independent Experiment | SWE-Bench Dataset + Cursor</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    <Badge className="bg-transparent border border-black text-black dark:border-white dark:text-white px-1.5 py-0 text-[10px] font-normal" variant="outline">GitHub Issue Automation</Badge>
                    <Badge className="bg-transparent border border-black text-black dark:border-white dark:text-white px-1.5 py-0 text-[10px] font-normal" variant="outline">Cursor</Badge>
                    <Badge className="bg-transparent border border-black text-black dark:border-white dark:text-white px-1.5 py-0 text-[10px] font-normal" variant="outline">Software QA</Badge>
                    <Badge className="bg-transparent border border-black text-black dark:border-white dark:text-white px-1.5 py-0 text-[10px] font-normal" variant="outline">Experimental Design</Badge>
                  </div>
                  <div className="relative">
                    <ul className={`list-disc pl-5 space-y-2 mb-4 ${!expandedProjects['swe-bench'] ? 'line-clamp-1' : ''}`}> 
                      <li>Evaluated LLM performance (OpenAI, Claude) on resolving GitHub issues using the SWE-Bench Lite dataset.</li>
                      <li>Tested whether providing documentation context improved model accuracy in identifying and patching code issues.</li>
                      <li>Observed slight performance gains with documentation, validating the role of context in LLM-assisted software engineering.</li>
                    </ul>
                    <div className={`flex justify-center mt-2 ${!expandedProjects['swe-bench'] ? 'mb-6' : 'mb-2'}`}> 
                      <button
                        className="flex items-center gap-2 text-black dark:text-white font-medium focus:outline-none"
                        onClick={() => toggleProject('swe-bench')}
                        type="button"
                        aria-label="Expand project description"
                      >
                        <svg
                          className={`w-4 h-4 transition-transform duration-300 ${expandedProjects['swe-bench'] ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center gap-2 mt-3 mt-auto">
                    <Button variant="outline" size="sm" className="bg-black text-white dark:bg-white dark:text-black border border-border hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white px-3 py-1 flex items-center gap-2" asChild>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                        GitHub
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" className="bg-black text-white dark:bg-white dark:text-black border border-border hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white px-3 py-1 flex items-center gap-2" asChild>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        YouTube
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* March Madness Prediction – CCAC Kaggle Case Competition */}
              <Card className="bg-card/5 backdrop-blur-md shadow-lg shadow-black/20 border border-black hover:border-black transition-all duration-300 flex flex-col relative overflow-hidden">
                <div className="relative w-full h-40 flex-shrink-0">
                  <img src={`${basePath}/ccac.png`} alt="Project preview" className="object-cover w-full h-full rounded-t-lg" />
                </div>
                <CardContent className="p-6 flex flex-col flex-grow relative z-10 w-full">
                  <h3 className="text-lg font-bold mb-2 text-foreground">March Madness Picks Prediction</h3>
                  <p className="text-foreground/50 mb-2">Kaggle Competition – Crossroads Classic Analytics Challenge</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    <Badge className="bg-transparent border border-black text-black dark:border-white dark:text-white px-1.5 py-0 text-[10px] font-normal" variant="outline">Machine Learning</Badge>
                    <Badge className="bg-transparent border border-black text-black dark:border-white dark:text-white px-1.5 py-0 text-[10px] font-normal" variant="outline">Neural Networks</Badge>
                    <Badge className="bg-transparent border border-black text-black dark:border-white dark:text-white px-1.5 py-0 text-[10px] font-normal" variant="outline">Feature Engineering</Badge>

                  </div>
                  <div className="relative">
                    <ul className={`list-disc pl-5 space-y-2 mb-4 ${!expandedProjects['march-madness'] ? 'line-clamp-1' : ''}`}> 
                      <li>Built predictive models to forecast user picks in March Madness tournaments using historical data from inception to 2024.</li>
                      <li>Engineered domain-specific features and applied ensemble methods including CatBoost, GBDT, Random Forest, and Neural Networks.</li>
                      <li>Achieved 66% accuracy, outperforming baseline models in predicting bracket outcomes.</li>
                    </ul>
                    <div className={`flex justify-center mt-2 ${!expandedProjects['march-madness'] ? 'mb-6' : 'mb-2'}`}> 
                      <button
                        className="flex items-center gap-2 text-black dark:text-white font-medium focus:outline-none"
                        onClick={() => toggleProject('march-madness')}
                        type="button"
                        aria-label="Expand project description"
                      >
                        <svg
                          className={`w-4 h-4 transition-transform duration-300 ${expandedProjects['march-madness'] ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center gap-2 mt-3 mt-auto">
                    <Button variant="outline" size="sm" className="bg-black text-white dark:bg-white dark:text-black border border-border hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white px-3 py-1 flex items-center gap-2" asChild>
                      <a href="https://github.com/Vishnuanand77/Crossroads-Classic-Analytics-Challenge-Learning-Machine" target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                        GitHub
                      </a>
                    </Button>
                    {/* <Button variant="outline" size="sm" className="bg-black text-white dark:bg-white dark:text-black border border-border hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white px-3 py-1 flex items-center gap-2" asChild>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        YouTube
                      </a>
                    </Button> */}
                  </div>
                </CardContent>
              </Card>

              {/* Burlington Ecommerce Strategy */}
              <Card className="bg-card/5 backdrop-blur-md shadow-lg shadow-black/20 border border-black hover:border-black transition-all duration-300 flex flex-col relative overflow-hidden">
                <div className="relative w-full h-40 flex-shrink-0">
                  <img src={`${basePath}/burlington.png`} alt="Project preview" className="object-cover w-full h-full rounded-t-lg" />
                </div>
                <CardContent className="p-6 flex flex-col flex-grow relative z-10 w-full">
                  <h3 className="text-lg font-bold mb-2 text-foreground">Burlington Ecommerce Strategy</h3>
                  <p className="text-foreground/50 mb-2">Technology-Driven Business – Course Project</p>
                  <div className="flex flex-wrap gap-1 mb-2">



                    <Badge className="bg-transparent border border-black text-black dark:border-white dark:text-white px-1.5 py-0 text-[10px] font-normal" variant="outline">Market Research</Badge>

                    <Badge className="bg-transparent border border-black text-black dark:border-white dark:text-white px-1.5 py-0 text-[10px] font-normal" variant="outline">Data Visualization</Badge>
                    <Badge className="bg-transparent border border-black text-black dark:border-white dark:text-white px-1.5 py-0 text-[10px] font-normal" variant="outline">Business Strategy</Badge>
                  </div>
                  <div className="relative">
                    <ul className={`list-disc pl-5 space-y-2 mb-4 ${!expandedProjects['burlington'] ? 'line-clamp-1' : ''}`}> 
                      <li>Analyzed Burlington's online sales and web activity to recommend revitalization strategies.</li>
                      <li>Created dashboards and summarized key consumer behavior insights.</li>
                    </ul>
                    <div className={`flex justify-center mt-2 ${!expandedProjects['burlington'] ? 'mb-6' : 'mb-2'}`}> 
                      <button
                        className="flex items-center gap-2 text-black dark:text-white font-medium focus:outline-none"
                        onClick={() => toggleProject('burlington')}
                        type="button"
                        aria-label="Expand project description"
                      >
                        <svg
                          className={`w-4 h-4 transition-transform duration-300 ${expandedProjects['burlington'] ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center gap-2 mt-3 mt-auto">
                    {/* <Button variant="outline" size="sm" className="bg-black text-white dark:bg-white dark:text-black border border-border hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white px-3 py-1 flex items-center gap-2" asChild>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                        GitHub
                      </a>
                    </Button> */}
                    <Button variant="outline" size="sm" className="bg-black text-white dark:bg-white dark:text-black border border-border hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white px-3 py-1 flex items-center gap-2" asChild>
                      <a href="https://youtu.be/EBHeeg3ahRI" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        YouTube
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Licenses & Certifications Section */}
          <section
            id="certifications"
            ref={skillsAnimation.ref}
            className={`py-12 transition-all duration-1000 ease-out ${
              skillsAnimation.isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <h2 className="text-5xl font-bold tracking-tighter mb-6 text-foreground">Licenses & Certifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Google Data Analytics Certificate */}
              <Card className="bg-card/5 backdrop-blur-md shadow-lg shadow-black/20 border border-black hover:border-black transition-all duration-300 flex flex-col">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <img src={`${basePath}/google.png`} alt="Google Logo" className="w-16 h-16 rounded-lg object-contain bg-white p-1" />
                    <div>
                      <h3 className="text-lg font-bold text-foreground">Google Professional Data Analytics Certificate</h3>
                      <p className="text-foreground/50">Google</p>
                      <p className="text-foreground/50">Issued Sep 2021</p>
                  </div>
                  </div>
                    <Button
                      variant="outline"
                      size="sm"
                    className="bg-black text-white dark:bg-white dark:text-black border border-border hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white px-2 py-0.5 flex items-center gap-1 mt-auto"
                      asChild
                    >
                    <a href="https://www.credly.com/badges/533b4c65-dd42-4f0d-b078-8555ee40b5d5?source=linked_in_profile" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3 h-3" />
                      View Credential
                    </a>
                    </Button>
                </CardContent>
              </Card>
              {/* Microsoft Certified: Azure AI Fundamentals (AI-900) */}
              <Card className="bg-card/5 backdrop-blur-md shadow-lg shadow-black/20 border border-black hover:border-black transition-all duration-300 flex flex-col">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <img src={`${basePath}/microsoft.png`} alt="Microsoft Logo" className="w-16 h-16 rounded-lg object-contain bg-white p-1" />
                    <div>
                      <h3 className="text-lg font-bold text-foreground">Microsoft Certified: Azure AI Fundamentals (AI-900)</h3>
                      <p className="text-foreground/50">Microsoft</p>
                      <p className="text-foreground/50">Issued Oct 2024</p>
                    </div>
                  </div>
                    <Button
                      variant="outline"
                      size="sm"
                    className="bg-black text-white dark:bg-white dark:text-black border border-border hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white px-2 py-0.5 flex items-center gap-1 mt-auto"
                      asChild
                    >
                    <a href="https://www.credly.com/badges/4de9611c-614e-437c-a37f-1b8ddaf7e1d5/linked_in_profile" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3 h-3" />
                      View Credential
                    </a>
                    </Button>
                </CardContent>
              </Card>
              {/* Forecasting Using Model Studio in SAS Viya */}
              <Card className="bg-card/5 backdrop-blur-md shadow-lg shadow-black/20 border border-black hover:border-black transition-all duration-300 flex flex-col">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <img src={`${basePath}/sas.png`} alt="SAS Logo" className="w-16 h-16 rounded-lg object-contain bg-white p-1" />
                    <div>
                      <h3 className="text-lg font-bold text-foreground">Forecasting Using Model Studio in SAS Viya</h3>
                      <p className="text-foreground/50">SAS</p>
                      <p className="text-foreground/50">Issued Apr 2025</p>
                  </div>
                  </div>
                    <Button
                      variant="outline"
                      size="sm"
                    className="bg-black text-white dark:bg-white dark:text-black border border-border hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white px-2 py-0.5 flex items-center gap-1 mt-auto"
                      asChild
                    >
                    <a href="https://www.credly.com/badges/dda5f79f-4a0f-4611-bf07-761d3835bb16/linked_in_profile" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3 h-3" />
                      View Credential
                    </a>
                    </Button>
                </CardContent>
              </Card>
              {/* Optimization Concepts for Data Science and Artificial Intelligence */}
              <Card className="bg-card/5 backdrop-blur-md shadow-lg shadow-black/20 border border-black hover:border-black transition-all duration-300 flex flex-col">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <img src={`${basePath}/sas.png`} alt="SAS Logo" className="w-16 h-16 rounded-lg object-contain bg-white p-1" />
                    <div>
                      <h3 className="text-lg font-bold text-foreground">Optimization Concepts for Data Science and Artificial Intelligence</h3>
                      <p className="text-foreground/50">SAS</p>
                      <p className="text-foreground/50">Issued Apr 2025</p>
                    </div>
                  </div>
                    <Button
                      variant="outline"
                      size="sm"
                    className="bg-black text-white dark:bg-white dark:text-black border border-border hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white px-2 py-0.5 flex items-center gap-1 mt-auto"
                      asChild
                    >
                    <a href="https://www.credly.com/badges/3b1136c5-c802-4475-a8c1-237df641ea35/linked_in_profile" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3 h-3" />
                      View Credential
                    </a>
                    </Button>
                </CardContent>
              </Card>
              {/* Tableau Desktop Specialist */}
              <Card className="bg-card/5 backdrop-blur-md shadow-lg shadow-black/20 border border-black hover:border-black transition-all duration-300 flex flex-col">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <img src={`${basePath}/tableau.png`} alt="Tableau Logo" className="w-16 h-16 rounded-lg object-contain bg-white p-1" />
                    <div>
                      <h3 className="text-lg font-bold text-foreground">Tableau Desktop Specialist</h3>
                      <p className="text-foreground/50">Tableau</p>
                  </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-black text-white dark:bg-white dark:text-black border border-border hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white px-2 py-0.5 flex items-center gap-1 mt-auto"
                    disabled
                  >
                    Exam Scheduled
                  </Button>
                </CardContent>
              </Card>
              {/* AWS Certified Cloud Practitioner (pending voucher / training complete) */}
              <Card className="bg-card/5 backdrop-blur-md shadow-lg shadow-black/20 border border-black hover:border-black transition-all duration-300 flex flex-col">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <img src={`${basePath}/AWS.png`} alt="AWS Logo" className="w-16 h-16 rounded-lg object-contain bg-white p-1" />
                    <div>
                      <h3 className="text-lg font-bold text-foreground">AWS Certified Cloud Practitioner</h3>
                      <p className="text-foreground/50">Amazon Web Services</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-black text-white dark:bg-white dark:text-black border border-border hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white px-2 py-0.5 flex items-center gap-1 mt-auto"
                    disabled
                  >
                    Exam Scheduled
                  </Button>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* LinkedIn Card */}
              <Card className="bg-card/5 backdrop-blur-md shadow-lg shadow-black/20 border border-black hover:border-black transition-all duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                  <Linkedin className="w-12 h-12 text-foreground" />
                  <h3 className="text-lg font-bold text-foreground">LinkedIn</h3>
                  <p className="text-foreground/50">Connect with me on LinkedIn</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-black text-white dark:bg-white dark:text-black border border-border hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white px-3 py-1 flex items-center gap-2"
                    asChild
                  >
                    <a href="https://www.linkedin.com/in/vishnuanand77/" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                      Connect
                    </a>
                  </Button>
              </CardContent>
            </Card>

              {/* Email Card */}
              <Card className="bg-card/5 backdrop-blur-md shadow-lg shadow-black/20 border border-black hover:border-black transition-all duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                  <Mail className="w-12 h-12 text-foreground" />
                  <h3 className="text-lg font-bold text-foreground">Email</h3>
                  <p className="text-foreground/50">Get in touch via email</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-black text-white dark:bg-white dark:text-black border border-border hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white px-3 py-1 flex items-center gap-2"
                    asChild
                  >
                    <a href="mailto:vishnuanand2000@gmail.com">
                      <Mail className="w-4 h-4" />
                      Send Email
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Instagram Card */}
              <Card className="bg-card/5 backdrop-blur-md shadow-lg shadow-black/20 border border-black hover:border-black transition-all duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                  <svg className="w-12 h-12 text-foreground" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <h3 className="text-lg font-bold text-foreground">Instagram</h3>
                  <p className="text-foreground/50">Follow my photography journey</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-black text-white dark:bg-white dark:text-black border border-border hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white px-3 py-1 flex items-center gap-2"
                    asChild
                  >
                    <a href="https://www.instagram.com/visnu.jpg/" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                      Follow
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="relative z-10 border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left w-full">
                <p className="text-sm text-foreground/60">
                  © {new Date().getFullYear()} Vishnu Anand. All rights reserved.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Link href="https://github.com/Vishnuanand77" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="text-foreground/60 hover:text-foreground">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
                <Link href="https://www.linkedin.com/in/vishnuanand77/" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="text-foreground/60 hover:text-foreground">
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </Link>
                <Link href="https://www.instagram.com/visnu.jpg/" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="text-foreground/60 hover:text-foreground">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span className="sr-only">Instagram</span>
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center items-center gap-2 mt-4">
              <img src={`${basePath}/cursor.png`} alt="Cursor Logo" className="w-6 h-6" />
              <span className="text-xs text-foreground/50">This website was made with Cursor</span>
            </div>
          </div>
        </footer>
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
