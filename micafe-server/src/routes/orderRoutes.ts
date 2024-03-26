import express from 'express';
import { assignOrderToEmployee, changeOrderPickUpDate, changeOrderState, createNewOrder, getAllOrders, getAllOrdersByStatusAndEmployee, getAllOrdersByUser, getOrder, getOrdersByStatus, markOrderAsPaid, orderRate, paidOrderWithPoints, updateEmployeeOrder } from '../controllers/orderController';
import { idValidationRule } from '../validators/commonValidator';
const router = express.Router();


router.get('/', getAllOrders);
router.get('/:id', idValidationRule, getOrder);
router.get('/status/:status', getOrdersByStatus);
router.get('/status/:status/employee/:employee', getAllOrdersByStatusAndEmployee);
router.get('/user/:id', getAllOrdersByUser);
router.post('/new', createNewOrder);
router.post('/new/pay-with-points', paidOrderWithPoints);
router.post('/qualification/:orderId', orderRate);
router.get('/api/mercadopago/ipn', markOrderAsPaid)
router.put('/:id', idValidationRule, changeOrderState);
router.put('/assign/:id', idValidationRule, assignOrderToEmployee);
router.put('/employee/:id', updateEmployeeOrder);
router.put('/update-pick-up-date/:orderId', changeOrderPickUpDate)

export default router;
