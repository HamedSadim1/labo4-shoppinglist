import { useState, useMemo } from 'react';
import { ShoppingItem, ShoppingListFilter, SortOption } from '../types';
import { useLocalStorage } from '../hooks';
import { STORAGE_KEYS } from '../config';
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

  const addItem = (item: ShoppingItem) => {
    setItems([item, ...items]);
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
    setItems(items.filter((item) => !item.completed));
    setShowClearConfirm(false);
  };

  const filteredItems = useMemo(() => {
    let result = [...items];

    // Filter by status/category
    if (filter === 'completed') {
      result = result.filter((item) => item.completed);
    } else if (filter === 'pending') {
      result = result.filter((item) => !item.completed);
    } else if (filter !== 'all') {
      result = result.filter((item) => item.category === filter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(query) || item.category.toLowerCase().includes(query),
      );
    }

    // Sort
    if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'category') {
      result.sort((a, b) => a.category.localeCompare(b.category));
    } else if (sortBy === 'created') {
      result.sort(
        (a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime(),
      );
    } else {
      // Default: pending first, then by creation date
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

      {/* Stats & Filters card */}
      <div className="glass-strong rounded-2xl p-4 sm:p-6 shadow-2xl animate-fade-in-up">
        <ItemStats
          totalItems={totalItems}
          completedItems={completedItems}
          onClearCompleted={() => setShowClearConfirm(true)}
        />

        {/* Search + Sort row */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          {/* Search */}
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition-all duration-200 backdrop-blur-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Sort */}
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
      </div>

      {/* List */}
      <ItemList
        items={filteredItems}
        editingId={editingId}
        filter={filter}
        searchQuery={searchQuery}
        onToggleComplete={toggleComplete}
        onEdit={startEdit}
        onSaveEdit={saveEdit}
        onCancelEdit={cancelEdit}
        onRemove={removeItem}
      />

      {/* Clear all completed confirmation dialog */}
      {showClearConfirm && completedItems > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm animate-fade-in">
          <div className="glass-strong rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl animate-scale-in">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-500/20 border border-red-400/30 mb-4">
                <svg
                  className="w-7 h-7 text-red-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Clear completed items?</h3>
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
          </div>
        </div>
      )}
    </div>
  );
}
