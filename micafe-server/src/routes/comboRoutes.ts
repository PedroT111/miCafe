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

router.post('/new', isAdmin, createCombo);
router.put('/:id', isAdmin, updateCombo);
router.get('/:id', getComboDetails);
router.delete('/:id', deleteCombo);
router.get('/', getCombos);

export default router;
