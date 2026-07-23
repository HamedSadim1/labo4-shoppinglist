import { type ReactNode } from 'react';

interface IconButtonProps {
  onClick: () => void;
  label: string;
  title: string;
  variant?: 'default' | 'danger';
  className?: string;
  children: ReactNode;
}

export default function IconButton({
  onClick,
  label,
  title,
  variant = 'default',
  className = '',
  children,
}: IconButtonProps) {
  const baseClasses = 'p-2 rounded-lg transition-all duration-200 active:scale-90';
  const variantClasses =
    variant === 'danger'
      ? 'text-white/40 hover:text-red-300 hover:bg-red-400/15'
      : 'text-white/40 hover:text-purple-200 hover:bg-purple-400/15';

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
      title={title}
      aria-label={label}
    >
      {children}
    </button>
  );
}
