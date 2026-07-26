import { TrashIcon } from './ui/icons';

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
  const isComplete = totalItems > 0 && completedItems === totalItems;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
      <div className="w-full sm:flex-1">
        <div className="flex items-center gap-3 mb-1.5">
          <div
            className={`flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm ${
              isComplete ? 'animate-celebrate-progress' : ''
            }`}
          >
            <div
              className="h-full bg-gradient-to-r from-purple-400/70 to-pink-400/70 rounded-full transition-all duration-700 ease-out shadow-lg shadow-purple-500/20"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-white/80 text-sm font-semibold tabular-nums min-w-[3rem] text-right">
            {progress}%
          </span>
        </div>
        <p className="text-white/50 text-xs sm:text-sm flex items-center gap-2">
          {isComplete ? (
            <>
              <span
                key={isComplete ? 'celebrate' : 'normal'}
                className="inline-block text-base animate-celebrate-pop"
                aria-hidden
              >
                🎉
              </span>
              <span className="text-emerald-200 font-semibold">All done!</span>
              <span className="text-white/40">—</span>
              <span className="text-white/60">shopping complete.</span>
            </>
          ) : (
            <>
              <span className="text-white/90 font-semibold">{completedItems}</span>
              <span className="text-white/40"> of </span>
              <span className="text-white/90 font-semibold">{totalItems}</span>
              <span className="text-white/40"> items completed</span>
            </>
          )}
        </p>
      </div>

      {completedItems > 0 && (
        <button
          onClick={onClearCompleted}
          className="flex items-center gap-1.5 bg-white/5 hover:bg-red-500/20 border border-white/15 hover:border-red-400/30 text-white/50 hover:text-red-300 text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200 backdrop-blur-sm hover:shadow-lg active:scale-[0.97] whitespace-nowrap group"
        >
          <TrashIcon className="w-4 h-4 transition-all duration-200 group-hover:scale-110" />
          <span className="transition-all duration-200">Clear done ({completedItems})</span>
        </button>
      )}
    </div>
  );
}
