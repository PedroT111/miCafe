import { body } from 'express-validator';

export const signUpValidationRules = [
  body('name').notEmpty().withMessage('El nombre es requerido'),
  body('lastName').notEmpty().withMessage('El apellido es requerido'),
  body('email')
    .notEmpty()
    .withMessage('El correo electrónico es requerido')
    .isEmail()
    .withMessage('El correo electrónico no es válido'),
  body('password')
    .notEmpty()
    .withMessage('La contraseña es requerida')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres')
];

export const logInValidationRules = [
  body('email')
    .notEmpty()
    .withMessage('El correo electrónico es requerido')
    .isEmail()
    .withMessage('El correo electrónico no es válido'),
  body('password').notEmpty().withMessage('La contraseña es requerida')
];
