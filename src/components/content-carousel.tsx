'use client'

import { Children, type ReactNode } from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel
} from '@/components/ui/carousel'

const carouselOptions = {
  align: 'start' as const,
  loop: false,
  slidesToScroll: 1,
  breakpoints: {
    '(prefers-reduced-motion: reduce)': { duration: 0 }
  }
}

function ContentCarouselControls() {
  const { canScrollPrev, canScrollNext } = useCarousel()

  return (
    <div hidden={!canScrollPrev && !canScrollNext}>
      <div className='flex items-center gap-2'>
        <CarouselPrevious
          variant='ghost'
          className='static size-10 translate-x-0 translate-y-0'
        />
        <CarouselNext
          variant='ghost'
          className='static size-10 translate-x-0 translate-y-0'
        />
      </div>
    </div>
  )
}

type ContentCarouselProps = {
  title: string
  headingId: string
  children: ReactNode
}

export default function ContentCarousel({
  title,
  headingId,
  children
}: ContentCarouselProps) {
  const slideCount = Children.count(children)

  return (
    <Carousel opts={carouselOptions} aria-labelledby={headingId}>
      <div className='mb-4 flex min-h-10 items-center justify-between gap-4'>
        <h2 id={headingId}>{title}</h2>
        <ContentCarouselControls />
      </div>
      <CarouselContent
        viewportClassName='content-carousel-viewport'
        className='touch-pan-y touch-pinch-zoom'
      >
        {Children.map(children, (slide, index) => (
          <CarouselItem
            className='basis-[calc(min(24rem,100cqw-3rem)+1rem)]'
            aria-label={`${index + 1} of ${slideCount}`}
          >
            {slide}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
