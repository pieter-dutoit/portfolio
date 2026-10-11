import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import ContentCarousel from '@/components/content-carousel'
import ContentTile from '@/components/content-tile'
import { Button } from '@/components/ui/button'
import { getAllPosts } from '@/lib/posts'

export default function RecentPosts() {
  const posts = getAllPosts().slice(0, 5)

  if (posts.length === 0) return null

  return (
    <section className='site-copy min-w-0 lg:col-span-3'>
      <ContentCarousel title='Recent posts' headingId='recent-posts-heading'>
        {posts.map((post) => (
          <ContentTile
            key={post.slug}
            href={`/blog/${post.slug}`}
            title={post.title}
            excerpt={post.excerpt}
            thumbnail={post.thumbnail}
            badges={post.tags}
            badgeLabels={{ singular: 'topic', plural: 'topics' }}
            headingLevel='h3'
          />
        ))}
        <Button
          key='all-posts'
          asChild
          variant='muted'
          className='h-full min-h-32 w-full rounded-2xl'
        >
          <Link href='/blog'>
            View all posts
            <ArrowRight aria-hidden='true' data-icon='inline-end' />
          </Link>
        </Button>
      </ContentCarousel>
    </section>
  )
}
