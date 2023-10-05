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
router.post('/new', comboValidationRules, createCombo);
router
  .route('/:id')
  .put(idValidationRule, updateCombo)
  .get(getComboDetails)
  .delete(idValidationRule, deleteCombo);
export default router;
