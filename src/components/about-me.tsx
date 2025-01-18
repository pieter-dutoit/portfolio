import { getProfile } from '@/db/queries/profile'

import RichText from './rich-text'

export default async function AboutMe() {
  const profile = await getProfile()

  const { full_name, title, about_me } = profile

  return (
    <>
      <h1 className='text-center text-5xl font-extrabold text-slate-400 lg:text-left lg:text-6xl'>
        {full_name} <br />
        <span className='text-[0.5em]'>{title}</span>
      </h1>

      <section className='mt-8'>
        <h2 className='sr-only'>About Me</h2>

        {about_me && (
          <div className='text-lg font-light'>
            <RichText text={about_me} textClassName='lg:text-justify' />
          </div>
        )}
      </section>
    </>
  )
}
