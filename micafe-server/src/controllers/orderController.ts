import { type NextFunction, type Request, type Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import {
  assignOrder,
  changeOrderStatus,
  create,
  getAll,
  getDetailOrders,
  getOne,
  getOrdersByStatusAndEmployee,
  getOrdersByUser,
  paymentOrder,
  rateOrder,
  updateOrderEmployee,
  updatePickUpDateTime
} from '../services/order';
import { validationResult } from 'express-validator';
import { io } from '../sockets';
import { IOrder } from '../models/orderModel';
import { calculateTotalOrder } from '../utils/orderCalculations';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { getOneById } from '../services/user';

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCES_TOKEN || ''
});

export const getAllOrders = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const orders = await getAll();

    if (orders.length === 0) {
      next(new AppError('There are no orders', 400));
      return;
    }

    res.status(200).json({
      ok: true,
      orders
    });
  }
);

export const getOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { id } = req.params;
    const order = await getOne(id);

    if (order === null) {
      next(new AppError('There is no order with that id', 400));
      return;
    }

    res.status(200).json({
      ok: true,
      order
    });
  }
);
export const getAllOrdersByUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { id } = req.params;
    /* if (id !== req.headers.user) {
      next(new AppError('Something was wrong!', 400));
      return;
    }*/

    const orders = await getOrdersByUser(id);

    if (orders.length === 0) {
      next(new AppError('There are no orders', 400));
      return;
    }

    res.status(200).json({
      ok: true,
      orders
    });
  }
);

export const getAllOrdersByStatusAndEmployee = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { status, employee } = req.params;
    const orders = await getOrdersByStatusAndEmployee(status, employee);

    res.status(200).json({
      ok: true,
      orders
    });
  }
);

export const createNewOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const order: IOrder = req.body;
    if (order.products.length === 0 && order.combos.length === 0) {
      next(new AppError('Cannot create an order without products', 400));
      return;
    }
    if (order.pickUpDateTime === null) {
      next(new AppError('The order does not have a pickup time', 400));
    }

    if(order.products.length === 0 && order.combos.length === 0){
      next(new AppError('The order is empty', 400));
    }
    console.log(order, 'ord')
    const { totalAmount, totalPoints } = await calculateTotalOrder(order);
    order.totalAmount = totalAmount;
    order.totalPoints = totalPoints;

    const query = await create(order);
    if (query === null) {
      next(new AppError('Something was wrong!', 400));
    }

    const preference = new Preference(client);
    preference
      .create({
        body: {
          notification_url: '',
          items: [
            {
              id: '',
              title: 'MiCafeApp',
              quantity: 1,
              unit_price: 1000
            }
          ],
          back_urls: {
            success: `http://localhost:4200/shopping/payment-success/${order._id}`,
            failure: 'http://localhost:4200/shopping/payment-failed'
          },
          auto_return: 'approved'
        }
      })
      .then((result) =>
        res.status(200).json({
          ok: true,
          reference: result.id,
          order: query
        })
      )
      .catch((error) => console.log(error));

    io.emit('newOrder', { msg: 'Nueva orden', order: query });
  }
);

export const paidOrderWithPoints = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const order: IOrder = req.body;
    if (order.products.length === 0 && order.combos.length === 0) {
      next(new AppError('Cannot create an order without products', 400));
      return;
    }
    if (order.pickUpDateTime === null) {
      next(new AppError('The order does not have a pickup time', 400));
      return;
    }

    const { totalAmount, totalPoints } = await calculateTotalOrder(order);
    order.totalAmount = totalAmount;
    order.totalPoints = totalPoints;

    const { customer } = req.body;
    const user = await getOneById(customer);

    if (user === null) {
      next(new AppError('Something was wrong!', 400));
      return;
    }
    console.log(user.points, 'userp', order.totalPoints ,'orp')
    if (user.points && user.points < order.totalPoints) {
      console.log('error')
      next(new AppError('insufficient points', 400));
      return;
    }
    order.paidWithPoints = true;
    order.paymentStatus = 'success';
    const query = await create(order);
    if (query === null) {
      next(new AppError('Something was wrong!', 400));
    }

    io.emit('newOrder', { msg: 'Nueva orden', order: query });

    res.status(200).json({
      ok: true,
      order: query
    });
  }
);

export const markOrderAsPaid = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (req.params.type === 'payment') {
      console.log(req.params);
    }
  }
);

export const getOrdersByStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { status } = req.params;
    const orders = await getDetailOrders(status);

    res.status(200).json({
      ok: true,
      orders
    });
  }
);

export const orderRate = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { orderId } = req.params;
    const { qualification } = req.body;


    const order = await rateOrder(orderId, qualification);

    if (order === null) {
      next(new AppError('Something was wrong!', 404));
      return;
    }

    res.status(200).json({
      ok: true,
      msg: 'Order qualification updated.',
    });
  }
);

export const changeOrderState = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { id } = req.params;
    const { status } = req.body;
    const order: IOrder | null = await changeOrderStatus(id, status);

    if (order === null) {
      next(new AppError('Something was wrong!', 404));
      return;
    }

    res.status(200).json({
      ok: true,
      msg: 'Order status was updated successfully.',
    });
    io.emit('updatedOrder', { msg: 'Actualización de estado'});
    
  }
);

export const assignOrderToEmployee = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { id } = req.params;
    const { employee } = req.body;

    const order = await assignOrder(id, employee);

    if (!order) {
      next(new AppError('Something was wrong!', 404));
      return;
    }

    res.status(200).json({
      ok: true,
      msg: 'Order has beeen assigned.'
    });
  }
);

export const updateEmployeeOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { id } = req.params;
    const { employee } = req.body;

    const order = await updateOrderEmployee(id, employee);

    if (!order) {
      next(new AppError('Something was wrong!', 404));
      return;
    }

    res.status(200).json({
      ok: true,
      order
    });
  }
);

export const changeOrderPickUpDate = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { orderId } = req.params;
    const { pickUpDateTime } = req.body;

    const order = await updatePickUpDateTime(orderId, pickUpDateTime);

    if (!order) {
      next(new AppError('Something was wrong!', 404));
      return;
    }

    res.status(200).json({
      ok: true,
      msg: 'Order pick up date time updated!'
    });
  }
);
