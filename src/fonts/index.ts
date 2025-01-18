import localFont from 'next/font/local'

export const roboto = localFont({
  src: [
    {
      path: './Roboto-VariableFont_wdth,wght.ttf'
    },
    {
      path: './Roboto-Italic-VariableFont_wdth,wght.ttf',
      style: 'italic'
    }
  ],
  variable: '--font-roboto',
  display: 'swap',
  preload: true
})
