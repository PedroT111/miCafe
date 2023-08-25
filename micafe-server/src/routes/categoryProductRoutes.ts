import express from 'express';
import {
  createCategory,
  getCategories,
  getOne,
  updateCategory
} from '../controllers/categoryProductController';
import { isAdmin } from '../middlewares/roleUser';

const router = express.Router();

router.post('/new', createCategory);
router.get('/categories', getCategories);
router.route('/:id').get(getOne).put(updateCategory);

export default router;
