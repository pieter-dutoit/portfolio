import { aboutMe, profile } from '@/data/resume'

export default function AboutMe() {
  const { full_name, title } = profile

  return (
    <>
      <header className='text-center lg:text-left'>
        <h1>{full_name}</h1>
        <p className='text-lead text-muted-foreground mt-2'>{title}</p>
      </header>

      <section className='mt-8'>
        <h2>About Me</h2>

        {aboutMe.map((paragraph) => (
          <p key={paragraph} className='mt-4 lg:text-justify'>
            {paragraph}
          </p>
        ))}
      </section>
    </>
  )
}
