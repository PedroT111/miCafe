import { param } from 'express-validator';

export const idValidationRule = param('id')
  .notEmpty()
  .withMessage('El ID es requerido')
  .isMongoId()
  .withMessage('El ID no es válido');
