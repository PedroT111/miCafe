import express from 'express';
import {
  createCategory,
  deleteCategory,
  getCategories,
  getOne,
  updateCategory
} from '../controllers/categoryProductController';
import { isAdmin } from '../middlewares/roleUser';
import { idValidationRule } from '../validators/commonValidator';

const router = express.Router();

router.post('/new', createCategory);
router.get('/categories', getCategories);
router.route('/:id').get(getOne).put(updateCategory);
router.route('/delete/:id').delete(idValidationRule, deleteCategory);

export default router;
