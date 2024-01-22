import express from 'express';
import {
  createNewEmployee,
  editEmployee,
  getEmployeeData,
  removeEmployee
} from '../controllers/employeeController';
import { isAdmin } from '../middlewares/roleUser';

const router = express.Router();

router.post('/new', isAdmin, createNewEmployee);
router.put('/:id', isAdmin, editEmployee);
router.get('/:id', isAdmin, getEmployeeData);
router.delete('/:id', isAdmin, removeEmployee);
export default router;
