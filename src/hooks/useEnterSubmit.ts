import { useCallback } from 'react';

/**
 * Keyboard handler that submits on plain Enter. Ignores Shift+Enter so a
 * manual newline (in any future multi-line field) cannot accidentally
 * submit the form. Use with Formik's `submitForm` from the render prop or
 * any plain submit callback.
 *
 * Escape is NOT handled here on purpose — that's owned by the global
 * `useKeyboardShortcuts` priority chain in ShoppingList so cancel-dialog,
 * cancel-edit, and search-clear all route through one place.
 */
export function useEnterSubmit(submit: () => void) {
  return useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        submit();
      }
    },
    [submit],
  );
}
