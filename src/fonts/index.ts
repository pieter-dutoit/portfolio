import { Google_Sans, PT_Serif_Caption } from 'next/font/google'

export const googleSans = Google_Sans({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-google-sans',
  // Next.js does not provide fallback sizing metrics for Google Sans.
  adjustFontFallback: false,
  display: 'swap'
})

export const ptSerifCaption = PT_Serif_Caption({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pt-serif-caption',
  display: 'swap'
})
