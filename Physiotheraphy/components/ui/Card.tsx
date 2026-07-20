'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';

interface CardProps extends HTMLMotionProps<'div'> {
  hover?: boolean;
  glow?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hover = false, glow = false, children, className = '', ...props }, ref) => (
    <motion.div
      ref={ref}
      initial={hover ? { y: 0, boxShadow: 'var(--shadow-sm)' } : undefined}
      whileHover={
        hover
          ? { y: -4, boxShadow: 'var(--shadow-lg)', transition: { type: 'spring', stiffness: 300, damping: 20 } }
          : undefined
      }
      className={`
        bg-white rounded-2xl border border-[#E8ECF4]
        ${hover ? 'cursor-pointer' : ''}
        ${glow ? 'ring-1 ring-[#1E6FFF]/10 shadow-[0_0_0_1px_rgba(30,111,255,0.06),0_4px_24px_-4px_rgba(30,111,255,0.12)]' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  )
);

Card.displayName = 'Card';

export const CardHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pb-0 ${className}`}>{children}</div>
);

export const CardContent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);
