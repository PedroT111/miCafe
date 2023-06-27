import express from "express";
import { validateAccount } from "../controllers/userController";
import { loginValidation, registerValidation } from "../middlewares/userValidation";


const router = express.Router();

router.post('/signup', registerValidation);
router.post('/login', loginValidation)
router.get('/validate/:validationToken', validateAccount);

export default router;