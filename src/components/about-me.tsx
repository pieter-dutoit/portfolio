import { aboutMe, profile } from '@/data/resume'

export default function AboutMe() {
  const { full_name, title } = profile

  return (
    <>
      <h1 className='text-center text-5xl font-extrabold text-slate-400 lg:text-left lg:text-6xl'>
        {full_name} <br />
        <span className='text-[0.5em]'>{title}</span>
      </h1>

      <section className='mt-8'>
        <h2 className='text-xl font-bold'>About Me</h2>

        <div className='text-lg font-light'>
          {aboutMe.map((paragraph) => (
            <p key={paragraph} className='mt-4 lg:text-justify'>
              {paragraph}
            </p>
          ))}
        </div>
      </section>
    </>
  )
}
