import express from 'express';
import {
  createDiscountForInactiveUsers,
  createDiscountForTopUsers,
  deleteDiscounts,
  getAllDiscounts
} from '../controllers/discountController';
import {
  discountValidationCode,
  discountValidationRules
} from '../validators/discountValidator';

const router = express.Router();

router.get('/', getAllDiscounts);
router.post(
  '/new/top-users',
  discountValidationRules,
  createDiscountForTopUsers
);
router.post(
  '/new/inactive-users',
  discountValidationRules,
  createDiscountForInactiveUsers
);

router.delete('/:code', discountValidationCode, deleteDiscounts);
export default router;
