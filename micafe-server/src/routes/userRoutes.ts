import express from 'express';
import {
  deleteUser,
  getUsersByRole,
  updateUser
} from '../controllers/userController';

const router = express.Router();

router.get('/:role', getUsersByRole);
router.put('/:id', updateUser);
router.delete('/:_id', deleteUser);

export default router;
