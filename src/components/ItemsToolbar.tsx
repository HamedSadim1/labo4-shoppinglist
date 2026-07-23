import type { RefObject } from 'react';
import { ShoppingListFilter, SortOption } from '../types';
import Card from './ui/Card';
import { SearchIcon, XIcon } from './ui/icons';
import ItemFilters from './ItemFilters';
import ItemStats from './ItemStats';

interface ItemsToolbarProps {
  totalItems: number;
  completedItems: number;
  onClearCompleted: () => void;
  searchRef: RefObject<HTMLInputElement | null>;
  searchQuery: string;
  onSearchChange: (next: string) => void;
  sortBy: SortOption;
  onSortChange: (next: SortOption) => void;
  filter: ShoppingListFilter | string;
  onFilterChange: (next: string) => void;
}

/**
 * The "stats + search + sort + filters" card that sits between the add-item
 * form and the rendered list. Pure presentation — all state lives in the
 * consumer (e.g. `useShoppingItems`).
 */
export default function ItemsToolbar({
  totalItems,
  completedItems,
  onClearCompleted,
  searchRef,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  filter,
  onFilterChange,
}: ItemsToolbarProps) {
  return (
    <Card variant="strong" padding="p-4 sm:p-6">
      <ItemStats
        totalItems={totalItems}
        completedItems={completedItems}
        onClearCompleted={onClearCompleted}
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            ref={searchRef}
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-16 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition-all duration-200 backdrop-blur-sm"
          />
          {!searchQuery && (
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-[10px] text-white/40 border border-white/10 bg-white/5 font-mono pointer-events-none">
              /
            </kbd>
          )}
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              aria-label="Clear search"
            >
              <XIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white/70 text-sm focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition-all duration-200 backdrop-blur-sm cursor-pointer"
        >
          <option value="default" className="bg-gray-800 text-white">
            Default order
          </option>
          <option value="name" className="bg-gray-800 text-white">
            Sort by name
          </option>
          <option value="category" className="bg-gray-800 text-white">
            Sort by category
          </option>
          <option value="created" className="bg-gray-800 text-white">
            Newest first
          </option>
        </select>
      </div>

      <ItemFilters filter={filter} onFilterChange={onFilterChange} />
    </Card>
  );
}
