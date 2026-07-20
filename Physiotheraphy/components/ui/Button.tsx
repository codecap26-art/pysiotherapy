'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'accent';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-[#1E6FFF] text-white shadow-[0_1px_2px_rgba(30,111,255,0.3),inset_0_1px_0_rgba(255,255,255,0.15)] hover:bg-[#1558D6] active:bg-[#1046BD]',
  secondary:
    'bg-[#F0F5FF] text-[#1E6FFF] hover:bg-[#DBEAFE] active:bg-[#BFDBFE] border border-[#BFDBFE]',
  outline:
    'bg-transparent border border-[#E8ECF4] text-[#0D1421] hover:bg-[#F8FAFC] hover:border-[#CBD5E1] active:bg-[#F1F5F9]',
  ghost:
    'bg-transparent text-[#4A5568] hover:bg-[#F8FAFC] active:bg-[#F1F5F9]',
  danger:
    'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-[0_1px_2px_rgba(239,68,68,0.3)]',
  accent:
    'bg-[#10B981] text-white shadow-[0_1px_2px_rgba(16,185,129,0.3),inset_0_1px_0_rgba(255,255,255,0.15)] hover:bg-[#059669] active:bg-[#047857]',
};

const sizeStyles: Record<Size, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5 rounded-lg',
  md: 'h-10 px-4 text-sm gap-2 rounded-xl',
  lg: 'h-12 px-6 text-base gap-2.5 rounded-xl',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, leftIcon, rightIcon, children, className = '', disabled, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        whileHover={{ y: -1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        disabled={disabled || isLoading}
        className={`
          inline-flex items-center justify-center font-semibold tracking-[-0.01em]
          transition-colors duration-150 cursor-pointer select-none
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FFF]/30 focus-visible:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
          ${variantStyles[variant]} ${sizeStyles[size]} ${className}
        `}
        {...(props as any)}
      >
        {isLoading ? (
          <Loader2 className="animate-spin" size={size === 'sm' ? 14 : 16} />
        ) : leftIcon}
        {children}
        {!isLoading && rightIcon}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

/* LinkButton: use this for <Link> wrappers to avoid asChild complexity */
export function LinkButton({
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  external = false,
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const cls = `
    inline-flex items-center justify-center gap-2 font-semibold tracking-[-0.01em]
    transition-colors duration-150 cursor-pointer select-none
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FFF]/30 focus-visible:ring-offset-2
    ${variantStyles[variant]} ${sizeStyles[size]} ${className}
  `;
  if (external) {
    return <a href={href} className={cls} target="_blank" rel="noopener noreferrer">{children}</a>;
  }
  return <a href={href} className={cls}>{children}</a>;
}
