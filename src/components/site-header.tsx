import { Button } from '@/components/ui/button'
import Link from 'next/link'

import { ModeToggle } from '@/components/dark-mode-toggle'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' }
  // { name: 'Posts', path: '/posts' }
]

export default function SiteHeader() {
  return (
    <header className='border-border bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur'>
      <div className='container mx-auto flex min-h-16 items-center justify-between px-6'>
        <nav aria-label='Primary' className='font-sans'>
          <ul className='flex items-center gap-2'>
            {navLinks.map(({ name, path }) => (
              <li key={path}>
                <Button
                  asChild
                  variant='ghost'
                  size='sm'
                  className='text-foreground hover:text-foreground h-auto px-3 py-2 text-sm leading-5 font-bold hover:bg-transparent hover:opacity-80'
                >
                  <Link href={path}>{name}</Link>
                </Button>
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
