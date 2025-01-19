/* eslint-disable @next/next/no-img-element */

interface Props {
  name: string
  address?: string
  logo_url?: string
}

export default function CompanyProfile({ name, address, logo_url }: Props) {
  return (
    <div className='flex items-center gap-4'>
      <img
        src={logo_url}
        alt={name + ' logo'}
        height={48}
        width={48}
        className='size-12 overflow-hidden rounded-lg border-2 border-gray-300'
      />
      <div>
        <h3 className='text-xl'>{name}</h3>
        <p className='text-sm'>{address}</p>
      </div>
    </div>
  )
}
