import React from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  text: string
  textClassName?: string
}

export default function RichText({ text, textClassName }: Props) {
  const sections = text.split('\\n\\n')
  return (
    <>
      {sections.map((par) => (
        <p
          className={twMerge(
            'mt-[1em] leading-[1.2em] lg:tracking-wide',
            textClassName
          )}
          key={par}
        >
          {par}
        </p>
      ))}
    </>
  )
}
