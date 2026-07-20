type BadgeVariant = 'default' | 'primary' | 'accent' | 'warning' | 'danger' | 'outline' | 'success' | 'info';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  default:   'bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]',
  primary:   'bg-[#EFF5FF] text-[#1E6FFF] border-[#BFDBFE]',
  accent:    'bg-[#D1FAE5] text-[#059669] border-[#A7F3D0]',
  warning:   'bg-[#FEF9C3] text-[#854D0E] border-[#FDE68A]',
  danger:    'bg-[#FEE2E2] text-[#DC2626] border-[#FECACA]',
  outline:   'bg-transparent text-[#4A5568] border-[#E8ECF4]',
  success:   'bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]',
  info:      'bg-[#ECFEFF] text-[#0891B2] border-[#CFFAFE]',
};

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full
        text-xs font-semibold border tracking-wide
        ${variants[variant]} ${className}
      `}
    >
      {children}
    </span>
  );
}
