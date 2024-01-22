import express from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  getProductsByCategory,
  getProductsNoSale,
  getProductsOnSale,
  updatePricesByCategory,
  updateProduct
} from '../controllers/productController';
import { isAdmin } from '../middlewares/roleUser';
import {
  createProductValidationRules,
  updateProductValidationRules
} from '../validators/productValidator';
import { idValidationRule } from '../validators/commonValidator';

const router = express.Router();

router.post('/new', isAdmin, createProductValidationRules, createProduct);
router.get('/', getAllProducts);
router.get('/category/:id', getProductsByCategory);
router.get('/onsale', getProductsOnSale);
router.get('/no-sale', getProductsNoSale);
router.post('/update-prices', isAdmin, updatePricesByCategory);
router
  .route('/:id')
  .get(getProduct)
  .put(isAdmin, updateProductValidationRules, updateProduct);
router.delete('/:id', isAdmin, idValidationRule, deleteProduct);

export default router;
