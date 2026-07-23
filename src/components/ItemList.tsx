import { ShoppingItem } from '../types';
import Item from './Item';
import EditItem from './EditItem';

interface ItemListProps {
  items: ShoppingItem[];
  editingId: string | null;
  filter: string;
  searchQuery: string;
  onToggleComplete: (id: string) => void;
  onEdit: (id: string) => void;
  onSaveEdit: (id: string, name: string, amount: number, category: string) => void;
  onCancelEdit: () => void;
  onRemove: (id: string) => void;
}

function EmptyState({ filter, searchQuery }: { filter: string; searchQuery: string }) {
  let emoji: string;
  let title: string;
  let description: string;

  if (searchQuery) {
    emoji = '🔍';
    title = 'No results found';
    description = `No items match "${searchQuery}". Try a different search term.`;
  } else if (filter === 'completed') {
    emoji = '✅';
    title = 'No completed items';
    description = 'Items you mark as complete will appear here.';
  } else if (filter === 'pending') {
    emoji = '📝';
    title = 'Nothing pending!';
    description = 'All items are completed. Great job!';
  } else {
    emoji = '🛍️';
    title = 'Your list is empty';
    description = 'Add some items above to get started!';
  }

  return (
    <div className="glass rounded-2xl p-10 sm:p-14 text-center animate-scale-in">
      <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/5 border border-white/10 mb-5">
        <span className="text-4xl sm:text-5xl">{emoji}</span>
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-white/80 mb-2">{title}</h3>
      <p className="text-white/50 max-w-xs mx-auto">{description}</p>
    </div>
  );
}

export default function ItemList({
  items,
  editingId,
  filter,
  searchQuery,
  onToggleComplete,
  onEdit,
  onSaveEdit,
  onCancelEdit,
  onRemove,
}: ItemListProps) {
  if (items.length === 0) {
    return <EmptyState filter={filter} searchQuery={searchQuery} />;
  }

  return (
    <div className="space-y-2 sm:space-y-3">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`animate-fade-in-up stagger-${Math.min(index + 1, 6)}`}
          style={{ animationFillMode: 'both' }}
        >
          {editingId === item.id ? (
            <EditItem key={item.id} item={item} onSave={onSaveEdit} onCancel={onCancelEdit} />
          ) : (
            <Item
              item={item}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
              onRemove={onRemove}
            />
          )}
        </div>
      ))}
    </div>
  );
}
