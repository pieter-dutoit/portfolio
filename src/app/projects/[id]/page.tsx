import { ArrowLeft, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import TagList from '@/components/tag-list'
import DateRange from '@/components/date-range'
import { projects } from '@/data/placeholder'

interface Props {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return projects.map(({ id }) => ({
    id
  }))
}

export default async function ProjectDetail({ params }: Props) {
  const { id } = await params
  const project = projects.find((entry) => entry.id === id)

  if (!project) notFound()

  const { title, tags, description, start_date, end_date, repo_url, demo_url } =
    project

  const projectType = tags.find(
    (tag) => tag.category_name === 'project_type'
  )?.name

  return (
    <section className='py-4 lg:py-8'>
      <Link
        href='/projects'
        className='flex items-center text-slate-300 underline-offset-2 hover:underline'
      >
        <ArrowLeft />
        View all projects
      </Link>

      {projectType && (
        <div className='mt-4 text-xl font-bold text-yellow-100'>
          {projectType}
        </div>
      )}
      <h1 className='mt-4 text-4xl font-extrabold lg:text-6xl'>{title}</h1>
      <DateRange from={start_date} to={end_date} />

      {(repo_url || demo_url) && (
        <>
          <div className='mt-6 flex flex-wrap items-center gap-4'>
            {repo_url && (
              <a
                href={repo_url}
                target='_blank'
                className='flex w-fit items-center gap-2 rounded-sm border-2 border-white px-4 py-1'
              >
                View on GitHub
              </a>
            )}
            {demo_url && (
              <a
                href={demo_url}
                target='_blank'
                className='flex w-fit items-center gap-2 rounded-sm border-2 border-white px-4 py-1'
              >
                View live page
              </a>
            )}
            <ExternalLink />
          </div>
          <div className='mt-1 text-sm font-light italic'>
            *Email me to request access to private repos
          </div>
        </>
      )}

      {description && (
        <div className='mt-12 text-base font-light'>{description}</div>
      )}

      <hr className='my-8' />
      <TagList tags={tags} />
    </section>
  )
}
