import type { Metadata } from 'next'

import Breadcrumbs from '@/components/breadcrumbs'
import CollectionIndex from '@/components/collection-index'
import JsonLd from '@/components/json-ld'
import PostTile from '@/components/posts/post-tile'
import { Card, CardContent, CardDescription } from '@/components/ui/card'
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

const description = 'Technical articles and notes on building web applications.'

export const metadata: Metadata = {
  title: 'Blog',
  description
}

export default function PostsPage() {
  const posts = getAllPosts()

  const siteUrl = getSiteUrl()
  const pageUrl = resolveUrl('/blog')
  const webSiteId = getWebSiteId(siteUrl)
  const itemListId = getItemListId(pageUrl)

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' }
  ]

  const jsonLd = buildJsonLdGraph([
    ...buildSiteNodes(siteUrl),
    buildWebPageNode({
      url: pageUrl,
      name: 'Blog',
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
        url: resolveUrl(`/blog/${post.slug}`)
      }))
    }),
    buildBreadcrumbNode({ items: breadcrumbItems, pageUrl })
  ])

  return (
    <div className='flex flex-col gap-6 py-12'>
      <Breadcrumbs items={breadcrumbItems} />
      <JsonLd data={jsonLd} />

      <CollectionIndex title='Blog' description={description}>
        {posts.length > 0 ? (
          posts.map((post) => <PostTile key={post.slug} post={post} />)
        ) : (
          <Card className='col-span-full p-12 text-center'>
            <CardContent className='p-0'>
              <CardDescription>No posts yet.</CardDescription>
            </CardContent>
          </Card>
        )}
      </CollectionIndex>
    </div>
  )
}
