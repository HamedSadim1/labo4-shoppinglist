import { Formik, Form, Field, useFormikContext, type FieldProps } from 'formik';
import { useEffect, useRef, type RefObject } from 'react';
import { ShoppingItem } from '../types';
import AmountInput from './ui/AmountInput';
import CategorySelect from './ui/CategorySelect';
import { CheckIcon, XIcon } from './ui/icons';
import { useEnterSubmit } from '../hooks/useEnterSubmit';
import { ITEM_NAME } from '../config';
import { shoppingItemSchema, type ShoppingItemFormValues } from '../validation/schemas';

interface EditItemProps {
  item: ShoppingItem;
  onSave: (id: string, name: string, amount: number, category: string) => void;
  onCancel: () => void;
}

/**
 * Inner edit body. Lives inside <Formik> so it can read form state via
 * `useFormikContext` instead of the render-prop callback, giving us a real
 * React function-component context to call `useEnterSubmit` from.
 *
 * Escape is handled by the global `useKeyboardShortcuts` hook
 * (priority chain → cancelEdit); only Enter is wired here.
 */
function EditItemContents({
  inputRef,
  onCancel,
}: {
  inputRef: RefObject<HTMLInputElement | null>;
  onCancel: () => void;
}) {
  const { errors, touched, submitForm, submitCount } = useFormikContext<ShoppingItemFormValues>();
  const showNameError = Boolean(errors.name && (touched.name || submitCount > 0));
  const submitOnEnter = useEnterSubmit(submitForm);

  return (
    <Form className="space-y-3" noValidate>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <div className="flex-1">
          <Field name="name">
            {({ field }: FieldProps<string, ShoppingItemFormValues>) => (
              <input
                {...field}
                ref={inputRef}
                type="text"
                maxLength={ITEM_NAME.MAX_LENGTH}
                placeholder="Item name"
                onKeyDown={submitOnEnter}
                aria-invalid={showNameError}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/15 transition-all duration-200 backdrop-blur-sm ${
                  showNameError
                    ? 'border-rose-400/50 ring-2 ring-rose-400/15'
                    : 'border-white/20 focus:border-purple-400/50'
                }`}
              />
            )}
          </Field>
          {showNameError && (
            <p className="mt-1.5 text-xs text-rose-300/90 animate-fade-in">{errors.name}</p>
          )}
        </div>

        <div className="flex gap-2">
          <Field name="amount">
            {({ field, form }: FieldProps<number, ShoppingItemFormValues>) => (
              <AmountInput
                value={field.value}
                onChange={(value) => form.setFieldValue('amount', value)}
                onKeyDown={submitOnEnter}
              />
            )}
          </Field>
          <Field name="category">
            {({ field, form }: FieldProps<string, ShoppingItemFormValues>) => (
              <CategorySelect
                value={field.value}
                onChange={(value) => form.setFieldValue('category', value)}
                onKeyDown={submitOnEnter}
              />
            )}
          </Field>
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={() => submitForm()}
          className="flex items-center gap-1.5 bg-gradient-to-r from-purple-500/30 to-pink-500/30 hover:from-purple-500/40 hover:to-pink-500/40 border border-purple-400/30 text-purple-100 font-semibold px-4 sm:px-5 py-2 rounded-xl transition-all duration-200 backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/20 active:scale-[0.97] text-sm"
        >
          <CheckIcon className="w-4 h-4" />
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-1.5 bg-white/5 hover:bg-white/15 border border-white/15 text-white/60 hover:text-white font-semibold px-4 sm:px-5 py-2 rounded-xl transition-all duration-200 backdrop-blur-sm hover:shadow-lg active:scale-[0.97] text-sm"
        >
          <XIcon className="w-4 h-4" />
          Cancel
        </button>
      </div>
    </Form>
  );
}

export default function EditItem({ item, onSave, onCancel }: EditItemProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  return (
    <div className="glass rounded-xl sm:rounded-2xl p-3 sm:p-4 space-y-3 shadow-xl border border-purple-400/20 animate-scale-in">
      <Formik<ShoppingItemFormValues>
        initialValues={{
          name: item.name,
          amount: item.amount,
          category: item.category,
        }}
        validationSchema={shoppingItemSchema}
        onSubmit={(values) => {
          onSave(item.id, values.name.trim(), values.amount, values.category);
        }}
      >
        <EditItemContents inputRef={inputRef} onCancel={onCancel} />
      </Formik>
    </div>
  );
}
