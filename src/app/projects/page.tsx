import type { Metadata } from 'next'

import ProjectTile from '@/components/projects/project-tile'
import { getAllProjects } from '@/lib/projects'

const description =
  'A selection of projects I’ve worked on, covering the problems they address, my contributions, and what I learned along the way.'

export const metadata: Metadata = {
  title: 'Projects | Pieter du Toit',
  description
}

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <div className='site-copy'>
      <header className='flex max-w-3xl flex-col gap-4'>
        <h1>Projects</h1>
        <p className='text-lead text-muted-foreground'>{description}</p>
      </header>
      <div className='mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
        {projects.map((project) => (
          <ProjectTile key={project.slug} project={project} />
        ))}
      </div>
    </div>
  )
}
