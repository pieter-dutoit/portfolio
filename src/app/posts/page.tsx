import type { Metadata } from 'next'
import { Suspense } from 'react'

import Breadcrumbs from '@/components/breadcrumbs'
import JsonLd from '@/components/json-ld'
import PostsIndex from '@/components/posts/posts-index'
import { getAllPosts } from '@/lib/posts'
import { getSiteUrl, resolveUrl } from '@/lib/seo'
import {
  buildBreadcrumbNode,
  buildJsonLdGraph,
  buildItemListNode,
  buildWebPageNode,
  buildSiteNodes,
  getBreadcrumbId,
  getItemListId,
  getWebSiteId
} from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'Posts',
  description: 'Articles and notes on design, engineering, and product craft.'
}

function PostsIndexFallback() {
  return (
    <section className='text-muted-foreground py-16 text-center text-sm'>
      Loading posts...
    </section>
  )
}

export default function PostsPage() {
  const posts = getAllPosts()
  const tagSet = new Set(posts.flatMap((post) => post.tags))
  const stackSet = new Set(posts.flatMap((post) => post.stack))

  const siteUrl = getSiteUrl()
  const pageUrl = resolveUrl('/posts')
  const webSiteId = getWebSiteId(siteUrl)
  const itemListId = getItemListId(pageUrl)

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Posts', href: '/posts' }
  ]

  const jsonLd = buildJsonLdGraph([
    ...buildSiteNodes(siteUrl),
    buildWebPageNode({
      url: pageUrl,
      name: 'Posts',
      description: metadata.description ?? undefined,
      type: 'CollectionPage',
      websiteId: webSiteId,
      mainEntityId: itemListId,
      breadcrumbId: getBreadcrumbId(pageUrl)
    }),
    buildItemListNode({
      pageUrl,
      items: posts.map((post) => ({
        name: post.title,
        url: resolveUrl(`/posts/${post.slug}`)
      }))
    }),
    buildBreadcrumbNode({ items: breadcrumbItems, pageUrl })
  ])

  return (
    <div className='py-12'>
      <Breadcrumbs items={breadcrumbItems} />
      <JsonLd data={jsonLd} />

      <Suspense fallback={<PostsIndexFallback />}>
        <PostsIndex
          posts={posts.map(({ fileName: _fileName, ...rest }) => rest)}
          tags={[...tagSet].sort()}
          stacks={[...stackSet].sort()}
        />
      </Suspense>
    </div>
  )
}
