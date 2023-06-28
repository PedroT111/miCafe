import express from "express";
import { forgotPassword, getMe, resetPassword, updateUser, validateAccount } from "../controllers/userController";
import { loginValidation, registerValidation } from "../middlewares/userValidation";
import authenticateToken from "../middlewares/tokenValidation";


const router = express.Router();

router.get('/me', authenticateToken, getMe);
router.post('/signup', registerValidation);
router.post('/login', loginValidation)
router.get('/validate/:validationToken', validateAccount);

router.post('/forgot-password', forgotPassword);
router.post('/forgot-password/:validationToken', resetPassword);

router.route('/:_id')
    .put(authenticateToken,updateUser)
    

export default router;