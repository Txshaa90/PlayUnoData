import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'status' | 'priority' | 'default'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        variant === 'status' && 'border-current border-opacity-20',
        variant === 'priority' && 'border-current border-opacity-20',
        variant === 'default' && 'bg-gray-100 text-gray-800 border-gray-200',
        className
      )}
    >
      {children}
    </span>
  )
}
