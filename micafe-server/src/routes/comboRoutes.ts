import express from 'express';
import {
  createCombo,
  deleteCombo,
  getComboDetails,
  getCombos,
  updateCombo
} from '../controllers/comboController';
import { isAdmin } from '../middlewares/roleUser';

const router = express.Router();

router.get('/', getCombos);
router.post('/new', createCombo);
router
  .route('/:id')
  .put(isAdmin, updateCombo)
  .get(getComboDetails)
  .delete(isAdmin, deleteCombo);
export default router;
