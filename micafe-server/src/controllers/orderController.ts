import { type NextFunction, type Request, type Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import { changeOrderStatus, create, getDetailOrders } from '../services/order';
import { validationResult } from 'express-validator';
import { io } from '../app';

export const createNewOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const order = req.body;
    if (order.products.length === 0 && order.combos.length === 0) {
      next(new AppError('No se puede crear una orden sin productos ', 400));
      return;
    }
    if (order.pickUpDateTime === null) {
      next(new AppError('La orden no tiene un horario de retiro', 400));
    }

    const newOrder = await create(order);
    if (newOrder === null) {
      next(new AppError('Something was wrong!', 400));
    }
    io.emit('new order', {order: newOrder});
    res.status(200).json({
      ok: true,
      order: newOrder
    });
  }
);

export const getOrdersByStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { status } = req.params;
    const orders = await getDetailOrders(status);
    if (orders.length === 0) {
      next(new AppError(`There are no ${status} orders`, 400));
      return;
    }

    res.status(200).json({
      ok: true,
      orders
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

    const order = await changeOrderStatus(id, status);

    if (!order) {
      next(new AppError('Something was wrong!', 404));
      return;
    }

    res.status(200).json({
      ok: true,
      msg: 'Order status was updated successfully.'
    });
  }
);
