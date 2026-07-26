import * as Yup from 'yup';
import { AMOUNT, FORM_ERRORS, ITEM_NAME } from '../config';

export const shoppingItemSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required(FORM_ERRORS.NAME_REQUIRED)
    .max(ITEM_NAME.MAX_LENGTH, FORM_ERRORS.NAME_TOO_LONG(ITEM_NAME.MAX_LENGTH)),
  amount: Yup.number()
    .typeError(FORM_ERRORS.AMOUNT_TYPE)
    .integer(FORM_ERRORS.AMOUNT_INTEGER)
    .min(AMOUNT.MIN, FORM_ERRORS.AMOUNT_MIN(AMOUNT.MIN))
    .max(AMOUNT.MAX, FORM_ERRORS.AMOUNT_MAX(AMOUNT.MAX))
    .required(FORM_ERRORS.AMOUNT_REQUIRED),
  category: Yup.string().required(FORM_ERRORS.CATEGORY_REQUIRED),
});

export type ShoppingItemFormValues = Yup.InferType<typeof shoppingItemSchema>;
