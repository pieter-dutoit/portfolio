import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { FormsDemo } from '@/features/demos/forms/forms-demo'

export const metadata: Metadata = {
  title: 'Form flow demo | Pieter du Toit',
  description:
    'Try a form with shared Zod validation, a Next.js Server Action, local browser persistence and TanStack Query.'
}

export default function FormsDemoPage() {
  return (
    <div className='max-w-4xl py-12'>
      <h1 className='text-3xl font-semibold'>
        A form from input to saved data
      </h1>
      <p className='text-muted-foreground mt-3 max-w-2xl leading-relaxed'>
        Explore the example from my post on Zod, React Hook Form and TanStack
        Query.
      </p>
      <Button asChild variant='link' size='inline' className='mt-3'>
        <Link href='/posts/forms-zod-rhf-tanstack-query'>
          Read the walkthrough
        </Link>
      </Button>
      <FormsDemo />
    </div>
  )
}
