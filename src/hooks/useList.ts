import { useCallback, useState } from 'react';
import { produce } from 'immer';

/**
 * Reusable hook for managing a list of items with common add/remove/update
 * operations. It hides the Immer `produce` boilerplate that was duplicated
 * in the List and People lab components.
 *
 * The hook is generic so it works for any item shape; it does not require
 * items to have an `id` field. `remove` works by index, making it suitable
 * for simple lab lists.
 */
export interface UseListReturn<T> {
  items: T[];
  setItems: React.Dispatch<React.SetStateAction<T[]>>;
  add: (item: T) => void;
  remove: (index: number) => void;
  update: (index: number, changes: Partial<T>) => void;
}

export function useList<T>(initialItems: T[] = []): UseListReturn<T> {
  const [items, setItems] = useState<T[]>(initialItems);

  const add = useCallback((item: T) => {
    setItems((prev) => [...prev, item]);
  }, []);

  const remove = useCallback((index: number) => {
    setItems((prev) => {
      if (index < 0 || index >= prev.length) return prev;
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  const update = useCallback((index: number, changes: Partial<T>) => {
    setItems((prev) => {
      if (index < 0 || index >= prev.length) return prev;
      return produce(prev, (draft) => {
        draft[index] = { ...draft[index], ...changes };
      });
    });
  }, []);

  return { items, setItems, add, remove, update };
}
