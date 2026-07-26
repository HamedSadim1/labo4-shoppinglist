import { useRef } from 'react';
import { useClearFlow } from '../hooks/useClearFlow';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { useShoppingItems } from '../hooks/useShoppingItems';
import { useToast } from '../hooks/useToast';
import AddItemForm from './AddItemForm';
import ClearCompletedDialog from './ClearCompletedDialog';
import ItemList from './ItemList';
import ItemsToolbar from './ItemsToolbar';

/**
 * Composition shell. Domain state lives in `useShoppingItems`; the
 * clear-confirm workflow (state + handlers + toast) is owned by
 * `useClearFlow`; keyboard handlers live in the global
 * `useKeyboardShortcuts` hook. Each subcomponent receives only the
 * props it needs.
 */
export default function ShoppingList() {
  const searchRef = useRef<HTMLInputElement>(null);
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

  const { showClearConfirm, requestClear, cancelClear, confirmClear } = useClearFlow(
    clearCompleted,
    push,
  );

  useKeyboardShortcuts({
    searchRef,
    searchQuery,
    setSearchQuery,
    escapes: [
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
        onClearCompleted={requestClear}
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
        onConfirm={confirmClear}
        onCancel={cancelClear}
      />
    </div>
  );
}
