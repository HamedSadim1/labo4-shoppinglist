import { useState, useRef } from 'react';
import { generate } from 'shortid';
import { ShoppingItem } from '../types';
import AmountInput from './ui/AmountInput';
import CategorySelect from './ui/CategorySelect';
import { DEFAULTS, INPUT } from '../config';

interface AddItemFormProps {
  onAddItem: (item: ShoppingItem) => void;
}

export default function AddItemForm({ onAddItem }: AddItemFormProps) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState<number>(DEFAULTS.AMOUNT);
  const [category, setCategory] = useState<string>(DEFAULTS.CATEGORY);
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
    setAmount(DEFAULTS.AMOUNT);
    setCategory(DEFAULTS.CATEGORY);
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
                  ? 'border-purple-400/50 ring-2 ring-purple-400/15'
                  : 'border-white/20 hover:border-white/30'
              }`}
              maxLength={INPUT.MAX_LENGTH}
            />
            {name.length > 0 && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/30">
                {name.length}/{INPUT.MAX_LENGTH}
              </span>
            )}
          </div>

          <div className="flex gap-3">
            <AmountInput value={amount} onChange={setAmount} />
            <CategorySelect value={category} onChange={setCategory} />
          </div>
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto bg-gradient-to-r from-purple-500/30 to-pink-500/30 hover:from-purple-500/40 hover:to-pink-500/40 border border-purple-400/30 text-purple-100 font-semibold py-3 px-8 rounded-xl transition-all duration-200 backdrop-blur-sm hover:shadow-xl hover:shadow-purple-500/20 active:scale-[0.98] flex items-center justify-center gap-2 group"
        >
          <span>Add to List</span>
          <span className="group-hover:translate-x-0.5 transition-transform">→</span>
        </button>
      </form>
    </div>
  );
}
