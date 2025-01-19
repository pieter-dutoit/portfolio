import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(
  date: string | undefined,
  format: 'short' | 'full' = 'short'
): string {
  if (!date) return ''
  const options = {
    full: { day: 'numeric', month: 'long', year: 'numeric' },
    short: { month: 'short', year: 'numeric' }
  }[format]
  return new Date(date).toLocaleString(
    'en-US',
    options as Intl.DateTimeFormatOptions
  )
}
