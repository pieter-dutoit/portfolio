import { getBlogs } from '@/db/queries/blog'
import MasonryList from './masonry-list'
import MasonryTile from './masonry-tile'

export default async function BlogList() {
  const blogs = await getBlogs()

  return (
    <MasonryList sectionName='Blog posts'>
      {blogs.map(({ id, title, tags, cover_image_url, published_at }) => {
        const blogType = tags.find(
          (tag) => tag.category_name === 'blog_type'
        )?.name

        return (
          <MasonryTile
            href={`/blog-posts/${id}`}
            key={id}
            type='post'
            title={title}
            tagName={blogType}
            image_url={cover_image_url}
            date={published_at}
          />
        )
      })}
    </MasonryList>
  )
}
