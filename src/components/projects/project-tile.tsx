import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { ProjectMeta } from '@/lib/projects'

export default function ProjectTile({ project }: { project: ProjectMeta }) {
  return (
    <article>
      <Button asChild variant='card' size='content' className='h-full'>
        <Link href={`/projects/${project.slug}`}>
          {project.thumbnail ? (
            <div className='relative aspect-[16/10] overflow-hidden'>
              <Image
                src={project.thumbnail}
                alt=''
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw'
                className='object-cover'
              />
            </div>
          ) : null}
          <div className='flex flex-col gap-4 p-6'>
            <h2 className='card-title group-hover:underline'>
              {project.title}
            </h2>
            <p className='text-meta text-muted-foreground'>{project.excerpt}</p>
            {project.stack.length > 0 ? (
              <div className='flex flex-wrap gap-2'>
                {project.stack.map((item) => (
                  <Badge key={item} variant='secondary'>
                    {item}
                  </Badge>
                ))}
              </div>
            ) : null}
            <span className='text-meta flex items-center gap-2 pt-2'>
              View project{' '}
              <ArrowUpRight aria-hidden='true' data-icon='inline-end' />
            </span>
          </div>
        </Link>
      </Button>
    </article>
  )
}
