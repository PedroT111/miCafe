import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProduct,
  getProductsByCategory,
  updateProduct
} from '../controllers/productController';
import { isAdmin } from '../middlewares/roleUser';

const router = express.Router();

router.post('/new', isAdmin, createProduct);
router.get('/', getAllProducts);
router.get('/category/:id', getProductsByCategory);
router.route('/:id').get(getProduct).put(isAdmin, updateProduct);

export default router;
