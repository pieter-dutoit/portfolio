/* eslint-disable @next/next/no-img-element */
import { getProfile } from '@/db/queries/profile'
import { getSocialLinks } from '@/db/queries/social-link'

export default async function ProfileCard() {
  const profile = await getProfile()
  const socials = await getSocialLinks()

  const { full_name, title, physical_address, photo_url, email_address } =
    profile

  return (
    <div className='top-16 flex flex-col items-center overflow-hidden rounded-3xl bg-white/10 px-[10%] py-6 text-center shadow-lg shadow-slate-950/20 lg:sticky'>
      <img
        className='aspect-square w-full max-w-80 overflow-hidden rounded-2xl border-white bg-emerald-500 object-cover object-center shadow-lg shadow-slate-700/50'
        src={photo_url}
        alt='Profile picture'
        loading='eager'
      />

      <span className='mt-6 text-3xl font-bold'>{full_name}</span>
      <span className='mt-2 text-lg text-gray-300'>
        {title} <br /> {physical_address}
      </span>

      <ul className='mt-6 flex flex-row items-center justify-center gap-4'>
        {socials.map(({ url, name, photo_url, id }) => (
          <li key={id}>
            <a
              href={url}
              className='flex flex-col items-center gap-1 hover:opacity-80'
              target='_blank'
            >
              <img
                src={photo_url}
                height={40}
                width={40}
                alt={name + ' icon'}
                className='rounded-xl bg-emerald-50 object-cover object-center p-2'
              />
              <span className='text-xs'>{name}</span>
            </a>
          </li>
        ))}
      </ul>

      <a
        href={`mailto:${email_address}`}
        className='mt-8 min-w-40 max-w-full rounded-md bg-emerald-500 px-6 py-2 text-base font-semibold tracking-wider'
      >
        Reach out!
      </a>
    </div>
  )
}
