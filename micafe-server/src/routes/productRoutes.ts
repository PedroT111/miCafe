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

router.post('/new', createProductValidationRules, createProduct);
router.get('/', getAllProducts);
router.get('/category/:id', getProductsByCategory);
router.get('/onsale', getProductsOnSale);
router.get('/no-sale', getProductsNoSale);
router.post('/update-prices', updatePricesByCategory);
router
  .route('/:id')
  .get(getProduct)
  .put(updateProductValidationRules, updateProduct);
router.delete('/:id', idValidationRule, deleteProduct);

export default router;
