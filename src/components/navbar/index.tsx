import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'

const pageLinks = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Projects',
    path: '/projects'
  },
  {
    name: 'Blog',
    path: '/blog'
  },
  {
    name: 'Contact me',
    path: '#contact'
  }
]

export default function Navbar() {
  return (
    <nav className='sticky w-full px-4 shadow-sm shadow-slate-300'>
      <ul className='container mx-auto flex min-h-16 w-full flex-row items-center justify-center gap-2 md:justify-start'>
        {pageLinks.map(({ path, name }) => (
          <li key={path}>
            <Link href={path} className={buttonVariants({ variant: 'ghost' })}>
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
