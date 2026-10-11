import AboutMe from '@/components/about-me'
import Education from '@/components/education'
import JsonLd from '@/components/json-ld'
import ProfileCard from '@/components/profile-card'
import RecentProjects from '@/components/projects/recent-projects'
import RecentPosts from '@/components/posts/recent-posts'
import WorkExperience from '@/components/work-experience'
import { profile } from '@/data/resume'
import { getSiteUrl } from '@/lib/seo'
import {
  buildJsonLdGraph,
  buildProfilePageNode,
  buildProfileSiteNodes,
  getPersonId,
  getWebSiteId
} from '@/lib/structured-data'

export default function Page() {
  const siteUrl = getSiteUrl()
  const personId = getPersonId(siteUrl)
  const webSiteId = getWebSiteId(siteUrl)

  const jsonLd = buildJsonLdGraph([
    ...buildProfileSiteNodes(siteUrl),
    buildProfilePageNode({
      siteUrl,
      name: `Profile of ${profile.full_name}`,
      description: profile.title,
      personId,
      websiteId: webSiteId
    })
  ])

  return (
    <div className='site-copy grid grid-cols-1 gap-16 py-16 lg:grid-cols-3 lg:grid-rows-[auto_1fr] lg:gap-y-12'>
      <JsonLd data={jsonLd} />
      <header className='text-center lg:col-span-2 lg:col-start-2 lg:text-left'>
        <h1 className='flex flex-col gap-3'>
          <span>{profile.full_name}</span>{' '}
          <span className='text-muted-foreground font-sans text-base leading-relaxed font-bold text-balance sm:text-lg'>
            {profile.title}
          </span>
        </h1>
      </header>

      <aside
        aria-label='Profile and contact details'
        className='col-span-1 lg:col-start-1 lg:row-span-2 lg:row-start-1'
      >
        <ProfileCard />
      </aside>

      <div className='col-span-1 lg:col-span-2 lg:col-start-2'>
        <AboutMe />
        <WorkExperience />
        <Education />
      </div>

      <RecentProjects />
      <RecentPosts />
    </div>
  )
}
