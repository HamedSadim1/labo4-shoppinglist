import { ShoppingItem } from '../types';
import { categoryMap } from '../types';

interface ItemProps {
  item: ShoppingItem;
  onToggleComplete: (id: string) => void;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function Item({ item, onToggleComplete, onEdit, onRemove }: ItemProps) {
  const cat = categoryMap[item.category];
  const categoryColor = cat?.color ?? 'text-white/80';
  const categoryBg = cat?.bg ?? 'bg-white/10';
  const categoryBorder = cat?.border ?? 'border-white/20';
  const categoryEmoji = cat?.emoji ?? '📦';

  return (
    <div
      className={`glass rounded-xl sm:rounded-2xl p-3 sm:p-4 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] group animate-slide-in ${
        item.completed ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Custom checkbox */}
          <button
            onClick={() => onToggleComplete(item.id)}
            className={`relative w-6 h-6 sm:w-7 sm:h-7 rounded-lg border-2 flex-shrink-0 transition-all duration-200 ${
              item.completed
                ? 'bg-green-400/30 border-green-400/60'
                : 'bg-white/10 border-white/30 hover:bg-white/20'
            }`}
            aria-label={item.completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {item.completed && (
              <svg
                className="absolute inset-0 w-full h-full text-green-300 p-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`font-semibold text-white truncate max-w-[200px] sm:max-w-[300px] transition-all duration-200 ${
                  item.completed ? 'line-through text-white/40' : ''
                }`}
              >
                {item.name}
              </span>
              <span className="text-white/50 text-sm whitespace-nowrap">×{item.amount}</span>
            </div>

            {/* Category badge */}
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryBg} ${categoryColor} ${categoryBorder} border mt-1 backdrop-blur-sm`}
            >
              <span>{categoryEmoji}</span>
              <span>{item.category}</span>
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
          <button
            onClick={() => onEdit(item.id)}
            className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200 active:scale-90"
            title="Edit item"
            aria-label="Edit item"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={() => onRemove(item.id)}
            className="p-2 rounded-lg text-red-400/60 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 active:scale-90"
            title="Remove item"
            aria-label="Remove item"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>

        {/* Always visible on mobile (no hover) */}
        <div className="flex items-center gap-1 sm:hidden">
          <button
            onClick={() => onEdit(item.id)}
            className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200"
            title="Edit item"
            aria-label="Edit item"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={() => onRemove(item.id)}
            className="p-2 rounded-lg text-red-400/60 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
            title="Remove item"
            aria-label="Remove item"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
