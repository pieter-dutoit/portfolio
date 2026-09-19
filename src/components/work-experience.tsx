import { jobs } from '@/data/resume'

import CompanyProfile from './company-profile'
import TagList from './tag-list'
import DateRange from './date-range'

export default function WorkExperience() {
  return (
    <section className='mt-12 lg:mt-16'>
      <h2>Work Experience</h2>
      <ul className='relative flex flex-col gap-12 py-8'>
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
              <ul className='relative mt-8 flex flex-col gap-8'>
                {roles.map(
                  ({
                    id: roleId,
                    title,
                    description,
                    achievements,
                    start_date,
                    end_date
                  }) => (
                    <li key={roleId} className='relative sm:pl-16'>
                      {/* Bullet */}
                      <div
                        aria-hidden='true'
                        className='bg-foreground absolute top-4 left-5 hidden size-2 rounded-full sm:block'
                      />

                      {/* Role and years */}
                      <div className='flex flex-col items-start'>
                        <h4>{title}</h4>
                        <DateRange from={start_date} to={end_date} />
                      </div>

                      {/* Role Description */}
                      {description ? (
                        <p className='mt-4'>{description}</p>
                      ) : null}

                      {achievements.length > 0 ? (
                        <ul className='mt-4 flex list-disc flex-col gap-3 pl-5'>
                          {achievements.map((achievement) => (
                            <li key={achievement}>{achievement}</li>
                          ))}
                        </ul>
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
