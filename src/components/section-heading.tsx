export default function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className='text-4xl font-light text-slate-400 lg:text-5xl'>
      {children}
    </h2>
  )
}
