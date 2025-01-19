import localFont from 'next/font/local'

export const workSans = localFont({
  src: [
    {
      path: './WorkSans-VariableFont_wght.ttf'
    },
    {
      path: './WorkSans-Italic-VariableFont_wght.ttf',
      style: 'italic'
    }
  ],
  variable: '--font-worksans',
  display: 'swap',
  preload: true
})
