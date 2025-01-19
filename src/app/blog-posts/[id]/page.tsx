import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import RichText from '@/components/rich-text'
import TagList from '@/components/tag-list'
import { getBlogById, getBlogs } from '@/db/queries/blog'
import { formatDate } from '@/lib/utils'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const blogs = await getBlogs()

  return blogs.map(({ id }) => ({
    id: '' + id
  }))
}

export default async function BlogPost({ params }: Props) {
  const { id } = await params
  const post = await getBlogById(id)

  if (!post) notFound()

  const { title, tags, content, published_at } = post

  const blogType = tags.find((tag) => tag.category_name === 'blog_type')?.name

  return (
    <section className='py-4 lg:py-8'>
      <Link
        href='/blog-posts'
        className='flex items-center text-slate-300 underline-offset-2 hover:underline'
      >
        <ArrowLeft />
        View all blog posts
      </Link>

      {blogType && (
        <div className='mt-8 text-xl font-bold text-emerald-300'>
          {blogType}
        </div>
      )}
      <h1 className='mt-4 text-4xl font-extrabold lg:text-6xl'>{title}</h1>

      <div className='my-1 text-sm font-semibold italic opacity-70'>
        {formatDate(published_at, 'full')}
      </div>

      {content && <RichText text={content} />}

      <hr className='my-8' />
      <TagList tags={tags} />
    </section>
  )
}
