// ---------------------------------------------------------------------------
// Storage
// ---------------------------------------------------------------------------
export const STORAGE_KEYS = {
  SHOPPING_LIST: 'shoppingList',
} as const;

// ---------------------------------------------------------------------------
// Form limits
// ---------------------------------------------------------------------------
export const AMOUNT = {
  MIN: 1,
  MAX: 999,
} as const;

export const ITEM_NAME = {
  MAX_LENGTH: 100,
} as const;

// ---------------------------------------------------------------------------
// Form defaults
// ---------------------------------------------------------------------------
export const DEFAULTS = {
  CATEGORY: 'General',
  // Mirrors AMOUNT.MIN by reference rather than re-typing the literal — keeps
  // a single edit point in case the minimum ever shifts.
  AMOUNT: AMOUNT.MIN,
} as const;

// ---------------------------------------------------------------------------
// Form validation messages
// ---------------------------------------------------------------------------
export const FORM_ERRORS = {
  NAME_REQUIRED: 'Please enter an item name',
  NAME_TOO_LONG: (max: number) => `Keep it under ${max} characters`,
  AMOUNT_TYPE: 'Amount must be a number',
  AMOUNT_INTEGER: 'Amount must be a whole number',
  AMOUNT_MIN: (min: number) => `Minimum amount is ${min}`,
  AMOUNT_MAX: (max: number) => `Maximum amount is ${max}`,
  AMOUNT_REQUIRED: 'Amount is required',
  CATEGORY_REQUIRED: 'Please pick a category',
} as const;

// ---------------------------------------------------------------------------
// Toast
// ---------------------------------------------------------------------------
export const TOAST = {
  // Auto-dismiss timing in milliseconds.
  AUTO_DISMISS_MS: 3200,
  // Cap on simultaneous toasts; older entries are evicted when exceeded.
  MAX_TOASTS: 4,
} as const;

// ---------------------------------------------------------------------------
// Animation
//
// STAGGER_* : the only source of truth for list-render stagger timing.
//             ItemList.tsx sets --stagger-index and --stagger-step per row;
//             index.css multiplies them into `animation-delay`.
//
// HIGHLIGHT_PULSE_MS : how long a freshly added item pulses before the
//                      highlight-id state is cleared in useShoppingItems.
// ---------------------------------------------------------------------------
export const ANIMATION = {
  STAGGER_MAX: 6,
  STAGGER_STEP_S: 0.05,
  HIGHLIGHT_PULSE_MS: 1500,
} as const;

// ---------------------------------------------------------------------------
// Keyboard shortcuts
// ---------------------------------------------------------------------------
export const KEYBOARD = {
  SEARCH_FOCUS_KEY: '/',
  SEARCH_FOCUS_MODIFIER_KEY: 'k',
} as const;

// ---------------------------------------------------------------------------
// Date formatting
// ---------------------------------------------------------------------------
export const DATE = {
  LOCALE: 'nl-NL',
} as const;

// ---------------------------------------------------------------------------
// Filter options (used by ItemFilters for the "all / pending / completed"
// pills next to the category chips).
// ---------------------------------------------------------------------------
export const FILTER_OPTIONS = [
  { id: 'all', label: 'All', icon: '📋' },
  { id: 'pending', label: 'Pending', icon: '⏳' },
  { id: 'completed', label: 'Done', icon: '✅' },
] as const;

// ---------------------------------------------------------------------------
// FriendList
// ---------------------------------------------------------------------------
export const FRIEND_LIST = {
  INSERT_AT: 1,
} as const;
