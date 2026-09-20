'use client'

import { Play } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'

type ProjectVideoProps = {
  src: string
  poster: string
  width: number
  height: number
  label: string
  describedBy?: string
}

function requestPlayback(video: HTMLVideoElement) {
  void video.play().catch(() => {
    // Keep the play button available when the browser blocks playback.
  })
}

export function ProjectVideo({
  src,
  poster,
  width,
  height,
  label,
  describedBy
}: ProjectVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoId = useId()
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncPlayback = () => {
      // Check the preference before enabling autoplay, including on first load.
      video.autoplay = !reducedMotion.matches
      if (reducedMotion.matches) {
        video.pause()
      } else {
        requestPlayback(video)
      }
    }

    syncPlayback()
    reducedMotion.addEventListener('change', syncPlayback)

    return () => {
      reducedMotion.removeEventListener('change', syncPlayback)
      video.pause()
    }
  }, [src])

  return (
    <div className='not-prose relative'>
      <video
        ref={videoRef}
        id={videoId}
        src={src}
        poster={poster}
        width={width}
        height={height}
        muted
        loop
        playsInline
        controls={false}
        preload='none'
        aria-label={label}
        aria-describedby={describedBy}
        className='border-border block h-auto w-full rounded-lg border'
        onPlaying={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <a href={src}>Download the video</a>
      </video>
      {!isPlaying ? (
        <div className='absolute inset-0 flex items-center justify-center'>
          <Button
            type='button'
            variant='secondary'
            size='icon'
            className='size-14 rounded-full'
            aria-label={`Play ${label}`}
            aria-controls={videoId}
            onClick={() => {
              if (videoRef.current) requestPlayback(videoRef.current)
            }}
          >
            <Play data-icon aria-hidden='true' />
          </Button>
        </div>
      ) : null}
    </div>
  )
}
