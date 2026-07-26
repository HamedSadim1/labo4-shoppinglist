import { Field, useFormikContext, type FieldProps } from 'formik';
import type { RefObject } from 'react';
import { ITEM_NAME } from '../../config';
import type { ShoppingItemFormValues } from '../../validation/schemas';

interface FormTextInputProps {
  inputRef: RefObject<HTMLInputElement | null>;
  placeholder: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  size?: 'default' | 'compact';
  showCharacterCount?: boolean;
}

/**
 * Single source of truth for the item-name text input used in both
 * AddItemForm and EditItem. It encapsulates:
 *   - Formik Field wiring
 *   - error + touched + submitCount logic for showing the error
 *   - consistent focus/error styling
 *   - optional character counter
 *
 * Keeping the layout, behaviour and validation-error rendering in one file
 * means AddItemForm and EditItem no longer duplicate the same logic and
 * Tailwind class string.
 */
export default function FormTextInput({
  inputRef,
  placeholder,
  onKeyDown,
  size = 'default',
  showCharacterCount = false,
}: FormTextInputProps) {
  const { errors, touched, values, submitCount } = useFormikContext<ShoppingItemFormValues>();
  const showNameError = Boolean(errors.name && (touched.name || submitCount > 0));

  const sizeClasses = size === 'compact' ? 'px-3 sm:px-4 py-2.5 sm:py-3' : 'px-4 py-3';

  return (
    <div className="flex-1 relative">
      <Field name="name">
        {({ field }: FieldProps<string, ShoppingItemFormValues>) => (
          <input
            {...field}
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            maxLength={ITEM_NAME.MAX_LENGTH}
            onKeyDown={onKeyDown}
            aria-invalid={showNameError}
            className={`w-full ${sizeClasses} bg-white/10 border rounded-xl text-white placeholder-white/40 focus:outline-none transition-all duration-200 backdrop-blur-sm ${
              showNameError
                ? 'border-rose-400/50 ring-2 ring-rose-400/15'
                : 'border-white/20 hover:border-white/30 focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/15'
            }`}
          />
        )}
      </Field>
      {showCharacterCount && values.name.length > 0 && !showNameError && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/30 pointer-events-none">
          {values.name.length}/{ITEM_NAME.MAX_LENGTH}
        </span>
      )}
      {showNameError && (
        <p className="mt-1.5 text-xs text-rose-300/90 font-medium animate-fade-in">{errors.name}</p>
      )}
    </div>
  );
}
