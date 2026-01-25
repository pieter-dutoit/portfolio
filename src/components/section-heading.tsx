export default function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className='text-4xl font-light text-foreground lg:text-5xl'>
      {children}
    </h2>
  )
}
