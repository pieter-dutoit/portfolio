import Link from 'next/link'

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
    name: 'Blog Posts',
    path: '/blog-posts'
  }
]

export default function Navbar() {
  return (
    <nav className='w-full bg-gray-950'>
      <ul className='container mx-auto flex min-h-16 w-full flex-row items-center justify-center gap-2 overflow-x-scroll px-4 md:justify-start'>
        {pageLinks.map(({ path, name }) => (
          <li key={path}>
            <Link
              href={path}
              className='whitespace-nowrap px-4 py-2 text-lg font-semibold underline-offset-2 hover:text-slate-400 hover:underline'
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
