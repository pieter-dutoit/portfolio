/* eslint-disable @next/next/no-img-element */

import React from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  text: string
  textClassName?: string
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className={twMerge('mt-4 leading-[1.2em] lg:tracking-wide')}>
      {children}
    </p>
  )
}

function HeadingTwo({ children }: { children: React.ReactNode }) {
  return (
    <h2 className='-mb-3 mt-8 text-2xl font-extrabold text-emerald-400'>
      {children}
    </h2>
  )
}

function HeadingThree({ children }: { children: React.ReactNode }) {
  return (
    <h3 className='-mb-3 mt-8 text-xl font-extrabold text-purple-300'>
      {children}
    </h3>
  )
}

function Media({ path }: { path: string }) {
  const imageRegex = /^!\[(.+)\]\((.+)\)$/

  const match = path.match(imageRegex)
  if (!match) return null
  const [, label, src] = match

  return (
    <div className='my-8 w-full max-w-[30rem]'>
      <img
        src={src}
        alt={label}
        className='aspect-video bg-transparent object-contain object-left-bottom'
      />
      <div className='text-sm font-light italic text-gray-200'>
        Image: {label}
      </div>
    </div>
  )
}

export default function RichText({ text }: Props) {
  const sections = text.split('\\n\\n')

  return (
    <>
      {sections.map((section) => {
        if (section.startsWith('###'))
          return <HeadingThree key={section}>{section.slice(3)}</HeadingThree>

        if (section.startsWith('##'))
          return <HeadingTwo key={section}>{section.slice(2)}</HeadingTwo>

        if (section.startsWith('![')) {
          return <Media key={section} path={section} />
        }

        return <Paragraph key={section}>{section}</Paragraph>
      })}
    </>
  )
}
