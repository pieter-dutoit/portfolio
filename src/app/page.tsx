import AboutMe from '@/components/about-me'
import Education from '@/components/education'
import JsonLd from '@/components/json-ld'
import ProfileCard from '@/components/profile-card'
import WorkExperience from '@/components/work-experience'
import { profile, socialLinks } from '@/data/resume'
import { getSiteUrl } from '@/lib/seo'
import {
  buildJsonLdGraph,
  buildPersonNode,
  buildProfilePageNode,
  buildWebSiteNode,
  getPersonId,
  getWebSiteId
} from '@/lib/structured-data'

export default function Page() {
  const siteUrl = getSiteUrl()
  const personId = getPersonId(siteUrl)
  const webSiteId = getWebSiteId(siteUrl)

  const jsonLd = buildJsonLdGraph([
    buildWebSiteNode({
      siteUrl,
      name: `${profile.full_name} Portfolio`
    }),
    buildPersonNode({ profile, socialLinks, siteUrl }),
    buildProfilePageNode({
      siteUrl,
      name: `Profile of ${profile.full_name}`,
      description: profile.title,
      personId,
      websiteId: webSiteId
    })
  ])

  return (
    <div className='site-copy grid grid-cols-1 gap-16 py-16 lg:grid-cols-3'>
      <JsonLd data={jsonLd} />
      <aside aria-label='Profile and contact details' className='col-span-1'>
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
