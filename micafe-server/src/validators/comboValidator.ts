import { body } from 'express-validator';

export const comboValidationRules = [
  body('name').notEmpty().withMessage('El nombre es requerido'),
  body('price')
    .notEmpty()
    .withMessage('El precio es requerido')
    .isNumeric()
    .withMessage('El precio debe ser un número'),
  body('description').notEmpty().withMessage('La descripción es requerida'),
  body('urlImage').notEmpty().withMessage('La URL de la imagen es requerida'),
  body('products')
    .isArray({ min: 1 })
    .withMessage(
      'Debe incluir al menos un producto en la lista de productos del combo'
    ),
  body('products.*.product')
    .notEmpty()
    .withMessage('El ID del producto es requerido')
    .isMongoId()
    .withMessage('El ID del producto no es válido'),
  body('products.*.quantity')
    .notEmpty()
    .withMessage('La cantidad del producto es requerida')
    .isNumeric()
    .withMessage('La cantidad debe ser un número')
];
