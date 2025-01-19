import { getProjects } from '@/db/queries/project'
import MasonryList from './masonry-list'
import MasonryTile from './masonry-tile'

export default async function ProjectList() {
  const projects = await getProjects()

  return (
    <MasonryList sectionName='Blog posts'>
      {projects.map(({ id, title, tags, cover_image_url }) => {
        const projectType = tags.find(
          (tag) => tag.category_name === 'project_type'
        )?.name
        console.log({ tags })

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
