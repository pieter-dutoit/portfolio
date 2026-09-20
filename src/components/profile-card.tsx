import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
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
    <Card className='flex flex-col items-center px-[10%] py-8 text-center lg:sticky lg:top-24'>
      <CardHeader className='w-full items-center gap-0 p-0'>
        <Image
          className='border-border aspect-square w-full max-w-80 overflow-hidden rounded-lg border bg-emerald-500 bg-clip-padding object-cover object-center shadow-[3px_3px_0_0]'
          src={photo_url}
          alt={`Portrait of ${full_name}`}
          width={320}
          height={320}
          sizes='(min-width: 1024px) 320px, 80vw'
          priority
        />

        <CardTitle asChild size='lg' className='max-lg:sr-only lg:mt-6'>
          <p>{full_name}</p>
        </CardTitle>
      </CardHeader>
      <CardContent className='text-muted-foreground @container mt-2 w-full p-0'>
        <p className='text-[min(0.875rem,4.8cqi)] font-semibold whitespace-nowrap max-lg:sr-only'>
          {title}
        </p>
        <div className='my-4'>
          <p className='text-card-foreground font-semibold'>{qualification}</p>
          <CardDescription className='mt-1'>
            {qualification_detail}
          </CardDescription>
        </div>
      </CardContent>

      <CardFooter className='mt-6 w-full flex-col p-0'>
        <ul className='flex flex-wrap items-center justify-center gap-4'>
          {socialLinks.map(({ url, name, photo_url, id }) => (
            <li key={id}>
              <Button asChild variant='social'>
                <a href={url} target='_blank' rel='noreferrer'>
                  <Image
                    src={photo_url}
                    height={40}
                    width={40}
                    alt=''
                    data-social-icon=''
                  />
                  <span>{name}</span>
                </a>
              </Button>
            </li>
          ))}
        </ul>

        <Button
          asChild
          size='lg'
          className='mt-8 max-w-full'
          variant='secondary'
        >
          <a href={`mailto:${email_address}`}>Email me</a>
        </Button>
      </CardFooter>
    </Card>
  )
}
