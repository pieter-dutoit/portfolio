'use client'

import { Info } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import type { PostFrontmatter } from '@/lib/posts'

export function AiAssistanceDisclosure({
  tool,
  disclosure
}: NonNullable<PostFrontmatter['aiAssistance']>) {
  const [open, setOpen] = useState(false)
  const pinned = useRef(false)

  useEffect(() => {
    if (!open) return

    function dismiss(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        pinned.current = false
        setOpen(false)
      }
    }

    document.addEventListener('keydown', dismiss)
    return () => document.removeEventListener('keydown', dismiss)
  }, [open])

  return (
    <details
      open={open}
      className='relative min-w-0 basis-full sm:basis-64 sm:flex-1'
      onPointerLeave={() => {
        if (!pinned.current) setOpen(false)
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          pinned.current = false
          setOpen(false)
        }
      }}
    >
      <summary
        className='focus-visible:ring-ring focus-visible:ring-offset-background flex w-fit cursor-pointer list-none items-center gap-1.5 rounded-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none [&::-webkit-details-marker]:hidden'
        onPointerEnter={(event) => {
          if (event.pointerType === 'mouse') setOpen(true)
        }}
        onClick={(event) => {
          event.preventDefault()
          pinned.current = !pinned.current
          setOpen(pinned.current)
        }}
      >
        <span aria-hidden='true' className='mr-1 hidden sm:inline'>·</span>
        <span>AI-assisted with {tool}</span>
        <Info aria-hidden='true' className='size-3.5 shrink-0' />
      </summary>
      <div className='absolute top-full left-0 z-20 w-full max-w-sm pt-2'>
        <p className='border-border bg-popover text-popover-foreground rounded-lg border p-3 shadow-md break-words'>
          {disclosure}
        </p>
      </div>
    </details>
  )
}
