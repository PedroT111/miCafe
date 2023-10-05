import express from 'express';
import {
  createOffer,
  createOffersByCategory,
  getOffer,
  getOffers,
  removeOffer,
  updateOffer
} from '../controllers/offerControler';
import { offerValidationRules } from '../validators/offerValidator';
import { idValidationRule } from '../validators/commonValidator';

const router = express.Router();

router.post('/new', offerValidationRules, createOffer);
router.post('/category', createOffersByCategory);
router.get('/', getOffers);
router.get('/:id', idValidationRule, getOffer);
router.put('/:id', idValidationRule, updateOffer);
router.delete('/:id', idValidationRule, removeOffer);
export default router;
