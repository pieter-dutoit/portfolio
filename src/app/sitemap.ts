import type { MetadataRoute } from 'next'

import { getAllPosts } from '@/lib/posts'
import { getAllProjects } from '@/lib/projects'
import { resolveUrl } from '@/lib/seo'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/',
    '/blog',
    '/projects',
    '/demos/forms',
    ...getAllPosts().map(({ slug }) => `/blog/${slug}`),
    ...getAllProjects().map(({ slug }) => `/projects/${slug}`)
  ]

  return paths.map((path) => ({ url: resolveUrl(path) }))
}
