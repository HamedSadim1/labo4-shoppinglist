export interface ShoppingItem {
  id: string;
  name: string;
  amount: number;
  category: string;
  completed: boolean;
  createdAt?: string;
}

export interface CategoryInfo {
  id: string;
  label: string;
  emoji: string;
  color: string;
  bg: string;
  border: string;
}

export const categories: CategoryInfo[] = [
  {
    id: 'General',
    label: 'General',
    emoji: '📦',
    color: 'text-blue-200',
    bg: 'bg-blue-500/20',
    border: 'border-blue-400/30',
  },
  {
    id: 'Fruits',
    label: 'Fruits',
    emoji: '🍎',
    color: 'text-red-200',
    bg: 'bg-red-500/20',
    border: 'border-red-400/30',
  },
  {
    id: 'Vegetables',
    label: 'Vegetables',
    emoji: '🥦',
    color: 'text-green-200',
    bg: 'bg-green-500/20',
    border: 'border-green-400/30',
  },
  {
    id: 'Dairy',
    label: 'Dairy',
    emoji: '🥛',
    color: 'text-yellow-200',
    bg: 'bg-yellow-500/20',
    border: 'border-yellow-400/30',
  },
  {
    id: 'Meat',
    label: 'Meat',
    emoji: '🥩',
    color: 'text-orange-200',
    bg: 'bg-orange-500/20',
    border: 'border-orange-400/30',
  },
  {
    id: 'Bakery',
    label: 'Bakery',
    emoji: '🥐',
    color: 'text-amber-200',
    bg: 'bg-amber-500/20',
    border: 'border-amber-400/30',
  },
  {
    id: 'Pantry',
    label: 'Pantry',
    emoji: '🥫',
    color: 'text-indigo-200',
    bg: 'bg-indigo-500/20',
    border: 'border-indigo-400/30',
  },
];

export const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c])) as Record<
  string,
  CategoryInfo
>;

export type ShoppingListFilter = 'all' | 'pending' | 'completed';

export type SortOption = 'default' | 'name' | 'category' | 'created';
