import AboutMe from '@/components/about-me'
import ProfileCard from '@/components/profile-card'
import WorkExperience from '@/components/ui/work-experience'
import { getProfile } from '@/db/queries/profile'

export default async function Page() {
  const profile = await getProfile()
  const { full_name, title } = profile

  return (
    <div className='grid grid-cols-1 gap-16 py-16 lg:grid-cols-3'>
      <aside className='col-span-1'>
        <ProfileCard />
      </aside>

      <div className='col-span-1 lg:col-span-2'>
        <h1 className='text-center text-5xl font-extrabold text-slate-400 lg:text-left lg:text-6xl'>
          {full_name} <br /> <span className='text-[0.6em]'>{title}</span>
        </h1>
        <AboutMe />
        <WorkExperience />
      </div>
    </div>
  )
}
