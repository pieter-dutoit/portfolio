'use client'

import dynamic from 'next/dynamic'
import { Component, useId, useState, type ReactNode } from 'react'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

const Demo = dynamic(() => import('./demo'), {
  ssr: false,
  loading: () => <p role='status'>Loading the form demo…</p>
})

class DemoErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (this.state.failed) {
      return (
        <Alert variant='destructive'>
          <AlertDescription>
            <p>The demo could not load. The article is still available.</p>
            <Button
              variant='outline'
              onClick={() => this.setState({ failed: false })}
            >
              Try again
            </Button>
          </AlertDescription>
        </Alert>
      )
    }
    return this.props.children
  }
}

export function FormsDemo() {
  const [active, setActive] = useState(false)
  const headingId = useId()

  return (
    <section
      aria-labelledby={headingId}
      className='not-prose bg-card text-card-foreground my-8 overflow-hidden rounded-xl border'
      data-forms-demo
    >
      <div className='flex flex-col gap-3 border-b p-5 sm:p-6'>
        <p className='text-muted-foreground text-xs font-medium tracking-widest uppercase'>
          Interactive example
        </p>
        <h2 id={headingId} className='text-xl font-semibold'>
          Create and save tasks
        </h2>
        <p className='text-muted-foreground text-sm leading-relaxed'>
          Add a fictional task or try a failed save. Submissions are validated
          on the server, then saved in this browser.
        </p>
      </div>
      <div className='p-5 sm:p-6'>
        <DemoErrorBoundary>
          {active ? (
            <Demo />
          ) : (
            <div className='flex flex-col items-start gap-3'>
              <Button onClick={() => setActive(true)}>Try it</Button>
              <p className='text-muted-foreground text-sm'>
                Use example data only. Saved tasks stay here until you reset the
                demo or clear site storage.
              </p>
            </div>
          )}
        </DemoErrorBoundary>
      </div>
    </section>
  )
}
