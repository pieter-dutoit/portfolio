import { Button } from '@/components/ui/button'
import type { MDXComponents } from 'mdx/types'
import type { ComponentProps } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'

const DEFAULT_MDX_IMAGE = { width: 1200, height: 675 }
const DEFAULT_MDX_ASPECT_RATIO =
  DEFAULT_MDX_IMAGE.width / DEFAULT_MDX_IMAGE.height

function parseDimension(value?: number | string) {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : undefined
  }
  if (typeof value === 'string') {
    const parsed = Number.parseInt(value, 10)
    return Number.isFinite(parsed) ? parsed : undefined
  }
  return undefined
}

export function MDXLink({ href, className, ...props }: ComponentProps<'a'>) {
  const isInternal = href?.startsWith('/') || href?.startsWith('#')
  if (isInternal && href) {
    return (
      <Button
        asChild
        variant='link'
        size='inline'
        className={cn('not-prose', className)}
      >
        <Link href={href} {...props} />
      </Button>
    )
  }
  return (
    <Button
      asChild
      variant='link'
      size='inline'
      className={cn('not-prose', className)}
    >
      <a href={href} target='_blank' rel='noreferrer' {...props} />
    </Button>
  )
}

const components: MDXComponents = {
  a: MDXLink,
  img: ({ className, src, alt, width, height }) => {
    if (!src) {
      return null
    }

    const resolvedWidth = parseDimension(width)
    const resolvedHeight = parseDimension(height)
    const aspectRatio =
      resolvedWidth && resolvedHeight
        ? resolvedWidth / resolvedHeight
        : DEFAULT_MDX_ASPECT_RATIO

    return (
      <span
        className={cn(
          'border-border relative my-8 block w-full overflow-hidden rounded-lg border',
          className
        )}
        style={{ aspectRatio }}
      >
        <Image
          src={src}
          alt={alt ?? ''}
          fill
          sizes='(max-width: 768px) 100vw, 768px'
          className='object-contain'
        />
      </span>
    )
  }
}

export function useMDXComponents(): MDXComponents {
  return components
}
