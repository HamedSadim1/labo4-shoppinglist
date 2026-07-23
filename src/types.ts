export interface ShoppingItem {
  id: string;
  name: string;
  amount: number;
  category: string;
  completed: boolean;
}

export const categories = [
  'General',
  'Fruits',
  'Vegetables',
  'Dairy',
  'Meat',
  'Bakery',
  'Pantry',
] as const;

export type Category = (typeof categories)[number];
