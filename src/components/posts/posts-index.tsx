'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { MultiSelect } from '@/components/multi-select'
import { cn, formatDate } from '@/lib/utils'
import type { PostListItem } from '@/lib/posts'

type PostsIndexProps = {
  posts: PostListItem[]
  tags: string[]
  stacks: string[]
}

const TAG_PARAM = 'tag'
const STACK_PARAM = 'stack'
const QUERY_PARAM = 'q'

function toLower(values: string[]) {
  return values.map((value) => value.toLowerCase())
}

export default function PostsIndex({ posts, tags, stacks }: PostsIndexProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const rawTag = searchParams.get(TAG_PARAM)
  const selectedTag = React.useMemo(() => {
    if (!rawTag) return 'All'
    const match = tags.find((tag) => tag.toLowerCase() === rawTag.toLowerCase())
    return match || 'All'
  }, [rawTag, tags])
  const selectedStacks = React.useMemo(() => {
    const raw = searchParams.get(STACK_PARAM)
    if (!raw) return []
    const available = new Set(toLower(stacks))
    return raw
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
      .filter((item) => available.has(item.toLowerCase()))
  }, [searchParams, stacks])
  const query = searchParams.get(QUERY_PARAM) || ''
  const [optimisticQuery, setOptimisticQuery] = React.useOptimistic(query)

  const updateParams = React.useCallback(
    (updates: { tag?: string; stack?: string[]; q?: string }) => {
      const params = new URLSearchParams(searchParams.toString())

      if (updates.tag !== undefined) {
        if (!updates.tag || updates.tag === 'All') {
          params.delete(TAG_PARAM)
        } else {
          params.set(TAG_PARAM, updates.tag)
        }
      }

      if (updates.stack !== undefined) {
        if (updates.stack.length === 0) {
          params.delete(STACK_PARAM)
        } else {
          params.set(STACK_PARAM, updates.stack.join(','))
        }
      }

      if (updates.q !== undefined) {
        if (!updates.q.trim()) {
          params.delete(QUERY_PARAM)
        } else {
          params.set(QUERY_PARAM, updates.q)
        }
      }

      const queryString = params.toString()
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false
      })
    },
    [pathname, router, searchParams]
  )

  const filteredPosts = React.useMemo(() => {
    const normalizedTag = selectedTag.toLowerCase()
    const normalizedStacks = toLower(selectedStacks)
    const normalizedQuery = query.trim().toLowerCase()

    return posts.filter((post) => {
      const postTags = toLower(post.tags)
      const postStacks = toLower(post.stack)

      if (normalizedTag !== 'all' && !postTags.includes(normalizedTag)) {
        return false
      }

      if (
        normalizedStacks.length > 0 &&
        !postStacks.some((stackItem) => normalizedStacks.includes(stackItem))
      ) {
        return false
      }

      if (
        normalizedQuery &&
        !post.title.toLowerCase().includes(normalizedQuery)
      ) {
        return false
      }

      return true
    })
  }, [posts, query, selectedStacks, selectedTag])

  const stackOptions = React.useMemo(
    () =>
      stacks.map((stack) => ({
        label: stack,
        value: stack
      })),
    [stacks]
  )

  return (
    <section className='site-copy flex flex-col gap-10 pt-8 pb-16'>
      <div className='border-border bg-card ring-border flex flex-col gap-6 rounded-2xl border p-6 shadow-lg ring-1'>
        <div>
          <p className='text-eyebrow text-muted-foreground tracking-wider uppercase'>
            Browse posts
          </p>
          <h1 className='mt-2'>Writing on design and engineering</h1>
          <p className='text-muted-foreground mt-3'>
            Filter by focus area, stack, or search the title to find what you
            need fast.
          </p>
        </div>

        <div className='grid gap-4 md:grid-cols-[180px_minmax(0,1fr)_minmax(0,1fr)]'>
          <div className='flex flex-col gap-2'>
            <label
              htmlFor='post-tag'
              className='text-eyebrow text-muted-foreground font-semibold tracking-wider uppercase'
            >
              Tag
            </label>
            <Select
              value={selectedTag}
              onValueChange={(value) => updateParams({ tag: value })}
            >
              <SelectTrigger id='post-tag' className='bg-card'>
                <SelectValue placeholder='All' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='All'>All</SelectItem>
                {tags.map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='flex flex-col gap-2'>
            <p
              id='post-stack-label'
              className='text-eyebrow text-muted-foreground font-semibold tracking-wider uppercase'
            >
              Stack
            </p>
            <MultiSelect
              aria-labelledby='post-stack-label'
              options={stackOptions}
              placeholder='All stacks'
              defaultValue={selectedStacks}
              onValueChange={(value) => updateParams({ stack: value })}
              searchable
              className='bg-card'
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label
              htmlFor='post-search'
              className='text-eyebrow text-muted-foreground font-semibold tracking-wider uppercase'
            >
              Search
            </label>
            <Input
              id='post-search'
              value={optimisticQuery}
              onChange={(event) => {
                const value = event.target.value
                React.startTransition(() => {
                  setOptimisticQuery(value)
                  updateParams({ q: value })
                })
              }}
              placeholder='Search by title...'
              className='bg-card'
            />
          </div>
        </div>
      </div>

      <div className='flex items-center justify-between'>
        <p className='text-meta text-muted-foreground'>
          {filteredPosts.length} post
          {filteredPosts.length === 1 ? '' : 's'} found
        </p>
        {(selectedTag !== 'All' || selectedStacks.length > 0 || query) && (
          <button
            type='button'
            onClick={() => updateParams({ tag: 'All', stack: [], q: '' })}
            className='text-eyebrow text-muted-foreground hover:text-foreground tracking-wider uppercase transition'
          >
            Clear filters
          </button>
        )}
      </div>

      <div className='masonry-grid columns-1 gap-6 md:columns-2 xl:columns-3'>
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            className='masonry-item mb-6 break-inside-avoid'
          >
            <Link
              href={`/posts/${post.slug}`}
              className={cn(
                'group border-border bg-card hover:border-border ring-border block overflow-hidden rounded-2xl border shadow-lg ring-1 transition hover:shadow-xl'
              )}
            >
              <div className='relative aspect-[16/10] overflow-hidden'>
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  sizes='(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw'
                  className='object-cover transition duration-500 group-hover:scale-105'
                />
              </div>

              <div className='flex flex-col gap-3 p-5'>
                <div className='text-meta text-muted-foreground flex items-center justify-between'>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </div>
                <h2 className='card-title group-hover:underline'>
                  {post.title}
                </h2>
                <p className='text-meta text-muted-foreground line-clamp-3'>
                  {post.excerpt}
                </p>
                <div className='flex flex-wrap gap-2 pt-2'>
                  {post.tags.map((tag) => (
                    <Badge key={`${post.slug}-${tag}`} variant='secondary'>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className='border-border bg-card text-muted-foreground ring-border text-meta rounded-2xl border border-dashed p-12 text-center shadow-lg ring-1'>
          No posts match these filters yet.
        </div>
      )}
    </section>
  )
}
