import AboutMe from '@/components/about-me'
import Education from '@/components/education'
import ProfileCard from '@/components/profile-card'
import WorkExperience from '@/components/work-experience'

export default async function Page() {
  return (
    <div className='grid grid-cols-1 gap-16 py-16 lg:grid-cols-3'>
      <aside className='col-span-1'>
        <ProfileCard />
      </aside>

      <div className='col-span-1 lg:col-span-2'>
        <AboutMe />
        <Education />
        <WorkExperience />
      </div>
    </div>
  )
}
