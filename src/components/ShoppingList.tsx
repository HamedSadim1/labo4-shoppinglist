import { useEffect, useMemo, useRef, useState } from 'react';
import { ShoppingItem, ShoppingListFilter, SortOption } from '../types';
import { useLocalStorage } from '../hooks';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { useToast } from '../hooks/useToast';
import { STORAGE_KEYS } from '../config';
import { AlertTriangleIcon, SearchIcon, XIcon } from './ui/icons';
import Card from './ui/Card';
import AddItemForm from './AddItemForm';
import ItemFilters from './ItemFilters';
import ItemStats from './ItemStats';
import ItemList from './ItemList';

export default function ShoppingList() {
  const [items, setItems] = useLocalStorage<ShoppingItem[]>(STORAGE_KEYS.SHOPPING_LIST, []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<ShoppingListFilter | string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const highlightTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { push } = useToast();

  const addItem = (item: ShoppingItem) => {
    setItems([item, ...items]);
    setLastAddedId(item.id);
    if (highlightTimerRef.current) clearTimeout(highlightTimerRef.current);
    highlightTimerRef.current = setTimeout(() => setLastAddedId(null), 1500);
  };

  const toggleComplete = (id: string) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)),
    );
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const startEdit = (id: string) => {
    setEditingId(id);
  };

  const saveEdit = (id: string, name: string, amount: number, category: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, name, amount, category } : item)));
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const clearCompleted = () => {
    const count = items.filter((item) => item.completed).length;
    setItems(items.filter((item) => !item.completed));
    setShowClearConfirm(false);
    if (count > 0) {
      push(
        count === 1 ? 'Cleared 1 completed item' : `Cleared ${count} completed items`,
        'success',
      );
    }
  };

  // Cancel any pending highlight timer when the list unmounts so we don't fire
  // setState on an unmounted node (e.g. HMR or route changes).
  useEffect(() => {
    return () => {
      if (highlightTimerRef.current) {
        clearTimeout(highlightTimerRef.current);
        highlightTimerRef.current = null;
      }
    };
  }, []);

  // One global keydown listener. Escape is dispatched through the priority
  // chain in order: clear-confirm dialog → editing → search-clear.
  useKeyboardShortcuts({
    searchRef,
    searchQuery,
    setSearchQuery,
    escapes: [
      () => {
        if (showClearConfirm) {
          setShowClearConfirm(false);
          return true;
        }
        return false;
      },
      () => {
        if (editingId) {
          cancelEdit();
          return true;
        }
        return false;
      },
    ],
  });

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
      result.sort((a, b) => {
        if (a.completed !== b.completed) return a.completed ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [items, filter, searchQuery, sortBy]);

  const totalItems = items.length;
  const completedItems = items.filter((item) => item.completed).length;

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 animate-fade-in-up">
      <AddItemForm onAddItem={addItem} />

      <Card variant="strong" padding="p-4 sm:p-6">
        <ItemStats
          totalItems={totalItems}
          completedItems={completedItems}
          onClearCompleted={() => setShowClearConfirm(true)}
        />

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              ref={searchRef}
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-16 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition-all duration-200 backdrop-blur-sm"
            />
            {!searchQuery && (
              <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-[10px] text-white/40 border border-white/10 bg-white/5 font-mono pointer-events-none">
                /
              </kbd>
            )}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                aria-label="Clear search"
              >
                <XIcon className="w-4 h-4" />
              </button>
            )}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white/70 text-sm focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition-all duration-200 backdrop-blur-sm cursor-pointer"
          >
            <option value="default" className="bg-gray-800 text-white">
              Default order
            </option>
            <option value="name" className="bg-gray-800 text-white">
              Sort by name
            </option>
            <option value="category" className="bg-gray-800 text-white">
              Sort by category
            </option>
            <option value="created" className="bg-gray-800 text-white">
              Newest first
            </option>
          </select>
        </div>

        <ItemFilters filter={filter} onFilterChange={setFilter} />
      </Card>

      <ItemList
        items={filteredItems}
        editingId={editingId}
        filter={filter}
        searchQuery={searchQuery}
        highlightedId={lastAddedId}
        onToggleComplete={toggleComplete}
        onEdit={startEdit}
        onSaveEdit={saveEdit}
        onCancelEdit={cancelEdit}
        onRemove={removeItem}
      />

      {showClearConfirm && completedItems > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="clear-confirm-title"
        >
          <Card
            variant="strong"
            padding="p-6 sm:p-8"
            animation="scale-in"
            className="max-w-sm w-full"
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-500/20 border border-red-400/30 mb-4">
                <AlertTriangleIcon className="w-7 h-7 text-red-300" />
              </div>
              <h3 id="clear-confirm-title" className="text-lg font-bold text-white mb-1">
                Clear completed items?
              </h3>
              <p className="text-white/50 text-sm">
                This will permanently remove {completedItems} completed item
                {completedItems !== 1 ? 's' : ''} from your list.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={clearCompleted}
                className="flex-1 bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 text-red-200 font-semibold py-2.5 rounded-xl transition-all duration-200 active:scale-[0.98]"
              >
                Yes, clear all
              </button>
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 bg-white/10 hover:bg-white/15 border border-white/20 text-white/70 hover:text-white font-semibold py-2.5 rounded-xl transition-all duration-200 active:scale-[0.98]"
              >
                Cancel
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
