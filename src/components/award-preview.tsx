'use client'

import { useSearchParams } from 'next/navigation'

import PdfViewerDialog from './pdf-viewer-dialog'

interface AwardPreviewProps {
  slug?: string
  src: string
  title: string
}

export default function AwardPreview({ slug, src, title }: AwardPreviewProps) {
  const searchParams = useSearchParams()

  function handleOpenChange(open: boolean) {
    if (!slug) return

    const url = new URL(window.location.href)

    if (open) {
      url.searchParams.set('award', slug)
      window.history.pushState(null, '', url)
    } else {
      url.searchParams.delete('award')
      window.history.replaceState(null, '', url)
    }
  }

  return (
    <PdfViewerDialog
      src={src}
      title={title}
      triggerLabel='View award'
      open={slug ? searchParams.get('award') === slug : undefined}
      onOpenChange={slug ? handleOpenChange : undefined}
    />
  )
}
