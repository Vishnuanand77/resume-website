import type { Metadata } from 'next'
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: 'Vishnu Anand | Business Analyst & AI Software Engineer',
  description: 'Portfolio website of Vishnu Anand - Business Analyst and AI Software Engineer specializing in data analytics, machine learning, and full-stack development.',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
