'use client'

import * as React from 'react'
import { Laptop, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

const themeOrder = ['light', 'dark', 'system'] as const
type ThemeOption = (typeof themeOrder)[number]
const themeLabels = {
  light: 'Light',
  dark: 'Dark',
  system: 'System'
} as const

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant='outline'
        size='icon'
        aria-hidden='true'
        className='opacity-0'
        disabled
      />
    )
  }

  const currentTheme: ThemeOption = themeOrder.includes(theme as ThemeOption)
    ? (theme as ThemeOption)
    : 'system'
  const currentIndex = themeOrder.indexOf(currentTheme)
  const nextTheme =
    themeOrder[(currentIndex + 1) % themeOrder.length] ?? 'system'

  const Icon =
    currentTheme === 'light'
      ? Sun
      : currentTheme === 'dark'
        ? Moon
        : Laptop

  return (
    <Button
      variant='outline'
      size='icon'
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${themeLabels[nextTheme]} theme`}
      title={`Theme: ${themeLabels[currentTheme]}`}
    >
      <Icon className='h-4 w-4' />
      <span className='sr-only'>Switch theme</span>
    </Button>
  )
}
