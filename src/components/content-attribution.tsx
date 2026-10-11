import Link from 'next/link'
import type { ReactNode } from 'react'

import { profile } from '@/data/resume'
import { formatDate } from '@/lib/utils'

type ContentAttributionProps = {
  publishedAt: string
  updatedAt?: string
  children?: ReactNode
}

export function ContentAttribution({
  publishedAt,
  updatedAt,
  children
}: ContentAttributionProps) {
  return (
    <div className='text-meta text-muted-foreground flex flex-wrap items-start gap-x-3 gap-y-1'>
      <span className='shrink-0'>
        Published <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
      </span>
      {updatedAt && (
        <span className='shrink-0'>
          Updated <time dateTime={updatedAt}>{formatDate(updatedAt)}</time>
        </span>
      )}
      <span className='shrink-0'>
        By{' '}
        <Link href='/' className='underline underline-offset-4'>
          {profile.full_name}
        </Link>
      </span>
      {children}
    </div>
  )
}
