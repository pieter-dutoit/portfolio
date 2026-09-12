import type { Metadata } from 'next'

import SiteHeader from '@/components/site-header'

import './globals.css'
import { googleSans, ptSerifCaption } from '@/fonts'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'Portfolio | Pieter du Toit',
  description: 'Professional portfolio of Pieter du Toit'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='en'
      className={`${googleSans.variable} ${ptSerifCaption.variable}`}
      suppressHydrationWarning
    >
      <body className='bg-background text-foreground min-h-screen font-sans antialiased'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <a
            href='#main-content'
            className='focus:bg-background focus:text-foreground focus:outline-ring sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:px-4 focus:py-2 focus:outline-2'
          >
            Skip to main content
          </a>
          <SiteHeader />

          <main
            id='main-content'
            tabIndex={-1}
            className='from-background to-card scroll-mt-20 bg-linear-to-b'
          >
            <div className='container mx-auto px-6'>{children}</div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
