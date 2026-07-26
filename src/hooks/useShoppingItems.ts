import { useCallback, useEffect, useMemo, useState } from 'react';
import { ShoppingItem, ShoppingListFilter, SortOption } from '../types';
import { useLocalStorage } from '../hooks';
import { ANIMATION, FILTER, SORT, STORAGE_KEYS } from '../config';

/**
 * Single hook owning the shopping list's business state and lifecycle:
 *   - items (persisted via useLocalStorage)
 *   - editingId, filter, sortBy, searchQuery
 *   - lastAddedId (cleared after a short highlight window)
 *
 * Returns both the unfiltered counts (for ItemStats) and the
 * filtered+sorted list (for ItemList), plus all mutator actions.
 */
export function useShoppingItems() {
  const [items, setItems] = useLocalStorage<ShoppingItem[]>(STORAGE_KEYS.SHOPPING_LIST, []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<ShoppingListFilter | string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);

  // Auto-clear lastAddedId after the highlight window so the new item's
  // pulse runs exactly once per add — and unmount also clears any pending
  // timer cleanly via the effect's cleanup return.
  useEffect(() => {
    if (!lastAddedId) return;
    const timer = setTimeout(() => setLastAddedId(null), ANIMATION.HIGHLIGHT_PULSE_MS);
    return () => clearTimeout(timer);
  }, [lastAddedId]);

  /* eslint-disable react-hooks/exhaustive-deps -- setters from useState/useLocalStorage are React-stable; functional setState means no closure reads of `items` */
  const addItem = useCallback((item: ShoppingItem) => {
    setItems((prev) => [item, ...prev]);
    setLastAddedId(item.id);
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  /* eslint-disable react-hooks/exhaustive-deps -- setters are React-stable; functional updater means no closure reads of items */
  const toggleComplete = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)),
    );
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  /* eslint-disable react-hooks/exhaustive-deps -- setters are React-stable; functional updater means no closure reads of items */
  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  const startEdit = useCallback((id: string) => setEditingId(id), []);

  /* eslint-disable react-hooks/exhaustive-deps -- setters are React-stable; functional updater means no closure reads of items */
  const saveEdit = useCallback((id: string, name: string, amount: number, category: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, name, amount, category } : item)),
    );
    setEditingId(null);
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  const cancelEdit = useCallback(() => setEditingId(null), []);

  const filteredItems = useMemo(() => {
    let result = [...items];

    if (filter === FILTER.COMPLETED) {
      result = result.filter((item) => item.completed);
    } else if (filter === FILTER.PENDING) {
      result = result.filter((item) => !item.completed);
    } else if (filter !== FILTER.ALL) {
      result = result.filter((item) => item.category === filter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(query) || item.category.toLowerCase().includes(query),
      );
    }

    if (sortBy === SORT.NAME) {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === SORT.CATEGORY) {
      result.sort((a, b) => a.category.localeCompare(b.category));
    } else if (sortBy === SORT.CREATED) {
      result.sort(
        (a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime(),
      );
    } else {
      result.sort((a, b) => (a.completed !== b.completed ? (a.completed ? 1 : -1) : 0));
    }

    return result;
  }, [items, filter, searchQuery, sortBy]);

  const totalItems = items.length;
  const completedItems = items.filter((item) => item.completed).length;

  /**
   * Removes all completed items. Returns the number that were removed so the
   * consumer can drive UI side-effects (toasts) without re-deriving it.
   */
  /* eslint-disable react-hooks/exhaustive-deps -- count derived inside the updater so deps can stay empty; setters are React-stable */
  const clearCompleted = useCallback(() => {
    // The closure used to read `items` for the count, which forced
    // `[items]` deps and rebuilt the ref on every CRUD mutation.
    // Deriving the count *inside* the functional updater lets us drop the
    // items dep entirely — the outer `count` settles to the value
    // corresponding to whatever state React actually commits (StrictMode
    // runs the updater twice in dev with the same answer; concurrent
    // rendering uses the latest prev). Returns the count of items cleared.
    let count = 0;
    setItems((prev) => {
      count = prev.filter((item) => item.completed).length;
      return count > 0 ? prev.filter((item) => !item.completed) : prev;
    });
    return count;
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  return {
    items: filteredItems,
    totalItems,
    completedItems,
    editingId,
    filter,
    sortBy,
    searchQuery,
    lastAddedId,
    addItem,
    toggleComplete,
    removeItem,
    startEdit,
    saveEdit,
    cancelEdit,
    clearCompleted,
    setFilter,
    setSortBy,
    setSearchQuery,
  };
}
