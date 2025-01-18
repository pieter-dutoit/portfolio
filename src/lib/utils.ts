import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | undefined): string {
  if (!date) return ''
  return new Date(date).toLocaleString('en-US', {
    month: 'short',
    year: 'numeric'
  })
}
