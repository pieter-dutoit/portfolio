import { aboutMe } from '@/data/resume'

export default function AboutMe() {
  return (
    <section>
      <h2>About Me</h2>

      {aboutMe.map((paragraph) => (
        <p key={paragraph} className='mt-4 lg:text-justify'>
          {paragraph}
        </p>
      ))}
    </section>
  )
}
