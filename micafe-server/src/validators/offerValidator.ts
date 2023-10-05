import { body } from 'express-validator';

export const offerValidationRules = [
  body('productId')
    .notEmpty()
    .withMessage('El ID del producto es requerido')
    .isMongoId()
    .withMessage('El ID del producto no es válido'),
  body('isPercentage')
    .notEmpty()
    .withMessage('El campo isPercentage es requerido')
    .isBoolean()
    .withMessage('El campo isPercentage debe ser un booleano'),
  body('value')
    .notEmpty()
    .withMessage('El campo value es requerido')
    .isNumeric()
    .withMessage('El valor debe ser un número'),
  body('startSale')
    .notEmpty()
    .withMessage('La fecha de inicio de la oferta es requerida'),
  body('endSale')
    .notEmpty()
    .withMessage('La fecha de fin de la oferta es requerida')
];
