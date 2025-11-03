import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'icon'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-primary hover:bg-primary-700 text-white': variant === 'primary',
            'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200': variant === 'secondary',
            'hover:bg-gray-100 text-gray-600': variant === 'icon',
          },
          {
            'px-3 py-1.5 text-sm rounded-component': size === 'sm',
            'px-4 py-2 text-sm rounded-component': size === 'md',
            'px-6 py-3 text-base rounded-component': size === 'lg',
          },
          variant === 'icon' && 'p-2 rounded-component',
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
