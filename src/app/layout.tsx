import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

import SiteHeader from '@/components/site-header'

import './globals.css'
import { googleSans, ptSerifCaption } from '@/fonts'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: {
    default: 'Portfolio | Pieter du Toit',
    template: '%s | Pieter du Toit'
  },
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
      <body className='bg-background from-background to-background-end text-foreground min-h-dvh bg-linear-to-b font-sans antialiased'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Button
            asChild
            className='sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50'
          >
            <a href='#main-content'>Skip to main content</a>
          </Button>
          <SiteHeader />

          <main
            id='main-content'
            tabIndex={-1}
            className='@container scroll-mt-20'
          >
            <div className='container mx-auto px-6'>{children}</div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
