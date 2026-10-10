'use client'

import { useEffect, useRef } from 'react'

type ProjectVideoProps = {
  src: string
  poster: string
  width: number
  height: number
  label: string
  describedBy?: string
  playback?: 'auto' | 'manual'
}

function requestPlayback(video: HTMLVideoElement) {
  void video.play().catch(() => {
    // Native controls remain available when the browser blocks playback.
  })
}

export function ProjectVideo({
  src,
  poster,
  width,
  height,
  label,
  describedBy,
  playback = 'auto'
}: ProjectVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (playback === 'manual') {
      video.autoplay = false
      video.pause()
      return
    }

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
  }, [src, playback])

  return (
    <div className='not-prose relative'>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        width={width}
        height={height}
        muted
        loop={playback === 'auto'}
        playsInline
        controls
        preload='none'
        aria-label={label}
        aria-describedby={describedBy}
        className='border-border block h-auto w-full rounded-lg border'
      >
        <a href={src}>Download the video</a>
      </video>
    </div>
  )
}
