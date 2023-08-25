import express from 'express';
import {
  createOffer,
  createOffersByCategory,
  deleteOfferByProduct,
  getOffers
} from '../controllers/offerControler';

const router = express.Router();

router.post('/new', createOffer);
router.post('/category', createOffersByCategory);
router.get('/', getOffers);
router.delete('/product/:id', deleteOfferByProduct);
export default router;
