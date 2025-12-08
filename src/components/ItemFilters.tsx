import { categories } from "../types";

interface ItemFiltersProps {
  filter: string;
  onFilterChange: (filter: string) => void;
}

export default function ItemFilters({
  filter,
  onFilterChange,
}: ItemFiltersProps) {
  const allFilters = ["all", "pending", "completed", ...categories];

  return (
    <div className="flex flex-wrap gap-2">
      {allFilters.map((f) => (
        <button
          key={f}
          onClick={() => onFilterChange(f)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 backdrop-blur-sm ${
            filter === f
              ? "bg-white/30 border border-white/50 text-white shadow-lg"
              : "bg-white/10 border border-white/20 text-white/80 hover:bg-white/20 hover:border-white/30"
          }`}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}
