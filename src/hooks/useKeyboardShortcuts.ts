import { useEffect, useRef } from 'react';
import { KEYBOARD } from '../config';

/**
 * Single global keydown listener for the shopping list shell.
 *
 *  - `/` (outside text inputs) focuses the search input.
 *  - `Ctrl/Cmd+K` always focuses + selects the search input.
 *  - `Escape` runs through the `escapes` chain in order; the first handler
 *    that returns `true` wins and the event is consumed. If none handle it
 *    and the search input is focused, the query is cleared and blurred.
 *
 * The `escapes` array can change every render; we stash it in a ref so the
 * listener only binds once, while still reading the latest closures each
 * invocation.
 */
export function useKeyboardShortcuts({
  searchRef,
  searchQuery,
  setSearchQuery,
  escapes,
}: {
  searchRef: React.RefObject<HTMLInputElement | null>;
  searchQuery: string;
  setSearchQuery: (next: string) => void;
  /** Priority-ordered escape handlers. Return `true` to consume the event. */
  escapes: Array<() => boolean>;
}) {
  const escapesRef = useRef(escapes);
  useEffect(() => {
    escapesRef.current = escapes;
  });

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName ?? '';
      const isEditable =
        target?.isContentEditable || tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';

      if (event.key === KEYBOARD.SEARCH_FOCUS_KEY && !isEditable) {
        event.preventDefault();
        searchRef.current?.focus();
        return;
      }

      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === KEYBOARD.SEARCH_FOCUS_MODIFIER_KEY
      ) {
        event.preventDefault();
        searchRef.current?.focus();
        searchRef.current?.select();
        return;
      }

      if (event.key === 'Escape') {
        for (const handle of escapesRef.current) {
          if (handle()) {
            event.preventDefault();
            return;
          }
        }
        if (document.activeElement === searchRef.current) {
          if (searchQuery) {
            event.preventDefault();
            setSearchQuery('');
          }
          searchRef.current?.blur();
        }
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [searchQuery, setSearchQuery, searchRef]);
}
