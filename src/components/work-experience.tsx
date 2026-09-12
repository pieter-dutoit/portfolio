import { jobs } from '@/data/resume'

import CompanyProfile from './company-profile'
import TagList from './tag-list'
import DateRange from './date-range'

export default function WorkExperience() {
  return (
    <section className='mt-12 lg:mt-16'>
      <h2>Work Experience</h2>
      <ul className='relative py-8'>
        {/* Job Listings */}
        {jobs.map(
          ({
            id,
            company_name,
            company_address,
            company_logo_url,
            tags,
            roles
          }) => (
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
              <ul className='relative mt-8 flex flex-col gap-8 before:absolute before:top-0 before:left-6 before:h-full before:w-0 before:shadow-[0_0_6px_1px_rgba(255,255,255,0.1)] before:content-[""]'>
                {roles.map(
                  ({
                    id: roleId,
                    title,
                    description,
                    start_date,
                    end_date
                  }) => (
                    <li key={roleId} className='relative pl-16'>
                      {/* Bullet */}
                      <div
                        aria-hidden='true'
                        className='bg-foreground absolute top-4 left-5 size-2 rounded-full shadow-[0_0_8px_2px_rgba(255,255,255,0.2)]'
                      />

                      {/* Role and years */}
                      <div className='flex flex-col items-start'>
                        <h4>{title}</h4>
                        <DateRange from={start_date} to={end_date} />
                      </div>

                      {/* Role Description */}
                      {description ? (
                        <p className='ml-4'>{description}</p>
                      ) : null}
                    </li>
                  )
                )}
              </ul>
            </li>
          )
        )}
      </ul>
    </section>
  )
}
