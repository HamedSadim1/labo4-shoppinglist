import * as Yup from 'yup';
import { AMOUNT, ITEM_NAME } from '../config';

export const shoppingItemSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required('Please enter an item name')
    .max(ITEM_NAME.MAX_LENGTH, `Keep it under ${ITEM_NAME.MAX_LENGTH} characters`),
  amount: Yup.number()
    .typeError('Amount must be a number')
    .integer('Amount must be a whole number')
    .min(AMOUNT.MIN, `Minimum amount is ${AMOUNT.MIN}`)
    .max(AMOUNT.MAX, `Maximum amount is ${AMOUNT.MAX}`)
    .required('Amount is required'),
  category: Yup.string().required('Please pick a category'),
});

export type ShoppingItemFormValues = Yup.InferType<typeof shoppingItemSchema>;
