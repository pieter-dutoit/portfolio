import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import type { ProjectMeta } from '@/lib/projects'

export default function ProjectTile({ project }: { project: ProjectMeta }) {
  const remainingTechnologies = project.stack.length - 2

  return (
    <article className='min-w-0'>
      <Card asChild className='flex h-full items-start justify-start gap-3 p-3'>
        <Link href={`/projects/${project.slug}`}>
          {project.thumbnail ? (
            <div className='relative size-20 shrink-0 overflow-hidden rounded-lg'>
              <Image
                src={project.thumbnail}
                alt=''
                fill
                sizes='80px'
                className='object-cover'
              />
            </div>
          ) : null}
          <div className='flex min-w-0 flex-1 flex-col gap-2 wrap-anywhere'>
            <CardHeader className='gap-2 p-0'>
              <CardTitle asChild size='sm'>
                <h2>{project.title}</h2>
              </CardTitle>
              <CardDescription className='line-clamp-2'>
                {project.excerpt}
              </CardDescription>
            </CardHeader>
            {project.stack.length > 0 ? (
              <CardFooter className='flex-wrap gap-1 p-0'>
                {project.stack.slice(0, 2).map((item) => (
                  <Badge
                    key={item}
                    variant='secondary'
                    className='max-w-full min-w-0'
                  >
                    {item}
                  </Badge>
                ))}
                {remainingTechnologies > 0 ? (
                  <Badge variant='secondary'>
                    <span aria-hidden='true'>+{remainingTechnologies}</span>
                    <span className='sr-only'>
                      {remainingTechnologies} more{' '}
                      {remainingTechnologies === 1
                        ? 'technology'
                        : 'technologies'}
                    </span>
                  </Badge>
                ) : null}
              </CardFooter>
            ) : null}
          </div>
        </Link>
      </Card>
    </article>
  )
}
