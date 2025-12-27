import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'solid';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'glass', children, ...props }, ref) => {
    const variants = {
      glass: 'bg-white/10 backdrop-blur-md border border-white/20 shadow-xl',
      solid: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl overflow-hidden',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
