import express from 'express';
import {
  createDiscountForInactiveUsers,
  createDiscountForTopUsers,
  deleteDiscounts,
  getAllDiscounts,
  validateDiscount
} from '../controllers/discountController';
import {
  discountValidationCode,
  discountValidationRules
} from '../validators/discountValidator';
import { isAdmin } from '../middlewares/roleUser';

const router = express.Router();

router.get('/', getAllDiscounts);
router.get('/validate', validateDiscount);
router.post(
  '/new/top-users',
  isAdmin,
  discountValidationRules,
  createDiscountForTopUsers
);
router.post(
  '/new/inactive-users',
  isAdmin,
  discountValidationRules,
  createDiscountForInactiveUsers
);

router.delete('/:code', isAdmin, discountValidationCode, deleteDiscounts);
export default router;
