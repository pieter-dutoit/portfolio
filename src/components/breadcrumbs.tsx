import { Button } from '@/components/ui/button'
import Link from 'next/link'

import { cn } from '@/lib/utils'

export type BreadcrumbItem = {
  label: string
  href: string
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      aria-label='Breadcrumb'
      className={cn('text-meta text-muted-foreground', className)}
    >
      <ol className='flex flex-wrap items-center gap-2'>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li
              key={`${item.href}-${item.label}`}
              className='flex items-center gap-2'
            >
              {index > 0 ? (
                <span aria-hidden='true' className='text-muted-foreground/60'>
                  /
                </span>
              ) : null}
              {isLast ? (
                <span aria-current='page' className='text-foreground'>
                  {item.label}
                </span>
              ) : (
                <Button asChild variant='link' size='inline'>
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
