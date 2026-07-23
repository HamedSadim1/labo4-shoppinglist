// Storage
export const STORAGE_KEYS = {
  SHOPPING_LIST: 'shoppingList',
} as const;

// Form limits
export const AMOUNT = {
  MIN: 1,
  MAX: 999,
} as const;

export const ITEM_NAME = {
  MAX_LENGTH: 100,
} as const;

// Defaults
export const DEFAULTS = {
  CATEGORY: 'General',
  AMOUNT: 1,
} as const;

// Animation — the only source of truth for list-render stagger timing.
// ItemList.tsx sets `--stagger-index` and `--stagger-step` per row;
// index.css multiplies them to derive `animation-delay`.
export const ANIMATION = {
  STAGGER_MAX: 6,
  STAGGER_STEP_S: 0.05,
} as const;

// FriendList
export const FRIEND_LIST = {
  INSERT_AT: 1,
} as const;
