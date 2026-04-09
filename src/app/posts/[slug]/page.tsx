import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import Breadcrumbs from '@/components/breadcrumbs'
import JsonLd from '@/components/json-ld'
import { profile, socialLinks } from '@/data/resume'
import { getSiteUrl, resolveUrl } from '@/lib/seo'
import {
  buildBlogPostingNode,
  buildBreadcrumbNode,
  buildJsonLdGraph,
  buildPersonNode,
  buildWebPageNode,
  buildWebSiteNode,
  getPersonId,
  getWebSiteId
} from '@/lib/structured-data'
import { formatDate } from '@/lib/utils'
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
  const pageUrl = resolveUrl(`/posts/${post.slug}`)
  const personId = getPersonId(siteUrl)
  const webSiteId = getWebSiteId(siteUrl)

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Posts', href: '/posts' },
    { label: post.title, href: `/posts/${post.slug}` }
  ]
  const jsonLd = buildJsonLdGraph([
    buildWebSiteNode({
      siteUrl,
      name: `${profile.full_name} Portfolio`
    }),
    buildPersonNode({ profile, socialLinks, siteUrl }),
    buildWebPageNode({
      url: pageUrl,
      name: post.title,
      description: post.excerpt,
      websiteId: webSiteId
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
    <article className='w-full max-w-3xl py-12'>
      <Breadcrumbs items={breadcrumbItems} />
      <JsonLd data={jsonLd} />

      <header className='mt-6 space-y-6'>
        <div className='space-y-2'>
          <p className='text-muted-foreground text-xs tracking-widest uppercase'>
            {formatDate(post.date)}
          </p>
          <h1 className='text-foreground text-4xl font-semibold md:text-5xl'>
            {post.title}
          </h1>
          <p className='text-muted-foreground max-w-2xl text-base'>
            {post.excerpt}
          </p>
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

        <div className='border-border/60 relative aspect-video overflow-hidden rounded-2xl border'>
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
        <div className='prose prose-headings:font-semibold prose-a:text-sky-600 dark:prose-invert dark:prose-a:text-sky-300 max-w-none'>
          <Post />
        </div>
      </div>
    </article>
  )
}
