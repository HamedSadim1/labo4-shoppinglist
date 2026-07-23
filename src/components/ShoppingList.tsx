import { useRef, useState } from 'react';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { useToast } from '../hooks/useToast';
import { useShoppingItems } from '../hooks/useShoppingItems';
import AddItemForm from './AddItemForm';
import ClearCompletedDialog from './ClearCompletedDialog';
import ItemList from './ItemList';
import ItemsToolbar from './ItemsToolbar';

/**
 * Composition shell. All state lives in `useShoppingItems`; the toolbar
 * (`<ItemsToolbar />`) and confirm modal (`<ClearCompletedDialog />`) are
 * extracted for single-responsibility. The '/'-focus keyboard shortcut and
 * the Escape priority chain (modal → edit → search) live in the global
 * `useKeyboardShortcuts` hook — ShoppingList only feeds it the closures.
 */
export default function ShoppingList() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const { push } = useToast();

  const {
    items,
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
  } = useShoppingItems();

  const handleClearCompleted = () => {
    const count = clearCompleted();
    setShowClearConfirm(false);
    if (count > 0) {
      push(
        count === 1 ? 'Cleared 1 completed item' : `Cleared ${count} completed items`,
        'success',
      );
    }
  };

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

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 animate-fade-in-up">
      <AddItemForm onAddItem={addItem} />

      <ItemsToolbar
        totalItems={totalItems}
        completedItems={completedItems}
        onClearCompleted={() => setShowClearConfirm(true)}
        searchRef={searchRef}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        filter={filter}
        onFilterChange={setFilter}
      />

      <ItemList
        items={items}
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

      <ClearCompletedDialog
        open={showClearConfirm}
        completedCount={completedItems}
        onConfirm={handleClearCompleted}
        onCancel={() => setShowClearConfirm(false)}
      />
    </div>
  );
}
