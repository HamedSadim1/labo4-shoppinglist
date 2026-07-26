import { Formik, Form, Field, useFormikContext, type FieldProps } from 'formik';
import { useEffect, useRef, type RefObject } from 'react';
import { ShoppingItem } from '../types';
import AmountInput from './ui/AmountInput';
import Button from './ui/Button';
import Card from './ui/Card';
import CategorySelect from './ui/CategorySelect';
import FormTextInput from './ui/FormTextInput';
import { CheckIcon, XIcon } from './ui/icons';
import { useEnterSubmit } from '../hooks/useEnterSubmit';
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
  const { submitForm } = useFormikContext<ShoppingItemFormValues>();
  const submitOnEnter = useEnterSubmit(submitForm);

  return (
    <Form className="space-y-3" noValidate>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <FormTextInput
          inputRef={inputRef}
          placeholder="Item name"
          onKeyDown={submitOnEnter}
          size="compact"
        />

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
        <Button onClick={() => submitForm()} size="sm">
          <CheckIcon className="w-4 h-4" />
          Save
        </Button>
        <Button onClick={onCancel} variant="secondary" size="sm">
          <XIcon className="w-4 h-4" />
          Cancel
        </Button>
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
    <Card
      variant="soft"
      padding="p-3 sm:p-4"
      rounding="rounded-xl sm:rounded-2xl"
      animation="scale-in"
      shadow={false}
      className="space-y-3 shadow-xl border-purple-400/20"
    >
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
    </Card>
  );
}
