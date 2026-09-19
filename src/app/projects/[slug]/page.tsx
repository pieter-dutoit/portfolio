import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { Badge } from '@/components/ui/badge'
import { getAllProjects, getProjectBySlug } from '@/lib/projects'

type ProjectPageProps = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return getAllProjects().map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  return {
    title: `${project.title} | Pieter du Toit`,
    description: project.excerpt
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const { default: Project } = await import(
    `@/content/projects/${project.fileName}`
  )

  return (
    <article className='article-copy w-full max-w-3xl'>
      <header className='flex flex-col gap-6'>
        <div className='flex flex-col gap-4'>
          <h1>{project.title}</h1>
          <p className='text-lead text-muted-foreground'>{project.excerpt}</p>
        </div>
        {project.stack.length > 0 ? (
          <div className='flex flex-wrap gap-2'>
            {project.stack.map((item) => (
              <Badge key={item} variant='secondary'>
                {item}
              </Badge>
            ))}
          </div>
        ) : null}
        {project.thumbnail ? (
          <div className='border-border relative aspect-video overflow-hidden rounded-2xl border'>
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              sizes='(max-width: 768px) 100vw, 768px'
              className='object-cover'
            />
          </div>
        ) : null}
      </header>
      <div className='prose prose-article dark:prose-invert mt-10 max-w-none'>
        <Project />
      </div>
    </article>
  )
}
