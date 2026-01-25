import { jobs } from '@/data/resume'

import CompanyProfile from './company-profile'
import TagList from './tag-list'
import SectionHeading from './section-heading'
import DateRange from './date-range'

export default function WorkExperience() {
  return (
    <section className='mt-12 lg:mt-16'>
      <SectionHeading>Work Experience</SectionHeading>
      <ul className='relative py-8'>
        {/* Job Listings */}
        {jobs.map(
          ({ id, company_name, company_address, company_logo_url, tags, roles }) => (
            <li key={id} className='relative z-10'>
              {/* Company profile */}
              <CompanyProfile
                name={company_name}
                address={company_address}
                logo_url={company_logo_url}
              />

              {/* Tags */}
              <TagList tags={tags} />

              {/* Roles */}
              <ul className='relative mt-8 flex flex-col gap-8'>
                {/* Timeline */}
                <div className='absolute left-6 top-0 h-full w-0 shadow-[0_0_10px_2px_rgba(16,185,129,0.3)]' />
                {roles.map(({ id: roleId, title, description, start_date, end_date }) => (
                  <li key={roleId} className='relative pl-16'>
                    {/* Bullet */}
                    <div className='absolute left-5 top-4 size-2 rounded-full bg-foreground shadow-[0_0_12px_5px_rgba(16,185,129,0.4)]' />

                    {/* Role and years */}
                    <div className='flex flex-col items-start'>
                      <h3 className='text-lg font-bold text-foreground'>{title}</h3>
                      <DateRange from={start_date} to={end_date} />
                    </div>

                    {/* Role Description */}
                    <div className='ml-4'>
                      <p className='text-sm'>{description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          )
        )}
      </ul>
    </section>
  )
}
