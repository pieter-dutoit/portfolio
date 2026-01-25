import type { Metadata } from 'next'

import SiteHeader from '@/components/site-header'

import './globals.css'
import { workSans } from '@/fonts'
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
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${workSans.className} min-h-screen bg-background text-foreground antialiased`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader />

          <main className='bg-linear-to-b from-background to-card'>
            <div className='container mx-auto px-6'>{children}</div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
