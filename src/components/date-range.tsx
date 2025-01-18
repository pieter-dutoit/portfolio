import { formatDate } from '@/lib/utils'

interface Props {
  from?: string
  to?: string
}

export default function DateRange({ from, to }: Props) {
  if (!from) return <></>
  return (
    <div className='overflow-hidden text-sm font-semibold italic'>
      {formatDate(from)} - {to ? formatDate(to) : 'Present'}
    </div>
  )
}
