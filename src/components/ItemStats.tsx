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
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
      <div className="text-white/80 drop-shadow-md mb-2 sm:mb-0">
        {completedItems} of {totalItems} items completed
      </div>
      {completedItems > 0 && (
        <button
          onClick={onClearCompleted}
          className="bg-red-500/20 hover:bg-red-500/30 border border-red-400/40 text-white font-semibold px-4 py-2 rounded-xl transition-all duration-200 backdrop-blur-sm hover:shadow-lg"
        >
          Clear Completed
        </button>
      )}
    </div>
  );
}
