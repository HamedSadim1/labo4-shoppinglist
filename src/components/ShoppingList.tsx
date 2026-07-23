import { useState } from 'react';
import { ShoppingItem } from '../types';
import { useLocalStorage } from '../hooks';
import AddItemForm from './AddItemForm';
import ItemFilters from './ItemFilters';
import ItemStats from './ItemStats';
import ItemList from './ItemList';

export default function ShoppingList() {
  const [items, setItems] = useLocalStorage<ShoppingItem[]>('shoppingList', []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');

  const addItem = (item: ShoppingItem) => {
    setItems([...items, item]);
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
  };

  const filteredItems = items.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return item.completed;
    if (filter === 'pending') return !item.completed;
    return item.category === filter;
  });

  const totalItems = items.length;
  const completedItems = items.filter((item) => item.completed).length;

  return (
    <div className="max-w-4xl mx-auto">
      <AddItemForm onAddItem={addItem} />

      <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl p-6 mb-6 shadow-2xl">
        <ItemStats
          totalItems={totalItems}
          completedItems={completedItems}
          onClearCompleted={clearCompleted}
        />
        <ItemFilters filter={filter} onFilterChange={setFilter} />
      </div>

      <ItemList
        items={filteredItems}
        editingId={editingId}
        filter={filter}
        onToggleComplete={toggleComplete}
        onEdit={startEdit}
        onSaveEdit={saveEdit}
        onCancelEdit={cancelEdit}
        onRemove={removeItem}
      />
    </div>
  );
}
