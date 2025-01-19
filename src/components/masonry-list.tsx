import React from 'react'

interface Props {
  sectionName: string
  children: React.ReactNode
}

export default function MasonryList({ sectionName, children }: Props) {
  return (
    <section className='my-12 lg:my-24'>
      <h2 className='sr-only'>View {sectionName}</h2>
      <ul className='columns-1 gap-6 md:columns-2 lg:columns-4'>{children}</ul>
    </section>
  )
}
