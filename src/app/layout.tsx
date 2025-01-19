import type { Metadata } from 'next'

import Navbar from '@/components/navbar'

import './globals.css'
import { workSans } from '@/fonts'

export const metadata: Metadata = {
  title: 'Portfolio | Pieter du Toit',
  description: 'Porfessional portfolio of Pieter du Toit'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${workSans.className} antialiased`}>
        <header>
          <Navbar />
        </header>

        <main className='bg-gradient-to-b from-gray-950 to-black'>
          <div className='container mx-auto px-6'>{children}</div>
        </main>
      </body>
    </html>
  )
}
