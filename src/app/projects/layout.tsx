import type { ReactNode } from 'react'

import ProjectBreadcrumbs from '@/components/projects/project-breadcrumbs'
import { getAllProjects } from '@/lib/projects'

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  const projects = getAllProjects().map(({ slug, title }) => ({ slug, title }))

  return (
    <div className='flex flex-col gap-6 py-12'>
      <ProjectBreadcrumbs projects={projects} />
      {children}
    </div>
  )
}
