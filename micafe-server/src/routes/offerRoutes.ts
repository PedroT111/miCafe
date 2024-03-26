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
import { isAdmin } from '../middlewares/roleUser';

const router = express.Router();

router.post('/new', isAdmin, offerValidationRules, createOffer);
router.post('/category', isAdmin, createOffersByCategory);
router.get('/', getOffers);
router.get('/:id', isAdmin, idValidationRule, getOffer);
router.put('/:id', isAdmin, idValidationRule, updateOffer);
router.delete('/:id', isAdmin, idValidationRule, removeOffer);
export default router;
