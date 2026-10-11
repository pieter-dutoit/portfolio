import type { Metadata } from 'next'

import CollectionIndex from '@/components/collection-index'
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
  title: 'Projects',
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
    <>
      <JsonLd data={jsonLd} />
      <CollectionIndex title='Projects' description={description}>
        {projects.map((project) => (
          <ProjectTile key={project.slug} project={project} />
        ))}
      </CollectionIndex>
    </>
  )
}
