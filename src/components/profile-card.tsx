import Image from 'next/image'
import { profile, socialLinks } from '@/data/resume'

export default function ProfileCard() {
  const {
    full_name,
    title,
    qualification,
    qualification_detail,
    photo_url,
    email_address
  } = profile

  return (
    <div className='bg-card border-border flex flex-col items-center overflow-hidden rounded-xl border px-[10%] py-8 text-center shadow-[5px_5px_0_0] lg:sticky lg:top-24'>
      <Image
        className='border-border aspect-square w-full max-w-80 overflow-hidden rounded-lg border bg-emerald-500 bg-clip-padding object-cover object-center shadow-[3px_3px_0_0]'
        src={photo_url}
        alt={`Portrait of ${full_name}`}
        width={320}
        height={320}
        sizes='(min-width: 1024px) 320px, 80vw'
        priority
      />

      <p className='profile-name mt-6'>{full_name}</p>
      <div className='text-muted-foreground @container mt-2 w-full'>
        <p className='text-[min(0.875rem,4.8cqi)] font-semibold whitespace-nowrap'>
          {title}
        </p>
        <div className='my-4'>
          <p className='text-card-foreground font-semibold'>{qualification}</p>
          <p className='text-meta mt-1'>{qualification_detail}</p>
        </div>
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
                className='border-border rounded-md border bg-white bg-clip-padding object-cover object-center p-2 shadow-[3px_3px_0_0]'
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
