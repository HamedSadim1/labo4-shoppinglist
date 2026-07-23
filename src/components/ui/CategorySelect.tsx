import { categories } from '../../types';

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  className?: string;
}

export default function CategorySelect({
  value,
  onChange,
  onKeyDown,
  className = '',
}: CategorySelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      className={`px-3 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/15 transition-all duration-200 backdrop-blur-sm cursor-pointer ${className}`}
    >
      {categories.map((cat) => (
        <option key={cat.id} value={cat.id} className="bg-gray-800 text-white">
          {cat.emoji} {cat.label}
        </option>
      ))}
    </select>
  );
}
