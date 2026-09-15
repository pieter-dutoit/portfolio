import { Suspense } from 'react'
import { Dot, ExternalLink } from 'lucide-react'

import { qualifications } from '@/data/resume'

import CompanyProfile from './company-profile'
import TagList from './tag-list'
import DateRange from './date-range'
import AwardPreview from './award-preview'

export default function Education() {
  return (
    <section className='mt-12 lg:mt-16'>
      <h2>Education</h2>

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
              <h4 className='mt-4'>{degree}</h4>
              {major ? <p>{major}</p> : null}
              <DateRange from={start_date} to={end_date} />

              <TagList tags={tags} />

              {achievements.length > 0 ? (
                <>
                  <p
                    id={`achievements-${id}`}
                    className='text-muted-foreground mt-6'
                  >
                    Achievements
                  </p>
                  <ul aria-labelledby={`achievements-${id}`} className='mt-2'>
                    {achievements.map(
                      ({
                        id: achievementId,
                        slug,
                        name,
                        description,
                        verification_url,
                        pdf_url
                      }) => (
                        <li key={achievementId} className='flex'>
                          <Dot aria-hidden='true' className='shrink-0' />
                          <div>
                            <p>
                              <strong>{name}</strong>
                            </p>
                            <div className='mt-1'>
                              {description ? <p>{description}</p> : null}
                              {verification_url ? (
                                <a
                                  href={verification_url}
                                  target='_blank'
                                  rel='noreferrer'
                                  className='flex items-center underline underline-offset-4'
                                >
                                  Verify on Credly{' '}
                                  <ExternalLink
                                    aria-hidden='true'
                                    className='ml-2'
                                    size={16}
                                  />
                                </a>
                              ) : null}
                              {pdf_url ? (
                                <Suspense fallback={null}>
                                  <AwardPreview
                                    slug={slug}
                                    src={pdf_url}
                                    title={name}
                                  />
                                </Suspense>
                              ) : null}
                            </div>
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                </>
              ) : null}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
