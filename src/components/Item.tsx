import { ShoppingItem } from '../types';

interface ItemProps {
  item: ShoppingItem;
  onToggleComplete: (id: string) => void;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function Item({ item, onToggleComplete, onEdit, onRemove }: ItemProps) {
  return (
    <div
      className={`backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4 transition-all duration-200 shadow-xl ${
        item.completed ? 'opacity-75' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => onToggleComplete(item.id)}
            className="w-5 h-5 text-white bg-white/10 border-white/30 rounded focus:ring-white/50 focus:ring-2"
          />
          <div className={`flex-1 ${item.completed ? 'line-through text-white/60' : ''}`}>
            <span className="font-medium text-white drop-shadow-sm">{item.name}</span>
            <span className="ml-2 text-sm text-white/80 drop-shadow-sm">(x{item.amount})</span>
            <span className="ml-2 inline-block px-3 py-1 text-xs rounded-full bg-white/20 border border-white/30 text-white/90 backdrop-blur-sm">
              {item.category}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(item.id)}
            className="text-white/80 hover:text-white p-1 transition-colors duration-200"
            title="Edit"
          >
            ✏️
          </button>
          <button
            onClick={() => onRemove(item.id)}
            className="text-red-300 hover:text-red-200 p-1 transition-colors duration-200"
            title="Remove"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
