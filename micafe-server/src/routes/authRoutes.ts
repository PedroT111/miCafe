import express from 'express';
import {
  checkEmailExists,
  forgotPassword,
  getMe,
  resetPassword,
  validateAccount
} from '../controllers/authController';
import {
  loginValidation,
  registerValidation
} from '../middlewares/userValidation';
import authenticateToken from '../middlewares/tokenValidation';
import {
  logInValidationRules,
  signUpValidationRules
} from '../validators/userValidator';

const router = express.Router();

router.get('/me', authenticateToken, getMe);
router.post('/signup', signUpValidationRules, registerValidation);
router.post('/login', logInValidationRules, loginValidation);
router.get('/validate/:validationToken', validateAccount);

router.post('/forgot-password', forgotPassword);
router.post('/forgot-password/:validationToken', resetPassword);

router.post('/check-email', checkEmailExists);

export default router;
