import type { ReactNode, RefObject } from 'react';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { XIcon } from './icons';
import Card from './Card';

/**
 * Simple focus trap for the dialog: Tab cycles through focusable elements,
 * Shift+Tab cycles backwards, and the first focusable element is focused
 * when the dialog opens.
 */
function useFocusTrap<T extends HTMLElement>(isOpen: boolean): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!isOpen || !ref.current) return;

    const container = ref.current;
    const focusable = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    first?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || focusable.length === 0) return;

      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  return ref;
}

interface DialogProps {
  /** Whether the dialog is visible. */
  open: boolean;
  /** Called when the dialog should close (backdrop click, Escape, close button). */
  onClose: () => void;
  /** Dialog title rendered in the header. */
  title: string;
  /** Optional description rendered below the title. */
  description?: string;
  /** Children rendered in the dialog body. */
  children: ReactNode;
  /**
   * Maximum width of the dialog content.
   * @default 'max-w-lg'
   */
  maxWidth?: string;
}

/**
 * Accessible, shadcn/ui-inspired dialog primitive.
 *
 * Responsibilities:
 * - Lock body scroll while open
 * - Close on Escape key
 * - Close on backdrop click
 * - Render a close button in the top-right corner
 * - Wrap content in a centered Card with consistent padding and animation
 */
export default function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  maxWidth = 'max-w-lg',
}: DialogProps) {
  const contentRef = useFocusTrap<HTMLDivElement>(open);

  useLayoutEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      aria-describedby={description ? 'dialog-description' : undefined}
      onClick={onClose}
    >
      <div ref={contentRef} className={`w-full ${maxWidth}`} onClick={(e) => e.stopPropagation()}>
        <Card variant="strong" padding="p-6 sm:p-8" animation="scale-in" className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm p-1 text-white/50 opacity-70 transition-opacity hover:opacity-100 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            aria-label="Close dialog"
            type="button"
          >
            <XIcon className="h-5 w-5" />
          </button>

          <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-6 pr-8">
            <h2 id="dialog-title" className="text-lg sm:text-xl font-bold text-white">
              {title}
            </h2>
            {description && (
              <p id="dialog-description" className="text-white/60 text-sm leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {children}
        </Card>
      </div>
    </div>,
    document.body,
  );
}
