import express from 'express';
import {
  createCombo,
  deleteCombo,
  getComboDetails,
  getCombos,
  updateCombo
} from '../controllers/comboController';
import { isAdmin } from '../middlewares/roleUser';
import { comboValidationRules } from '../validators/comboValidator';
import { idValidationRule } from '../validators/commonValidator';

const router = express.Router();

router.get('/', getCombos);
router.post('/new', isAdmin, comboValidationRules, createCombo);
router
  .route('/:id')
  .put(isAdmin, idValidationRule, updateCombo)
  .get(getComboDetails)
  .delete(isAdmin, idValidationRule, deleteCombo);
export default router;
