'use client'

import { useSelectedLayoutSegment } from 'next/navigation'

import Breadcrumbs from '@/components/breadcrumbs'

type ProjectBreadcrumbsProps = {
  projects: { slug: string; title: string }[]
}

export default function ProjectBreadcrumbs({
  projects
}: ProjectBreadcrumbsProps) {
  const segment = useSelectedLayoutSegment()
  const project = projects.find(({ slug }) => slug === segment)
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' }
  ]

  if (project) {
    items.push({ label: project.title, href: `/projects/${project.slug}` })
  }

  return <Breadcrumbs items={items} />
}
