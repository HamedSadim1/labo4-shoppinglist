interface ItemStatsProps {
  totalItems: number;
  completedItems: number;
  onClearCompleted: () => void;
}

export default function ItemStats({
  totalItems,
  completedItems,
  onClearCompleted,
}: ItemStatsProps) {
  const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
      <div className="w-full sm:flex-1">
        {/* Progress bar */}
        <div className="flex items-center gap-3 mb-1.5">
          <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-gradient-to-r from-purple-400/70 to-pink-400/70 rounded-full transition-all duration-700 ease-out shadow-lg shadow-purple-500/20"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-white/80 text-sm font-semibold tabular-nums min-w-[3rem] text-right">
            {progress}%
          </span>
        </div>
        <p className="text-white/50 text-xs sm:text-sm">
          <span className="text-white/90 font-semibold">{completedItems}</span>
          <span className="text-white/40"> of </span>
          <span className="text-white/90 font-semibold">{totalItems}</span>
          <span className="text-white/40"> items completed</span>
        </p>
      </div>

      {completedItems > 0 && (
        <button
          onClick={onClearCompleted}
          className="flex items-center gap-1.5 bg-white/5 hover:bg-red-500/20 border border-white/15 hover:border-red-400/30 text-white/50 hover:text-red-300 text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200 backdrop-blur-sm hover:shadow-lg active:scale-[0.97] whitespace-nowrap group"
        >
          <svg
            className="w-4 h-4 transition-all duration-200 group-hover:scale-110"
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
          <span className="transition-all duration-200">Clear done ({completedItems})</span>
        </button>
      )}
    </div>
  );
}
