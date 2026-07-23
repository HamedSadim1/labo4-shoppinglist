import { useState } from 'react';
import { generate } from 'shortid';
import { ShoppingItem, categories } from '../types';

interface AddItemFormProps {
  onAddItem: (item: ShoppingItem) => void;
}

export default function AddItemForm({ onAddItem }: AddItemFormProps) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(1);
  const [category, setCategory] = useState('General');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newItem: ShoppingItem = {
      id: generate(),
      name: name.trim(),
      amount,
      category,
      completed: false,
    };

    onAddItem(newItem);
    setName('');
    setAmount(1);
    setCategory('General');
  };

  return (
    <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl p-6 mb-6 shadow-2xl">
      <h2 className="text-2xl font-semibold mb-4 text-white drop-shadow-lg">Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Item name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-white/50 focus:outline-none backdrop-blur-sm"
            required
          />
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value) || 1)}
            className="px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-white/50 focus:outline-none backdrop-blur-sm"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-white/50 focus:border-white/50 focus:outline-none backdrop-blur-sm"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-gray-800 text-white">
                {cat}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-white/20 hover:bg-white/30 border border-white/40 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 backdrop-blur-sm hover:shadow-lg"
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
}
