import type { ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * Reusable button that removes the repeated Tailwind class soup for the three
 * button patterns used throughout the app.
 *
 * The variant names match the semantic intent of the action, not just the
 * colour, so the styles can evolve in one place.
 */

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'ghost-danger';
type ButtonSize = 'default' | 'sm' | 'md';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-purple-500/30 to-pink-500/30 hover:from-purple-500/40 hover:to-pink-500/40 border-purple-400/30 text-purple-100 hover:shadow-purple-500/20',
  secondary:
    'bg-white/5 hover:bg-white/15 border-white/15 text-white/60 hover:text-white hover:shadow-lg',
  danger: 'bg-red-500/20 hover:bg-red-500/30 border-red-400/30 text-red-200',
  ghost: 'bg-white/20 hover:bg-white/30 border-white/20 text-white hover:shadow-lg',
  'ghost-danger': 'bg-red-500/20 hover:bg-red-500/30 border-red-400/30 text-red-200',
};

const sizeClasses: Record<ButtonSize, string> = {
  default: 'py-3 px-8 rounded-xl',
  sm: 'py-2 px-4 sm:px-5 text-sm rounded-xl',
  md: 'py-2 px-4 rounded-lg',
};

export default function Button({
  variant = 'primary',
  size = 'default',
  children,
  className = '',
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`font-semibold transition-all duration-200 backdrop-blur-sm hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2 group border ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
