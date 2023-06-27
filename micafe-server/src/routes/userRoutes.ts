import express from "express";
import { forgotPassword, resetPassword, validateAccount } from "../controllers/userController";
import { loginValidation, registerValidation } from "../middlewares/userValidation";


const router = express.Router();

router.post('/signup', registerValidation);
router.post('/login', loginValidation)
router.get('/validate/:validationToken', validateAccount);

router.post('/forgot-password', forgotPassword);
router.post('/forgot-password/:validationToken', resetPassword);

export default router;