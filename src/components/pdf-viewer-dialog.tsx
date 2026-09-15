'use client'

import type { ReactElement } from 'react'
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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger ?? (
          <button
            type='button'
            className='flex cursor-pointer items-center underline underline-offset-4'
            aria-label={`${triggerLabel}: ${title}`}
          >
            {triggerLabel}
            <FileText aria-hidden='true' className='ml-2' size={16} />
          </button>
        )}
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className='flex h-[90dvh] w-[calc(100%-2rem)] max-w-5xl flex-col gap-0 overflow-hidden rounded-lg p-4 pt-12'
      >
        <DialogTitle className='sr-only'>{title}</DialogTitle>
        <iframe
          src={`${src}${src.includes('#') ? '&' : '#'}toolbar=0&navpanes=0`}
          title={title}
          className='min-h-0 w-full flex-1 border-0'
        />
      </DialogContent>
    </Dialog>
  )
}
