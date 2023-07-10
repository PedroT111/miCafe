import express from 'express';
import {
  createCategory,
  getCategories,
  getOne,
  updateCategory
} from '../controllers/categoryProductController';
import { isAdmin } from '../middlewares/roleUser';

const router = express.Router();

router.post('/new', isAdmin, createCategory);
router.get('/categories', isAdmin, getCategories);
router.route('/:id').get(isAdmin, getOne).put(isAdmin, updateCategory);

export default router;
