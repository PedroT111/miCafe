import express from 'express';
import {
  createNewEmployee,
  editEmployee,
  getEmployeeData,
  removeEmployee
} from '../controllers/employeeController';

const router = express.Router();

router.post('/new', createNewEmployee);
router.put('/:id', editEmployee);
router.get('/:id', getEmployeeData);
router.delete('/:id', removeEmployee);
export default router;
