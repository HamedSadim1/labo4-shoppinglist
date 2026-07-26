import type { InputHTMLAttributes } from 'react';

/**
 * Plain reusable text input for non-Formik forms (lab/exercise components).
 * Centralises the repeated `bg-white/10 border border-white/20 rounded-lg ...`
 * styling found in FriendList, List and People.
 */
interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function TextInput({ className = '', ...rest }: TextInputProps) {
  return (
    <input
      className={`bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-all duration-200 ${className}`}
      {...rest}
    />
  );
}
