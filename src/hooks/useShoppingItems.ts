import { useEffect, useMemo, useState } from 'react';
import { ShoppingItem, ShoppingListFilter, SortOption } from '../types';
import { useLocalStorage } from '../hooks';
import { STORAGE_KEYS } from '../config';

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
    const timer = setTimeout(() => setLastAddedId(null), 1500);
    return () => clearTimeout(timer);
  }, [lastAddedId]);

  const addItem = (item: ShoppingItem) => {
    setItems([item, ...items]);
    setLastAddedId(item.id);
  };

  const toggleComplete = (id: string) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)),
    );
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const startEdit = (id: string) => setEditingId(id);

  const saveEdit = (id: string, name: string, amount: number, category: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, name, amount, category } : item)));
    setEditingId(null);
  };

  const cancelEdit = () => setEditingId(null);

  const filteredItems = useMemo(() => {
    let result = [...items];

    if (filter === 'completed') {
      result = result.filter((item) => item.completed);
    } else if (filter === 'pending') {
      result = result.filter((item) => !item.completed);
    } else if (filter !== 'all') {
      result = result.filter((item) => item.category === filter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(query) || item.category.toLowerCase().includes(query),
      );
    }

    if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'category') {
      result.sort((a, b) => a.category.localeCompare(b.category));
    } else if (sortBy === 'created') {
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
  const clearCompleted = () => {
    const count = items.filter((item) => item.completed).length;
    if (count > 0) setItems(items.filter((item) => !item.completed));
    return count;
  };

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
