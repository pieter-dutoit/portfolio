import type { ComponentProps } from 'react'

import { MDXLink } from '@/mdx-components'

export function ProjectLink({ href, children, ...props }: ComponentProps<'a'>) {
  let isGitHub = false
  try {
    const url = new URL(href ?? '')
    isGitHub =
      (url.protocol === 'https:' || url.protocol === 'http:') &&
      url.hostname === 'github.com'
  } catch {
    // Relative links use the normal MDX link treatment.
  }

  return (
    <MDXLink href={href} {...props}>
      {isGitHub ? (
        <span
          aria-hidden='true'
          data-icon='inline-start'
          className='bg-current [mask-image:url(/images/icons/github-icon.svg)] [mask-repeat:no-repeat] [mask-size:contain]'
        />
      ) : null}
      {children}
    </MDXLink>
  )
}
