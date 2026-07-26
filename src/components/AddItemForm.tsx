import { Formik, Form, Field, useFormikContext, type FieldProps } from 'formik';
import { useRef, type RefObject } from 'react';
import { ShoppingItem } from '../types';
import AmountInput from './ui/AmountInput';
import Button from './ui/Button';
import Card from './ui/Card';
import CategorySelect from './ui/CategorySelect';
import FormTextInput from './ui/FormTextInput';
import { useEnterSubmit } from '../hooks/useEnterSubmit';
import { useToast } from '../hooks/useToast';
import { DEFAULTS } from '../config';
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
  const { submitForm } = useFormikContext<ShoppingItemFormValues>();
  const submitOnEnter = useEnterSubmit(submitForm);

  return (
    <Form className="space-y-3" noValidate>
      <div className="flex flex-col sm:flex-row gap-3">
        <FormTextInput
          inputRef={inputRef}
          placeholder="What do you need?"
          onKeyDown={submitOnEnter}
          showCharacterCount
        />

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
        <Button onClick={() => submitForm()} className="w-full sm:w-auto">
          <span>Add to List</span>
          <span className="group-hover:translate-x-0.5 transition-transform">→</span>
        </Button>
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
        <span className="text-2xl" aria-hidden="true">
          ✨
        </span>
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
