import { serializeJsonLd } from '@/lib/seo'

type JsonLdProps = {
  data: object
  id?: string
}

export default function JsonLd({ data, id }: JsonLdProps) {
  return (
    <script
      id={id}
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  )
}
