import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { formatDate } from '@/lib/utils'
import type { PostListItem } from '@/lib/posts'

export default function PostTile({ post }: { post: PostListItem }) {
  return (
    <article className='h-full min-w-0'>
      <Card asChild className='flex h-full flex-col'>
        <Link href={`/blog/${post.slug}`}>
          <div className='relative aspect-[16/10] shrink-0 overflow-hidden'>
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw'
              className='object-cover transition duration-500 group-hover/card:scale-105'
            />
          </div>

          <div className='flex flex-1 flex-col gap-3 p-5'>
            <CardHeader className='gap-3 p-0'>
              <div className='text-meta text-muted-foreground'>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
              <CardTitle asChild className='line-clamp-2 min-h-[2lh]'>
                <h2>{post.title}</h2>
              </CardTitle>
              <CardDescription className='line-clamp-2 min-h-[2lh]'>
                {post.excerpt}
              </CardDescription>
            </CardHeader>
            <CardFooter className='mt-auto flex-wrap gap-2 p-0 pt-2'>
              {post.tags.map((tag) => (
                <Badge key={`${post.slug}-${tag}`} variant='secondary'>
                  {tag}
                </Badge>
              ))}
            </CardFooter>
          </div>
        </Link>
      </Card>
    </article>
  )
}
