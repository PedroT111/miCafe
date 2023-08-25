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

const router = express.Router();

router.post('/new', createProduct);
router.get('/', getAllProducts);
router.get('/category/:id', getProductsByCategory);
router.get('/onsale', getProductsOnSale);
router.get('/no-sale', getProductsNoSale);
router.put('/onsale/edit/:id', editProductSale);
router.post('/update-prices', updatePricesByCategory);
router.route('/:id').get(getProduct).put(updateProduct);
router.delete('/:id', deleteProduct);

export default router;
