import { projects } from '@/data/placeholder'
import MasonryList from './masonry-list'
import MasonryTile from './masonry-tile'

export default function ProjectList() {
  return (
    <MasonryList sectionName='Projects'>
      {projects.map(({ id, title, tags, cover_image_url }) => {
        const projectType = tags.find(
          (tag) => tag.category_name === 'project_type'
        )?.name

        return (
          <MasonryTile
            href={`/projects/${id}`}
            key={id}
            type='project'
            title={title}
            tagName={projectType}
            image_url={cover_image_url}
          />
        )
      })}
    </MasonryList>
  )
}
