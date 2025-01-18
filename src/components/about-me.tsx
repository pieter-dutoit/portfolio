import { getJobs } from '@/db/queries/job'
import { getProfile } from '@/db/queries/profile'
import { getSocialLinks } from '@/db/queries/social-link'

export default async function AboutMe() {
  const profile = await getProfile()
  const socials = await getSocialLinks()
  const jobs = await getJobs()

  console.log({ jobs })

  const { full_name, title, photo_url, about_me } = profile
  console.log({ socials })

  return (
    <section>
      <div className='container mx-auto px-4'>
        <h1 className='text-5xl'>
          <span className='sr-only'>Hi, I&apos;m </span>
          {full_name}
          <span className='sr-only'>, a {title}</span>
        </h1>
      </div>
    </section>
  )
}
