'use client'

import * as React from 'react'
import { Laptop, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

const themeOrder = ['light', 'dark', 'system'] as const
type ThemeOption = (typeof themeOrder)[number]
const themeLabels = { light: 'Light', dark: 'Dark', system: 'System' } as const

const subscribe = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const mounted = React.useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  )

  if (!mounted) {
    return (
      <Button
        size='icon-sm'
        aria-hidden='true'
        className='invisible'
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
    currentTheme === 'light' ? Sun : currentTheme === 'dark' ? Moon : Laptop

  return (
    <Button
      size='icon-sm'
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${themeLabels[nextTheme]} theme`}
      title={`Theme: ${themeLabels[currentTheme]}`}
      variant='ghost'
    >
      <Icon />
      <span className='sr-only'>Switch theme</span>
    </Button>
  )
}
