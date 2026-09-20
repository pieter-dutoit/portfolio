import { Google_Sans, PT_Serif_Caption } from 'next/font/google'

export const googleSans = Google_Sans({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-google-sans',
  // An explicit fallback prevents Turbopack looking up missing Google Sans metrics.
  fallback: ['Arial', 'sans-serif'],
  adjustFontFallback: false,
  display: 'swap'
})

export const ptSerifCaption = PT_Serif_Caption({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pt-serif-caption',
  display: 'swap'
})
