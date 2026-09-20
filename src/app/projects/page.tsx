import type { Metadata } from 'next'

import ProjectTile from '@/components/projects/project-tile'
import JsonLd from '@/components/json-ld'
import { getAllProjects } from '@/lib/projects'
import { getSiteUrl, resolveUrl } from '@/lib/seo'
import {
  buildBreadcrumbNode,
  buildItemListNode,
  buildJsonLdGraph,
  buildSiteNodes,
  buildWebPageNode,
  getBreadcrumbId,
  getItemListId,
  getWebSiteId
} from '@/lib/structured-data'

const description =
  'A selection of projects I’ve worked on, covering the problems they address, my contributions, and what I learned along the way.'

export const metadata: Metadata = {
  title: 'Projects | Pieter du Toit',
  description
}

export default function ProjectsPage() {
  const projects = getAllProjects()
  const siteUrl = getSiteUrl()
  const pageUrl = resolveUrl('/projects')
  const jsonLd = buildJsonLdGraph([
    ...buildSiteNodes(siteUrl),
    buildWebPageNode({
      url: pageUrl,
      name: 'Projects',
      description,
      type: 'CollectionPage',
      websiteId: getWebSiteId(siteUrl),
      mainEntityId: getItemListId(pageUrl),
      breadcrumbId: getBreadcrumbId(pageUrl)
    }),
    buildItemListNode({
      pageUrl,
      items: projects.map((project) => ({
        name: project.title,
        url: resolveUrl(`/projects/${project.slug}`)
      }))
    }),
    buildBreadcrumbNode({
      pageUrl,
      items: [
        { label: 'Home', href: '/' },
        { label: 'Projects', href: '/projects' }
      ]
    })
  ])

  return (
    <div className='site-copy'>
      <JsonLd data={jsonLd} />
      <header className='flex max-w-3xl flex-col gap-4'>
        <h1>Projects</h1>
        <p className='text-lead text-muted-foreground'>{description}</p>
      </header>
      <div className='mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
        {projects.map((project) => (
          <ProjectTile key={project.slug} project={project} />
        ))}
      </div>
    </div>
  )
}
