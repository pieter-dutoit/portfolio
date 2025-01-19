import { ArrowLeft, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import RichText from '@/components/rich-text'
import TagList from '@/components/tag-list'
import { getProjectById, getProjects } from '@/db/queries/project'
import DateRange from '@/components/date-range'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const projects = await getProjects()

  return projects.map(({ id }) => ({
    id: '' + id
  }))
}

export default async function BlogPost({ params }: Props) {
  const { id } = await params
  const project = await getProjectById(id)

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

      {repo_url && (
        <>
          <div className='mt-6 flex flex-wrap items-center gap-4'>
            <a
              href={repo_url}
              target='_blank'
              className='flex w-fit items-center gap-2 rounded-sm border-2 border-white px-4 py-1'
            >
              View on GitHub
            </a>
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

      <div className='mt-12'>
        {description && <RichText text={description} />}
      </div>

      <hr className='my-8' />
      <TagList tags={tags} />
    </section>
  )
}
