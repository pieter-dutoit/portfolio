import { getProfile } from '@/db/queries/profile'

import RichText from './rich-text'

export default async function AboutMe() {
  const profile = await getProfile()

  const { about_me } = profile

  return (
    <section>
      <h2 className='mt-4 text-2xl font-semibold lg:text-left lg:text-2xl'>
        About me
      </h2>
      {about_me && (
        <div className='text-lg font-light'>
          <RichText text={about_me} textClassName='lg:text-justify' />
        </div>
      )}
    </section>
  )
}
