import type { ReactNode } from 'react';

/**
 * Glass-morphism card primitive — single source of truth for the
 * repeated `glass-strong rounded-2xl … shadow-2xl animate-…`
 * container pattern used in Header, AddItemForm, ShoppingList,
 * ItemList (EmptyState) and the clear-confirm modal.
 */
export type CardVariant = 'soft' | 'strong';
export type CardAnimation = 'fade-in-up' | 'scale-in' | 'fade-in' | 'slide-in';

interface CardProps {
  /** 'soft' = glass, 'strong' = glass-strong. Defaults to 'soft'. */
  variant?: CardVariant;
  /** Tailwind padding, e.g. 'p-5 sm:p-6'. Required so call sites declare their density explicitly. */
  padding: string;
  /** Border-radius classes, e.g. 'rounded-2xl' or 'rounded-2xl sm:rounded-3xl'. */
  rounding?: string;
  /** Entry animation. Pass `false` to disable. */
  animation?: CardAnimation | false;
  /** Toggle the elevated `shadow-2xl`. Defaults to `true`; opt out for floating/non-elevated cards. */
  shadow?: boolean;
  /** Extra classes appended last (margin, width constraint, text alignment, ...). */
  className?: string;
  children?: ReactNode;
}

// Animation class lookup so Tailwind's source scanner always sees the
// full literal class names (no `animate-${…}` runtime interpolation).
const ANIMATION_CLASS: Record<CardAnimation, string> = {
  'fade-in-up': 'animate-fade-in-up',
  'scale-in': 'animate-scale-in',
  'fade-in': 'animate-fade-in',
  'slide-in': 'animate-slide-in',
};

export default function Card({
  variant = 'soft',
  padding,
  rounding = 'rounded-2xl',
  animation = 'fade-in-up',
  shadow = true,
  className = '',
  children,
}: CardProps) {
  const variantClass = variant === 'strong' ? 'glass-strong' : 'glass';
  const animationClass = animation ? ANIMATION_CLASS[animation] : '';

  return (
    <div
      className={[
        variantClass,
        rounding,
        padding,
        shadow ? 'shadow-2xl' : '',
        animationClass,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}
