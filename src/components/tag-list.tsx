import { Tag } from '@/db/queries/job'

interface Props {
  tags: Tag[]
}

export default function TagList({ tags }: Props) {
  return (
    <ul className='my-4 flex flex-row flex-wrap items-center gap-2'>
      {tags.map(({ id, name }, index) => (
        <li
          key={id + index}
          className='rounded-xl bg-slate-600 px-3 py-1 text-sm font-semibold'
        >
          {name}
        </li>
      ))}
    </ul>
  )
}
