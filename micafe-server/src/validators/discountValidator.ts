import { body, param } from 'express-validator';

export const discountValidationRules = [
  body('code')
    .notEmpty()
    .withMessage('El código es requerido')
    .isAlphanumeric()
    .withMessage('El código debe contener solo letras y números'),
  body('description').notEmpty().withMessage('La descripción es requerida'),
  body('discountType')
    .notEmpty()
    .withMessage('El tipo de descuento es requerido')
    .isIn(['fixedAmount', 'percentage'])
    .withMessage('El tipo de descuento debe ser "fixedAmount" o "percentage"'),
  body('value')
    .notEmpty()
    .withMessage('El valor es requerido')
    .isNumeric()
    .withMessage('El valor debe ser un número'),
  body('expirationDate')
    .notEmpty()
    .withMessage('La fecha de vencimiento es requerida')
];
export const discountValidationCode = [
  param('code').notEmpty().withMessage('El código es requerido')
];
