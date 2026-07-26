import { ShoppingItem, getCategoryInfo } from '../types';
import Card from './ui/Card';
import IconButton from './ui/IconButton';
import { CheckIcon, EditIcon, TrashIcon } from './ui/icons';

interface ItemProps {
  item: ShoppingItem;
  onToggleComplete: (id: string) => void;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function Item({ item, onToggleComplete, onEdit, onRemove }: ItemProps) {
  const cat = getCategoryInfo(item.category);

  return (
    <Card
      variant="soft"
      padding="p-3 sm:p-4"
      rounding="rounded-xl sm:rounded-2xl"
      animation="slide-in"
      shadow={false}
      interactive
      className={item.completed ? 'opacity-60' : ''}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            onClick={() => onToggleComplete(item.id)}
            className={`relative w-6 h-6 sm:w-7 sm:h-7 rounded-lg border-2 flex-shrink-0 transition-all duration-200 active:scale-90 ${
              item.completed
                ? 'bg-purple-400/40 border-purple-400/60 shadow-lg shadow-purple-400/20'
                : 'bg-white/10 border-white/30 hover:bg-white/20 hover:border-white/50'
            }`}
            aria-label={item.completed ? 'Mark as incomplete' : 'Mark as complete'}
            aria-pressed={item.completed}
          >
            {item.completed && (
              <CheckIcon
                strokeWidth={3}
                pathLength={1}
                pathClassName="animate-checkmark-draw"
                className="absolute inset-0 w-full h-full text-purple-100 p-1"
              />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`font-semibold text-white truncate max-w-[180px] sm:max-w-[280px] transition-all duration-200 ${
                  item.completed ? 'line-through text-white/40' : ''
                }`}
              >
                {item.name}
              </span>
              <span className="text-white/40 text-sm whitespace-nowrap font-medium">
                ×{item.amount}
              </span>
            </div>
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${cat.bg} ${cat.color} ${cat.border} border mt-1 backdrop-blur-sm`}
            >
              <span>{cat.emoji}</span>
              <span>{item.category}</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-0.5 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200">
          <IconButton onClick={() => onEdit(item.id)} label="Edit item" title="Edit item">
            <EditIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </IconButton>
          <IconButton
            onClick={() => onRemove(item.id)}
            label="Remove item"
            title="Remove item"
            variant="danger"
          >
            <TrashIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </IconButton>
        </div>
      </div>
    </Card>
  );
}
