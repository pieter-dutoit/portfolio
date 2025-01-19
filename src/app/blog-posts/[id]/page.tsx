import RichText from '@/components/rich-text'
import TagList from '@/components/tag-list'
import { getBlogById } from '@/db/queries/blog'
import { formatDate } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ id: string }>
}

export default async function BlogPost({ params }: Props) {
  const { id } = await params
  const post = await getBlogById(id)

  if (!post) notFound()

  const { title, tags, content, published_at } = post

  const blogType = tags.find((tag) => tag.category_name === 'blog_type')?.name

  return (
    <section className='mt-4 lg:mt-8'>
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
      <h1 className='mt-4 text-3xl font-extrabold'>{title}</h1>

      <div className='my-1 text-sm font-semibold italic opacity-70'>
        {formatDate(published_at, 'full')}
      </div>

      {content && <RichText text={content} />}

      <hr className='my-8' />
      <TagList tags={tags} />
    </section>
  )
}
