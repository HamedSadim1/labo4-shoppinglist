import { useState, useRef } from 'react';
import { generate } from 'shortid';
import { ShoppingItem, categories } from '../types';

interface AddItemFormProps {
  onAddItem: (item: ShoppingItem) => void;
}

export default function AddItemForm({ onAddItem }: AddItemFormProps) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(1);
  const [category, setCategory] = useState('General');
  const [isFocused, setIsFocused] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setShakeKey((k) => k + 1);
      inputRef.current?.focus();
      return;
    }

    const newItem: ShoppingItem = {
      id: generate(),
      name: name.trim(),
      amount,
      category,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    onAddItem(newItem);
    setName('');
    setAmount(1);
    setCategory('General');
    inputRef.current?.focus();
  };

  return (
    <div className="glass-strong rounded-2xl p-5 sm:p-6 mb-6 shadow-2xl animate-fade-in-up">
      <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
        <span className="text-2xl">✨</span>
        <span>Add New Item</span>
      </h2>
      <form
        onSubmit={handleSubmit}
        key={shakeKey}
        className={`space-y-3 ${shakeKey > 0 ? 'animate-shake' : ''}`}
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="What do you need?"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/40 focus:outline-none transition-all duration-200 backdrop-blur-sm ${
                isFocused
                  ? 'border-white/60 ring-2 ring-white/20'
                  : 'border-white/20 hover:border-white/30'
              }`}
              maxLength={100}
            />
            {name.length > 0 && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/30">
                {name.length}/100
              </span>
            )}
          </div>

          <div className="flex gap-3">
            <div className="relative w-24">
              <input
                type="number"
                min="1"
                max="999"
                value={amount}
                onChange={(e) =>
                  setAmount(Math.min(999, Math.max(1, parseInt(e.target.value) || 1)))
                }
                className="w-full px-3 py-3 bg-white/10 border border-white/20 hover:border-white/30 rounded-xl text-white text-center focus:outline-none focus:border-white/60 focus:ring-2 focus:ring-white/20 transition-all duration-200 backdrop-blur-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm">
                ×
              </span>
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-3 bg-white/10 border border-white/20 hover:border-white/30 rounded-xl text-white focus:outline-none focus:border-white/60 focus:ring-2 focus:ring-white/20 transition-all duration-200 backdrop-blur-sm cursor-pointer min-w-[120px]"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id} className="bg-gray-800 text-white">
                  {cat.emoji} {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 border border-white/30 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 backdrop-blur-sm hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2 group"
        >
          <span>Add to List</span>
          <span className="group-hover:translate-x-0.5 transition-transform">→</span>
        </button>
      </form>
    </div>
  );
}
