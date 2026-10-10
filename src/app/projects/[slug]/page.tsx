import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { Badge } from '@/components/ui/badge'
import JsonLd from '@/components/json-ld'
import RecentProjects from '@/components/projects/recent-projects'
import { ProjectLink } from '@/components/projects/project-link'
import { getAllProjects, getProjectBySlug } from '@/lib/projects'
import { getSiteUrl, resolveUrl } from '@/lib/seo'
import {
  buildBreadcrumbNode,
  buildJsonLdGraph,
  buildProjectArticleNodes,
  buildSiteNodes,
  buildWebPageNode,
  getArticleId,
  getBreadcrumbId,
  getPersonId,
  getWebSiteId
} from '@/lib/structured-data'

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
  const siteUrl = getSiteUrl()
  const pageUrl = resolveUrl(`/projects/${project.slug}`)
  const websiteId = getWebSiteId(siteUrl)
  const repositoryUrls = project.repositoryUrls ?? []
  const jsonLd = buildJsonLdGraph([
    ...buildSiteNodes(siteUrl),
    buildWebPageNode({
      url: pageUrl,
      name: project.title,
      description: project.excerpt,
      websiteId,
      mainEntityId: getArticleId(pageUrl),
      breadcrumbId: getBreadcrumbId(pageUrl)
    }),
    ...buildProjectArticleNodes({
      project,
      pageUrl,
      authorId: getPersonId(siteUrl),
      websiteId
    }),
    buildBreadcrumbNode({
      pageUrl,
      items: [
        { label: 'Home', href: '/' },
        { label: 'Projects', href: '/projects' },
        { label: project.title, href: `/projects/${project.slug}` }
      ]
    })
  ])

  return (
    <div className='flex min-w-0 flex-col gap-16'>
      <article className='article-copy w-full max-w-3xl'>
        <JsonLd data={jsonLd} />
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
                alt={project.thumbnailAlt ?? project.title}
                fill
                loading='eager'
                sizes='(max-width: 768px) 100vw, 768px'
                className='object-cover'
              />
            </div>
          ) : null}
        </header>
        <div className='prose prose-article dark:prose-invert mt-10 max-w-none'>
          <Project components={{ a: ProjectLink }} />
          {project.websiteUrl ? (
            <p>
              <ProjectLink href={project.websiteUrl}>
                Visit {project.title}
              </ProjectLink>
            </p>
          ) : null}
          {repositoryUrls.map((url, index) => (
            <p key={url}>
              <ProjectLink href={url}>
                View source code
                {repositoryUrls.length > 1 ? ` (${index + 1})` : ''}
              </ProjectLink>
            </p>
          ))}
        </div>
      </article>
      <RecentProjects excludeSlug={project.slug} />
    </div>
  )
}
