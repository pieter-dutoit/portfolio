import { getProjects } from '@/db/queries/project'
import MasonryList from './masonry-list'
import MasonryTile from './masonry-tile'

export default async function ProjectList() {
  const projects = await getProjects()

  return (
    <MasonryList sectionName='Blog posts'>
      {projects.map(({ id, title, tags, cover_image_url }) => {
        const blogType = tags.find(
          (tag) => tag.category_name === 'blog_type'
        )?.name

        return (
          <MasonryTile
            href={`/blog-posts/${id}`}
            key={id}
            type='project'
            title={title}
            tagName={blogType}
            image_url={cover_image_url}
          />
        )
      })}
    </MasonryList>
  )
}
