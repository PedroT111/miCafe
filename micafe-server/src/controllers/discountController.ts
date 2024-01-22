import { type NextFunction, type Response, type Request } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import { validationResult } from 'express-validator';
import {
  createDiscountsForUsers,
  deleteDiscount,
  getActiveDiscountByUser,
  getAll,
  getOneByCode
} from '../services/discount';
import { getInactiveUsers, getTopClients } from '../services/user';
import { sendDataEmail } from '../helpers/sendEmail';

export const getAllDiscounts = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const discounts = await getAll();

    if (discounts.length === 0) {
      next(new AppError('There is no discounts', 400));
      return;
    }

    res.status(200).json({
      ok: true,
      discounts
    });
  }
);
export const createDiscountForTopUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const filter = req.query.filter as 'week' | 'month';
    const limit = parseInt(req.query.limit as string, 10);
    const discount = { ...req.body };

    const findDiscount = await getOneByCode(discount.code);

    if (findDiscount !== null) {
      next(new AppError('There is already a discount with that code', 400));
      return;
    }

    const topClients = await getTopClients(limit, filter);

    const newDiscount = await createDiscountsForUsers(topClients, discount);
    if (newDiscount.length === 0) {
      next(
        new AppError('No hay usuarios que cumplan con esos parametros!', 400)
      );
      return;
    }
    const discountCode = newDiscount[0].code;
    await sendDataEmail(
      topClients,
      discountCode,
      'd-1274abf8448a4386805e95ef85d9cb09'
    );
    res.status(200).json({
      ok: true,
      msg: 'Discount created successfully!'
    });
  }
);

export const createDiscountForInactiveUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const inactiveDays = parseInt(req.query.inactiveDays as string, 10);
    const discount = { ...req.body };

    const findDiscount = await getOneByCode(discount.code);

    if (findDiscount !== null) {
      next(new AppError('There is already a discount with that code', 400));
      return;
    }
    const inactiveUsers = await getInactiveUsers(inactiveDays);
    const newDiscount = await createDiscountsForUsers(inactiveUsers, discount);
    if (newDiscount.length === 0) {
      next(
        new AppError('No hay usuarios que cumplan con esos parametros!', 400)
      );
      return;
    }
    const discountCode = newDiscount[0].code;
    await sendDataEmail(
      inactiveUsers,
      discountCode,
      'd-1274abf8448a4386805e95ef85d9cb09'
    );
    res.status(200).json({
      ok: true,
      msg: 'Discount created successfully!'
    });
  }
);

export const deleteDiscounts = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { code } = req.params;

    const removedCode = await deleteDiscount(code);

    if (!removedCode) {
      next(new AppError('There is no discounts with that code!', 400));
      return;
    }

    res.status(200).json({
      ok: true,
      msg: 'Discounts removed successfully'
    });
  }
);

export const validateDiscount = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const code: string = (req.query.code as string) || '';
    const user: string = (req.query.user as string) || '';

    if (!code || !user) {
      next(new AppError('Invalid discount code!', 400));
      return;
    }

    const discount = await getActiveDiscountByUser(code, user);

    if (!discount) {
      next(new AppError('Invalid discount code!', 400));
      return;
    }

    res.status(200).json({
      ok: true,
      discount
    });
  }
);
