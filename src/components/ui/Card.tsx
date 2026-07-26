import type { ReactNode } from 'react';

/**
 * Glass-morphism card primitive — single source of truth for the
 * repeated `glass-strong rounded-2xl … shadow-2xl animate-…`
 * container pattern used in Header, AddItemForm, ShoppingList,
 * ItemList (EmptyState) and the clear-confirm modal.
 */
export type CardVariant = 'soft' | 'strong';
export type CardAnimation = 'fade-in-up' | 'scale-in' | 'fade-in' | 'slide-in';

type CardAs = 'div' | 'li' | 'section';

interface CardProps {
  /** HTML element to render. Defaults to 'div'. */
  as?: CardAs;
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
  /** Adds hover lift, scale and a subtle border used by interactive list items. */
  interactive?: boolean;
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
  as: Component = 'div',
  variant = 'soft',
  padding,
  rounding = 'rounded-2xl',
  animation = 'fade-in-up',
  shadow = true,
  interactive = false,
  className = '',
  children,
}: CardProps) {
  const variantClass = variant === 'strong' ? 'glass-strong' : 'glass';
  const animationClass = animation ? ANIMATION_CLASS[animation] : '';
  const interactiveClass = interactive
    ? 'transition-all duration-300 hover:shadow-xl hover:scale-[1.01] group border border-white/10 hover:border-white/20'
    : '';

  return (
    <Component
      className={[
        variantClass,
        rounding,
        padding,
        shadow ? 'shadow-2xl' : '',
        animationClass,
        interactiveClass,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Component>
  );
}
