import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,background-color,opacity,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_[data-icon]]:size-4 [&_[data-icon]]:shrink-0 [&_[data-icon]]:align-middle',
  {
    variants: {
      variant: {
        default: 'bg-button text-button-foreground hover:opacity-80',
        social:
          'flex-col gap-1 text-xs leading-4 font-normal text-foreground hover:opacity-80 [&_[data-social-icon]]:size-10 [&_[data-social-icon]]:rounded-md [&_[data-social-icon]]:border [&_[data-social-icon]]:border-border [&_[data-social-icon]]:bg-button [&_[data-social-icon]]:bg-clip-padding [&_[data-social-icon]]:object-contain [&_[data-social-icon]]:p-2 [&_[data-social-icon]]:shadow-[3px_3px_0_0_var(--foreground)]',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        muted:
          'border border-border/50 bg-transparent bg-clip-padding text-muted-foreground shadow-[3px_3px_0_0] shadow-border/50 hover:bg-muted/50',
        link: 'text-primary underline underline-offset-4 hover:opacity-80',
        field:
          'h-11 w-full justify-between bg-card text-foreground hover:bg-card/80 data-[placeholder]:text-muted-foreground [&>span]:line-clamp-1'
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'size-10',
        'icon-sm': 'size-8',
        inline:
          'inline h-auto whitespace-normal p-0 text-[length:inherit] leading-[inherit] font-[weight:inherit] [&_[data-icon]]:inline-block [&_[data-icon=inline-start]]:mr-2 [&_[data-icon=inline-end]]:ml-2'
      }
    },
    compoundVariants: [
      {
        variant: ['default', 'destructive', 'outline', 'secondary', 'field'],
        className:
          'border border-border bg-clip-padding shadow-[3px_3px_0_0_var(--foreground)]'
      },
      { variant: 'field', size: 'default', className: 'h-11 px-3' },
      { variant: 'social', size: 'default', className: 'h-auto p-0' }
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        type={asChild ? undefined : 'button'}
        data-slot='button'
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
