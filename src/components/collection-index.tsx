import type { ReactNode } from 'react'

type CollectionIndexProps = {
  title: string
  description: string
  children: ReactNode
}

export default function CollectionIndex({
  title,
  description,
  children
}: CollectionIndexProps) {
  return (
    <div className='site-copy flex flex-col gap-6'>
      <header className='flex max-w-3xl flex-col gap-4'>
        <h1>{title}</h1>
        <p className='text-lead text-muted-foreground'>{description}</p>
      </header>
      <div className='grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
        {children}
      </div>
    </div>
  )
}
