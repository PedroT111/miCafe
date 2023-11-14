import express from 'express';
import {
  createNewSupplier,
  deleteSupplierData,
  getAll,
  getSupplier,
  updateSupplierData
} from '../controllers/supplierController';
import { idValidationRule } from '../validators/commonValidator';

const router = express.Router();

router.post('/new', createNewSupplier);
router.get('/', getAll);
router.get('/:id', idValidationRule, getSupplier);
router.put('/update/:id', idValidationRule, updateSupplierData);
router.delete('/delete/:id', idValidationRule, deleteSupplierData);

export default router;
