import ContentTile from '@/components/content-tile'
import type { ProjectMeta } from '@/lib/projects'

export default function ProjectTile({
  project,
  headingLevel = 'h2'
}: {
  project: ProjectMeta
  headingLevel?: 'h2' | 'h3'
}) {
  return (
    <ContentTile
      href={`/projects/${project.slug}`}
      title={project.title}
      excerpt={project.excerpt}
      thumbnail={project.thumbnail}
      badges={project.stack}
      badgeLabels={{ singular: 'technology', plural: 'technologies' }}
      headingLevel={headingLevel}
    />
  )
}
