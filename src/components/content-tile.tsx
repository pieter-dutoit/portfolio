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
type ContentTileProps = {
  href: string
  title: string
  excerpt: string
  thumbnail?: string
  badges: string[]
  badgeLabels: { singular: string; plural: string }
  headingLevel?: 'h2' | 'h3'
}

export default function ContentTile({
  href,
  title,
  excerpt,
  thumbnail,
  badges,
  badgeLabels,
  headingLevel: Heading = 'h2'
}: ContentTileProps) {
  const remainingBadges = badges.length - 2

  return (
    <article className='h-full min-w-0'>
      <Card asChild className='flex h-full items-start justify-start gap-3 p-3'>
        <Link href={href}>
          {thumbnail ? (
            <div className='relative size-20 shrink-0 overflow-hidden rounded-lg'>
              <Image
                src={thumbnail}
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
                <Heading>{title}</Heading>
              </CardTitle>
              <CardDescription className='line-clamp-2'>
                {excerpt}
              </CardDescription>
            </CardHeader>
            {badges.length > 0 ? (
              <CardFooter className='flex-wrap gap-1 p-0'>
                {badges.slice(0, 2).map((item) => (
                  <Badge
                    key={item}
                    variant='secondary'
                    className='max-w-full min-w-0'
                  >
                    {item}
                  </Badge>
                ))}
                {remainingBadges > 0 ? (
                  <Badge variant='secondary'>
                    <span aria-hidden='true'>+{remainingBadges}</span>
                    <span className='sr-only'>
                      {remainingBadges} more{' '}
                      {remainingBadges === 1
                        ? badgeLabels.singular
                        : badgeLabels.plural}
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
