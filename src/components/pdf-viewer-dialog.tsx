'use client'

import { Button } from '@/components/ui/button'

import { useRef, type ReactElement } from 'react'
import { FileText } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

interface PdfViewerDialogProps {
  src: string
  title: string
  triggerLabel?: string
  trigger?: ReactElement
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export default function PdfViewerDialog({
  src,
  title,
  triggerLabel = 'View document',
  trigger,
  open,
  onOpenChange
}: PdfViewerDialogProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button
            type='button'
            variant='link'
            size='inline'
            aria-label={`${triggerLabel}: ${title}`}
          >
            {triggerLabel}
            <FileText aria-hidden='true' data-icon='inline-end' />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(event) => {
          event.preventDefault()
          titleRef.current?.focus()
        }}
        aria-describedby={undefined}
        className='flex h-[90dvh] w-[calc(100%-2rem)] max-w-5xl flex-col gap-0 overflow-hidden rounded-lg p-4 pt-12'
      >
        <DialogTitle ref={titleRef} tabIndex={-1} className='sr-only'>
          {title}
        </DialogTitle>
        <iframe
          src={`${src}${src.includes('#') ? '&' : '#'}toolbar=0&navpanes=0`}
          title={title}
          className='min-h-0 w-full flex-1 border-0'
        />
      </DialogContent>
    </Dialog>
  )
}
