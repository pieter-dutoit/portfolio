import Image from 'next/image'

interface Props {
  name: string
  address?: string
  logo_url?: string
}

export default function CompanyProfile({ name, address, logo_url }: Props) {
  return (
    <div className='flex items-center gap-4'>
      {logo_url ? (
        <Image
          src={logo_url}
          alt=''
          height={48}
          width={48}
          sizes='48px'
          className='border-border size-12 overflow-hidden rounded-md border bg-clip-padding shadow-[2px_2px_0_0]'
        />
      ) : (
        <div
          aria-hidden='true'
          className='bg-muted border-border size-12 rounded-md border bg-clip-padding shadow-[2px_2px_0_0]'
        />
      )}
      <div>
        <h3>{name}</h3>
        {address ? (
          <p className='text-meta text-muted-foreground'>{address}</p>
        ) : null}
      </div>
    </div>
  )
}
