import express from 'express';
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoriesProducts,
  getOne,
  updateCategory
} from '../controllers/categoryProductController';
import { isAdmin } from '../middlewares/roleUser';
import { idValidationRule } from '../validators/commonValidator';


const router = express.Router();

router.post('/new', isAdmin, createCategory);
router.get('/categories', getCategories);
router.get('/categories/products', getCategoriesProducts);
router.route('/:id').get(getOne).put(isAdmin, updateCategory);
router.route('/delete/:id').delete(isAdmin, idValidationRule, deleteCategory);

export default router;
