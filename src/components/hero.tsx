interface Props {
  title: string
  subtitle: string
}

export default function Hero({ title, subtitle }: Props) {
  return (
    <h1 className='pt-12 text-center text-4xl font-extrabold md:text-6xl lg:pt-16 lg:text-8xl'>
      {title}
      <br />
      <span className='text-center text-[0.7em] font-bold text-emerald-400'>
        {subtitle}
      </span>
    </h1>
  )
}
