import { Dot, ExternalLink } from 'lucide-react'

import { qualifications } from '@/data/resume'

import SectionHeading from './section-heading'
import CompanyProfile from './company-profile'
import TagList from './tag-list'
import DateRange from './date-range'

export default function Education() {
  return (
    <section className='mt-12 lg:mt-16'>
      <SectionHeading>Education</SectionHeading>

      <ul className='relative py-8'>
        {qualifications.map((qualification) => {
          const {
            id,
            institution_name,
            institution_address,
            institution_logo_url,
            name,
            start_date,
            end_date,
            tags,
            achievements
          } = qualification

          const [degree, major] = name.split(';').map((value) => value.trim())

          return (
            <li key={id}>
              <CompanyProfile
                name={institution_name}
                address={institution_address}
                logo_url={institution_logo_url}
              />
              <h4 className='mt-4 text-xl font-bold'>{degree}</h4>
              <p className='text-lg font-light'>{major}</p>
              <DateRange from={start_date} to={end_date} />

              <TagList tags={tags} />

              <h5 className='font-sem mt-6 text-lg text-muted-foreground underline-offset-2'>
                Achievements
              </h5>
              <ul className='mt-2'>
                {achievements.map(
                  ({ id: achievementId, name, description, verification_url }) => (
                    <li key={achievementId} className='flex'>
                      <Dot />
                      <div>
                        <h6 className='font-bold'>{name}</h6>
                        <div className='mt-1'>
                          <p>{description}</p>
                          {verification_url ? (
                            <a
                              href={verification_url}
                              target='_blank'
                              rel='noreferrer'
                              className='flex items-center underline'
                            >
                              Verify on Credly{' '}
                              <ExternalLink className='ml-1' size={16} />
                            </a>
                          ) : null}
                        </div>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
