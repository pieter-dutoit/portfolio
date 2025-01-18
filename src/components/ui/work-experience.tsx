/* eslint-disable @next/next/no-img-element */
import { getJobs } from '@/db/queries/job'
import { formatDate } from '@/lib/utils'

import RichText from '../rich-text'

export default async function WorkExperience() {
  const jobs = await getJobs()

  return (
    <section className='py-20'>
      <h2 className='text-4xl font-light text-slate-400 lg:text-5xl'>
        Professional Experience
      </h2>
      <ul className='relative py-8 lg:mt-4'>
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
              <div className='flex items-center gap-4'>
                <img
                  src={company_logo_url}
                  alt={company_name + ' logo'}
                  height={48}
                  width={48}
                  className='size-12 overflow-hidden rounded-lg border-2 border-emerald-600'
                />
                <div>
                  <h3 className='text-xl'>{company_name}</h3>
                  <span className='text-sm'>{company_address}</span>
                </div>
              </div>

              {/* Tags */}
              <ul className='my-4 flex flex-row flex-wrap items-center gap-2'>
                {tags.map(({ id, name }, index) => (
                  <li
                    key={id + index}
                    className='rounded-xl bg-slate-600 px-3 py-1 text-sm font-semibold'
                  >
                    {name}
                  </li>
                ))}
              </ul>

              {/* Roles */}
              <ul className='relative mt-8 flex flex-col gap-8'>
                {/* Timeline */}
                <div className='absolute left-6 top-0 h-full w-0 shadow-[0_0_10px_2px_rgba(16,185,129,0.3)]' />
                {roles.map(
                  ({ id, title, description, start_date, end_date }) => (
                    <li key={id} className='relative pl-16'>
                      {/* Bullet */}
                      <div className='absolute left-5 top-4 size-2 rounded-full bg-white shadow-[0_0_12px_5px_rgba(16,185,129,0.4)]' />

                      {/* Role and years */}
                      <div className='flex flex-col items-start'>
                        <h3 className='text-lg font-bold text-slate-300'>
                          {title}
                        </h3>
                        <div className='overflow-hidden text-sm font-semibold'>
                          {formatDate(start_date)} - {formatDate(end_date)}
                        </div>
                      </div>

                      {/* Role Description */}
                      <div className='ml-4'>
                        {description && (
                          <RichText
                            text={description}
                            textClassName='text-sm'
                          />
                        )}
                      </div>
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
