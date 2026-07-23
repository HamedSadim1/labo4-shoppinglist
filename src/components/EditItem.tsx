import { useState } from 'react';
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

  const handleSave = () => {
    if (name.trim()) {
      onSave(item.id, name.trim(), amount, category);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4 space-y-3 shadow-xl">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={handleKeyPress}
        className="w-full px-3 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-white/50 focus:outline-none backdrop-blur-sm"
        autoFocus
      />
      <div className="flex space-x-2">
        <input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value) || 1)}
          onKeyDown={handleKeyPress}
          className="flex-1 px-3 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-white/50 focus:outline-none backdrop-blur-sm"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="flex-1 px-3 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-white/50 focus:border-white/50 focus:outline-none backdrop-blur-sm"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat} className="bg-gray-800 text-white">
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={handleSave}
          className="bg-green-500/20 hover:bg-green-500/30 border border-green-400/40 text-white font-semibold px-4 py-2 rounded-xl transition-all duration-200 backdrop-blur-sm hover:shadow-lg"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-500/20 hover:bg-gray-500/30 border border-gray-400/40 text-white font-semibold px-4 py-2 rounded-xl transition-all duration-200 backdrop-blur-sm hover:shadow-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
