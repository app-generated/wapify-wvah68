import React from 'react'
import { cn } from '../../lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-6 pt-0', className)}
      {...props}
    >
      {children}
    </div>
  )
)

Card.displayName = 'Card'
CardContent.displayName = 'CardContent'

export { Card, CardContent }