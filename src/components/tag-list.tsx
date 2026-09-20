import { Badge } from '@/components/ui/badge'

interface Tag {
  id: number | string
  name: string
}

interface Props {
  tags: Tag[]
}

export default function TagList({ tags }: Props) {
  return (
    <ul className='my-4 flex flex-row flex-wrap items-center gap-2'>
      {tags.map(({ id, name }, index) => (
        <li key={id + '-' + index}>
          <Badge variant='secondary'>{name}</Badge>
        </li>
      ))}
    </ul>
  )
}
