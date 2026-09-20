import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div'
    return (
      <Comp
        ref={ref}
        data-slot='card'
        className={cn(
          'group/card border-border bg-card text-card-foreground [&:is(a):focus-visible]:ring-ring [&:is(a):focus-visible]:ring-offset-background block overflow-hidden rounded-2xl border bg-clip-padding shadow-[3px_3px_0_0_var(--foreground)] transition-[color,background-color,opacity,box-shadow] [&:is(a):focus-visible]:ring-2 [&:is(a):focus-visible]:ring-offset-2 [&:is(a):focus-visible]:outline-none [&:is(a):hover_[data-slot=card-title]]:underline',
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot='card-header'
    className={cn('flex flex-col gap-1.5 p-6', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

const cardTitleVariants = cva('font-serif font-normal', {
  variants: {
    size: {
      sm: 'text-base leading-6',
      default: 'text-lg leading-6',
      lg: 'text-2xl leading-8'
    }
  },
  defaultVariants: { size: 'default' }
})

interface CardTitleProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardTitleVariants> {
  asChild?: boolean
}

const CardTitle = React.forwardRef<HTMLDivElement, CardTitleProps>(
  ({ className, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div'
    return (
      <Comp
        ref={ref}
        data-slot='card-title'
        className={cn(cardTitleVariants({ size }), className)}
        {...props}
      />
    )
  }
)
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot='card-description'
    className={cn('text-muted-foreground text-sm leading-5', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot='card-content'
    className={cn('p-6 pt-0', className)}
    {...props}
  />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot='card-footer'
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
