import { AMOUNT } from '../../config';

interface AmountInputProps {
  value: number;
  onChange: (value: number) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  className?: string;
}

export default function AmountInput({
  value,
  onChange,
  onKeyDown,
  className = '',
}: AmountInputProps) {
  const clamp = (val: number) => Math.min(AMOUNT.MAX, Math.max(AMOUNT.MIN, val));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(clamp(parseInt(e.target.value) || 1));
  };

  return (
    <div className="relative">
      <input
        type="number"
        min={AMOUNT.MIN}
        max={AMOUNT.MAX}
        value={value}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        className={`w-16 sm:w-20 px-3 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-xl text-white text-center focus:outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/15 transition-all duration-200 backdrop-blur-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${className}`}
      />
      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/40 text-sm pointer-events-none">
        ×
      </span>
    </div>
  );
}
