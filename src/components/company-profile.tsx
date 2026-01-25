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
          alt={name + ' logo'}
          height={48}
          width={48}
          sizes='48px'
          className='size-12 overflow-hidden rounded-lg border-2 border-border'
        />
      ) : (
        <div
          aria-hidden='true'
          className='size-12 rounded-lg border-2 border-border bg-muted'
        />
      )}
      <div>
        <h3 className='text-xl'>{name}</h3>
        <p className='text-sm text-muted-foreground'>{address}</p>
      </div>
    </div>
  )
}
