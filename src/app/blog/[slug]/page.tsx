import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import Breadcrumbs from '@/components/breadcrumbs'
import JsonLd from '@/components/json-ld'
import { PostAttribution } from '@/components/posts/post-attribution'
import { getSiteUrl, resolveUrl } from '@/lib/seo'
import {
  buildBlogPostingNode,
  buildBreadcrumbNode,
  buildJsonLdGraph,
  buildSiteNodes,
  buildWebPageNode,
  getBlogPostingId,
  getBreadcrumbId,
  getPersonId,
  getWebSiteId
} from '@/lib/structured-data'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { Badge } from '@/components/ui/badge'

export const dynamicParams = false

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) {
    return {
      title: 'Post not found'
    }
  }

  return {
    title: post.title,
    description: post.excerpt
  }
}

export default async function PostPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const { default: Post } = await import(`@/content/posts/${post.fileName}`)

  const siteUrl = getSiteUrl()
  const pageUrl = resolveUrl(`/blog/${post.slug}`)
  const personId = getPersonId(siteUrl)
  const webSiteId = getWebSiteId(siteUrl)

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: post.title, href: `/blog/${post.slug}` }
  ]
  const jsonLd = buildJsonLdGraph([
    ...buildSiteNodes(siteUrl),
    buildWebPageNode({
      url: pageUrl,
      name: post.title,
      description: post.excerpt,
      websiteId: webSiteId,
      mainEntityId: getBlogPostingId(pageUrl),
      breadcrumbId: getBreadcrumbId(pageUrl)
    }),
    buildBlogPostingNode({
      post,
      pageUrl,
      authorId: personId,
      websiteId: webSiteId
    }),
    buildBreadcrumbNode({ items: breadcrumbItems, pageUrl })
  ])

  return (
    <article className='article-copy w-full max-w-3xl py-12'>
      <Breadcrumbs items={breadcrumbItems} />
      <JsonLd data={jsonLd} />

      <header className='mt-6 flex flex-col gap-6'>
        <div className='flex flex-col gap-2'>
          <PostAttribution
            date={post.date}
            updatedAt={post.updatedAt}
            aiAssistance={post.aiAssistance}
          />
          <h1>{post.title}</h1>
          <p className='text-muted-foreground max-w-2xl'>{post.excerpt}</p>
        </div>

        <div className='flex flex-wrap gap-2'>
          {post.tags.map((tag) => (
            <Badge key={`${post.slug}-${tag}`} variant='secondary'>
              {tag}
            </Badge>
          ))}
          {post.stack.map((stack) => (
            <Badge
              key={`${post.slug}-${stack}`}
              variant='outline'
              className='text-muted-foreground'
            >
              {stack}
            </Badge>
          ))}
        </div>

        <div className='border-border relative aspect-video overflow-hidden rounded-2xl border'>
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            sizes='(max-width: 1024px) 100vw, 70vw'
            className='object-cover'
          />
        </div>
      </header>

      <div className='mt-10'>
        <div className='prose prose-article prose-a:text-sky-600 dark:prose-invert dark:prose-a:text-sky-300 max-w-none'>
          <Post />
        </div>
      </div>
    </article>
  )
}
