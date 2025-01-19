import { formatDate } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

/* eslint-disable @next/next/no-img-element */
interface Props {
  title: string
  image_url?: string
  image_alt?: string
  href: string
  tagName?: string
  type: string
  date?: string
}

export default function MasonryTile({
  type,
  title,
  image_url,
  image_alt,
  href,
  tagName,
  date
}: Props) {
  return (
    <li className='mx-auto mb-6 max-w-80 break-inside-avoid rounded-sm border-2 border-emerald-200 transition-transform hover:scale-110'>
      <Link href={href}>
        <img
          src={image_url}
          alt={image_alt || `${title} cover image`}
          className='w-full'
        />
        <div className='relative p-2 pt-4'>
          {tagName && (
            <div className='absolute bottom-full left-4 translate-y-2 rounded-sm border-[1px] border-white bg-emerald-500 px-2 py-1 text-sm font-extrabold'>
              {tagName}
            </div>
          )}

          <h3 className='mt-2 text-lg font-bold leading-6 lg:text-xl lg:leading-5'>
            {title}
          </h3>

          {date && (
            <div className='mt-2 text-sm font-extrabold text-emerald-600'>
              {formatDate(date, 'full')}
            </div>
          )}
          <div className='mt-8 flex w-full cursor-pointer items-center justify-center gap-2 hover:text-emerald-400 hover:underline'>
            <span>View {type}</span>
            <ArrowRight />
          </div>
        </div>
      </Link>
    </li>
  )
}
