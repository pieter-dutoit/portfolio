import { formatDate } from '@/lib/utils'

interface Props {
  from?: string
  to?: string
}

export default function DateRange({ from, to }: Props) {
  if (!from) return <></>
  return (
    <p className='text-meta overflow-hidden italic'>
      <time dateTime={from}>{formatDate(from)}</time>
      {' - '}
      {to ? <time dateTime={to}>{formatDate(to)}</time> : 'Present'}
    </p>
  )
}
