import { useCallback, useState } from 'react';
import type { ToastVariant } from './useToast';

/**
 * Owns the "clear completed items" flow: modal-visible state plus
 * request / cancel / confirm handlers. Confirmation runs the `clearCompleted`
 * mutator, closes the modal, and pushes a toast with singular/plural-aware
 * copy. The consumer just wires `requestClear` to the trigger button and
 * `confirmClear` / `cancelClear` to the dialog.
 *
 * Depends only on the two operations it has to call, so it stays a thin
 * facade and is trivial to unit-test if a Vitest setup lands later.
 */
export function useClearFlow(
  clearCompleted: () => number,
  push: (message: string, variant?: ToastVariant) => void,
) {
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const requestClear = useCallback(() => setShowClearConfirm(true), []);
  const cancelClear = useCallback(() => setShowClearConfirm(false), []);

  const confirmClear = useCallback(() => {
    const count = clearCompleted();
    setShowClearConfirm(false);
    if (count > 0) {
      push(
        count === 1 ? 'Cleared 1 completed item' : `Cleared ${count} completed items`,
        'success',
      );
    }
  }, [clearCompleted, push]);

  return { showClearConfirm, requestClear, cancelClear, confirmClear };
}
