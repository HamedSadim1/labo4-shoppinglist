import { useState, useRef, useEffect } from 'react';
import { ShoppingItem, categories } from '../types';

interface EditItemProps {
  item: ShoppingItem;
  onSave: (id: string, name: string, amount: number, category: string) => void;
  onCancel: () => void;
}

export default function EditItem({ item, onSave, onCancel }: EditItemProps) {
  const [name, setName] = useState(item.name);
  const [amount, setAmount] = useState(item.amount);
  const [category, setCategory] = useState(item.category);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  const handleSave = () => {
    if (name.trim()) {
      onSave(item.id, name.trim(), amount, category);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className="glass rounded-xl sm:rounded-2xl p-3 sm:p-4 space-y-3 shadow-xl border border-white/20 animate-scale-in">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border border-white/25 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/15 transition-all duration-200 backdrop-blur-sm"
            maxLength={100}
            placeholder="Item name"
          />
        </div>
        <div className="flex gap-2">
          <input
            type="number"
            min="1"
            max="999"
            value={amount}
            onChange={(e) => setAmount(Math.min(999, Math.max(1, parseInt(e.target.value) || 1)))}
            onKeyDown={handleKeyDown}
            className="w-16 sm:w-20 px-3 py-2.5 sm:py-3 bg-white/10 border border-white/25 rounded-xl text-white text-center focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/15 transition-all duration-200 backdrop-blur-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2.5 sm:py-3 bg-white/10 border border-white/25 rounded-xl text-white focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/15 transition-all duration-200 backdrop-blur-sm cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id} className="bg-gray-800 text-white">
                {cat.emoji} {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 bg-green-500/20 hover:bg-green-500/30 border border-green-400/30 text-green-200 font-semibold px-4 sm:px-5 py-2 rounded-xl transition-all duration-200 backdrop-blur-sm hover:shadow-lg active:scale-[0.97] text-sm"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Save
        </button>
        <button
          onClick={onCancel}
          className="flex items-center gap-1.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white/70 hover:text-white font-semibold px-4 sm:px-5 py-2 rounded-xl transition-all duration-200 backdrop-blur-sm hover:shadow-lg active:scale-[0.97] text-sm"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Cancel
        </button>
      </div>
    </div>
  );
}
