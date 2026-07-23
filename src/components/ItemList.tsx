import { ShoppingItem } from '../types';
import Item from './Item';
import EditItem from './EditItem';

interface ItemListProps {
  items: ShoppingItem[];
  editingId: string | null;
  filter: string;
  onToggleComplete: (id: string) => void;
  onEdit: (id: string) => void;
  onSaveEdit: (id: string, name: string, amount: number, category: string) => void;
  onCancelEdit: () => void;
  onRemove: (id: string) => void;
}

export default function ItemList({
  items,
  editingId,
  filter,
  onToggleComplete,
  onEdit,
  onSaveEdit,
  onCancelEdit,
  onRemove,
}: ItemListProps) {
  if (items.length === 0) {
    return (
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 text-center shadow-xl">
        <p className="text-white/60 drop-shadow-md text-lg">
          {filter === 'all' ? 'No items yet. Add some!' : `No ${filter} items.`}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) =>
        editingId === item.id ? (
          <EditItem key={item.id} item={item} onSave={onSaveEdit} onCancel={onCancelEdit} />
        ) : (
          <Item
            key={item.id}
            item={item}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onRemove={onRemove}
          />
        ),
      )}
    </div>
  );
}
