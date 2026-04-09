import Link from 'next/link'

import { ModeToggle } from '@/components/dark-mode-toggle'

const navLinks = [
  { name: 'Home', path: '/' }
  // { name: 'Posts', path: '/posts' }
]

export default function SiteHeader() {
  return (
    <header className='border-border bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur'>
      <div className='container mx-auto flex min-h-16 items-center justify-between px-6'>
        <nav aria-label='Primary'>
          <ul className='flex items-center gap-2'>
            {navLinks.map(({ name, path }) => (
              <li key={path}>
                <Link
                  href={path}
                  className='text-muted-foreground hover:text-foreground focus-visible:ring-ring rounded-md px-3 py-2 text-sm font-semibold transition focus-visible:ring-2 focus-visible:outline-none'
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className='flex items-center gap-2'>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
