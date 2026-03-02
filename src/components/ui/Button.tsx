'use client'
import { cn } from '@/lib/cn'
import { forwardRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
          variant === 'primary' && 'bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90',
          variant === 'secondary' && 'bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:opacity-80',
          variant === 'ghost' && 'hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]',
          variant === 'destructive' && 'bg-[var(--destructive)] text-white hover:opacity-90',
          size === 'sm' && 'h-8 px-3 text-xs',
          size === 'md' && 'h-10 px-4 text-sm',
          size === 'lg' && 'h-12 px-6 text-base',
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
