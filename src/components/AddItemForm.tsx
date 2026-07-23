import { Formik, Form, Field, useFormikContext, type FieldProps } from 'formik';
import { useRef, type RefObject } from 'react';
import { ShoppingItem } from '../types';
import AmountInput from './ui/AmountInput';
import Card from './ui/Card';
import CategorySelect from './ui/CategorySelect';
import { useEnterSubmit } from '../hooks/useEnterSubmit';
import { useToast } from '../hooks/useToast';
import { DEFAULTS, ITEM_NAME } from '../config';
import { shoppingItemSchema, type ShoppingItemFormValues } from '../validation/schemas';

interface AddItemFormProps {
  onAddItem: (item: ShoppingItem) => void;
}

const initialValues: ShoppingItemFormValues = {
  name: '',
  amount: DEFAULTS.AMOUNT,
  category: DEFAULTS.CATEGORY,
};

/**
 * Inner form body. Lives inside <Formik> so it can read form state via
 * `useFormikContext` instead of the render-prop callback, which gives us
 * a real React function-component context to call `useEnterSubmit` from
 * (otherwise the rules-of-hooks lint complains).
 */
function AddItemFormContents({ inputRef }: { inputRef: RefObject<HTMLInputElement | null> }) {
  const { errors, touched, values, submitForm, submitCount } =
    useFormikContext<ShoppingItemFormValues>();
  const showNameError = Boolean(errors.name && (touched.name || submitCount > 0));
  const submitOnEnter = useEnterSubmit(submitForm);

  return (
    <Form className="space-y-3" noValidate>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Field name="name">
            {({ field }: FieldProps<string, ShoppingItemFormValues>) => (
              <input
                {...field}
                ref={inputRef}
                type="text"
                placeholder="What do you need?"
                maxLength={ITEM_NAME.MAX_LENGTH}
                onKeyDown={submitOnEnter}
                aria-invalid={showNameError}
                className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/40 focus:outline-none transition-all duration-200 backdrop-blur-sm ${
                  showNameError
                    ? 'border-rose-400/50 ring-2 ring-rose-400/15'
                    : 'border-white/20 hover:border-white/30 focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/15'
                }`}
              />
            )}
          </Field>
          {values.name.length > 0 && !showNameError && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/30 pointer-events-none">
              {values.name.length}/{ITEM_NAME.MAX_LENGTH}
            </span>
          )}
          {showNameError && (
            <p className="mt-1.5 text-xs text-rose-300/90 font-medium animate-fade-in">
              {errors.name}
            </p>
          )}
        </div>

        <div className="flex gap-3">
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

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="text-white/30 text-xs hidden sm:block">
          Press{' '}
          <kbd className="px-1.5 py-0.5 rounded border border-white/15 bg-white/5 font-mono text-[10px]">
            Enter
          </kbd>{' '}
          to add
        </p>
        <button
          type="button"
          onClick={() => submitForm()}
          className="w-full sm:w-auto bg-gradient-to-r from-purple-500/30 to-pink-500/30 hover:from-purple-500/40 hover:to-pink-500/40 border border-purple-400/30 text-purple-100 font-semibold py-3 px-8 rounded-xl transition-all duration-200 backdrop-blur-sm hover:shadow-xl hover:shadow-purple-500/20 active:scale-[0.98] flex items-center justify-center gap-2 group"
        >
          <span>Add to List</span>
          <span className="group-hover:translate-x-0.5 transition-transform">→</span>
        </button>
      </div>
    </Form>
  );
}

export default function AddItemForm({ onAddItem }: AddItemFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { push } = useToast();

  return (
    <Card variant="strong" padding="p-5 sm:p-6" className="mb-6">
      <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
        <span className="text-2xl">✨</span>
        <span>Add New Item</span>
      </h2>
      <Formik<ShoppingItemFormValues>
        initialValues={initialValues}
        validationSchema={shoppingItemSchema}
        onSubmit={(values, { resetForm }) => {
          const trimmed = values.name.trim();
          const newItem: ShoppingItem = {
            id: crypto.randomUUID(),
            name: trimmed,
            amount: values.amount,
            category: values.category,
            completed: false,
            createdAt: new Date().toISOString(),
          };
          onAddItem(newItem);
          push(`Added "${trimmed}" to your list`, 'success');
          resetForm();
          inputRef.current?.focus();
        }}
      >
        <AddItemFormContents inputRef={inputRef} />
      </Formik>
    </Card>
  );
}
