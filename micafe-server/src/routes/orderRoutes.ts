import express from 'express';
import { changeOrderState, createNewOrder, getOrdersByStatus } from '../controllers/orderController';
const router = express.Router();

router.post('/new', createNewOrder);
router.get('/:status', getOrdersByStatus);

router.put('/:id', changeOrderState);

export default router;
