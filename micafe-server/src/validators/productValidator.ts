import { body, param } from 'express-validator';

export const createProductValidationRules = [
  body('name').notEmpty().withMessage('El nombre es requerido'),
  body('price')
    .notEmpty()
    .withMessage('El precio es requerido')
    .isNumeric()
    .withMessage('El precio debe ser un número'),
  body('description').notEmpty().withMessage('La descripción es requerida'),
  body('hasMilk')
    .isBoolean()
    .withMessage('El campo hasMilk debe ser un booleano'),
  body('urlImage').notEmpty().withMessage('La URL de la imagen es requerida'),
  body('category')
    .notEmpty()
    .withMessage('La categoría es requerida')
    .isMongoId()
    .withMessage('El ID de categoría no es válido')
];

export const updateProductValidationRules = [
  param('id')
    .notEmpty()
    .withMessage('El ID del producto es requerido')
    .isMongoId()
    .withMessage('El ID de producto no es válido')
];
