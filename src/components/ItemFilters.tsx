import { categories, ShoppingListFilter } from '../types';

interface ItemFiltersProps {
  filter: ShoppingListFilter | string;
  onFilterChange: (filter: string) => void;
}

const filterOptions: { id: ShoppingListFilter | string; label: string; icon: string }[] = [
  { id: 'all', label: 'All', icon: '📋' },
  { id: 'pending', label: 'Pending', icon: '⏳' },
  { id: 'completed', label: 'Done', icon: '✅' },
];

export default function ItemFilters({ filter, onFilterChange }: ItemFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {filterOptions.map((opt) => (
        <button
          key={opt.id}
          onClick={() => onFilterChange(opt.id)}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 backdrop-blur-sm flex items-center gap-1.5 ${
            filter === opt.id
              ? 'bg-white/25 border border-white/40 text-white shadow-lg'
              : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white/80 hover:border-white/20'
          }`}
        >
          <span>{opt.icon}</span>
          <span>{opt.label}</span>
        </button>
      ))}

      <span className="w-px h-6 bg-white/10 mx-1 hidden sm:block" />

      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onFilterChange(cat.id)}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 backdrop-blur-sm flex items-center gap-1.5 ${
            filter === cat.id
              ? `${cat.bg} ${cat.color} border ${cat.border} shadow-lg`
              : 'bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white/70 hover:border-white/20'
          }`}
        >
          <span>{cat.emoji}</span>
          <span className="hidden sm:inline">{cat.label}</span>
        </button>
      ))}
    </div>
  );
}
