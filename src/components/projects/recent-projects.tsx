import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import ProjectCarousel from '@/components/projects/project-carousel'
import ProjectTile from '@/components/projects/project-tile'
import { Button } from '@/components/ui/button'
import { getRecentProjects } from '@/lib/projects'

export default function RecentProjects({
  excludeSlug
}: {
  excludeSlug?: string
}) {
  const projects = getRecentProjects(5, excludeSlug)

  if (projects.length === 0) return null

  return (
    <section className='site-copy min-w-0 lg:col-span-3'>
      <ProjectCarousel>
        {projects.map((project) => (
          <ProjectTile key={project.slug} project={project} headingLevel='h3' />
        ))}
        <Button
          key='all-projects'
          asChild
          variant='muted'
          className='h-full min-h-32 w-full rounded-2xl'
        >
          <Link href='/projects'>
            View all projects
            <ArrowRight aria-hidden='true' data-icon='inline-end' />
          </Link>
        </Button>
      </ProjectCarousel>
    </section>
  )
}
