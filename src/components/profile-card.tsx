import Image from 'next/image'
import { profile, socialLinks } from '@/data/resume'

export default function ProfileCard() {
  const {
    full_name,
    title,
    physical_address,
    phone_number,
    photo_url,
    email_address
  } = profile

  return (
    <div className='border-border/60 bg-card ring-border/40 flex flex-col items-center overflow-hidden rounded-xl border px-[10%] py-8 text-center shadow-2xl ring-1 shadow-black/30 lg:sticky lg:top-24'>
      <Image
        className='border-border aspect-square w-full max-w-80 overflow-hidden rounded-lg border bg-emerald-500 object-cover object-center shadow-lg shadow-black/30'
        src={photo_url}
        alt={`Portrait of ${full_name}`}
        width={320}
        height={320}
        sizes='(min-width: 1024px) 320px, 80vw'
        priority
      />

      <p className='profile-name mt-6'>{full_name}</p>
      <div className='text-muted-foreground mt-2'>
        <p>{title}</p>
        {physical_address ? (
          <p className='text-meta'>{physical_address}</p>
        ) : null}
        {phone_number ? <p className='text-meta'>{phone_number}</p> : null}
      </div>

      <ul className='mt-6 flex flex-row items-center justify-center gap-4'>
        {socialLinks.map(({ url, name, photo_url, id }) => (
          <li key={id}>
            <a
              href={url}
              className='flex flex-col items-center gap-1 hover:opacity-80'
              target='_blank'
              rel='noreferrer'
            >
              <Image
                src={photo_url}
                height={40}
                width={40}
                alt=''
                className='rounded-xl bg-white object-cover object-center p-2 shadow-sm ring-1 ring-black/5 dark:ring-white/10'
              />
              <span className='text-eyebrow'>{name}</span>
            </a>
          </li>
        ))}
      </ul>

      <a
        href={`mailto:${email_address}`}
        className='mt-8 max-w-full min-w-40 rounded-md bg-emerald-600 px-6 py-2 text-lg font-extrabold text-white transition hover:bg-emerald-500'
      >
        Email me
      </a>
    </div>
  )
}
