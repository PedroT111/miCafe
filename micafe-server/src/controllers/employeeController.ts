import { validationResult } from 'express-validator';
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  updateEmployee
} from '../services/employee';
import catchAsync from '../utils/catchAsync';
import { type NextFunction, type Request, type Response } from 'express';
import { User } from '../models/userModel';
import AppError from '../utils/appError';

export const createNewEmployee = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { email } = req.body;
    const findUser = await User.find({ email, isDeleted: false });
    if (findUser.length !== 0) {
      res.status(401).json({
        ok: 'false',
        message: 'An account is already registered with your email.'
      });
    }
    const newEmployee = await createEmployee(req.body);
    if (newEmployee === null) {
      next(new AppError('Something was wrong!', 400));
    }

    res.status(200).json({
      ok: true,
      employee: newEmployee
    });
  }
);

export const editEmployee = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { id } = req.params;
    const employee = { ...req.body };
    const updatedEmployee = await updateEmployee(employee, id);
    if (updatedEmployee === null) {
      next(new AppError('Something was wrong!', 400));
    }

    res.status(200).json({
      ok: true,
      employee: updatedEmployee
    });
  }
);

export const removeEmployee = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { id } = req.params;

    const deletedEmployee = await deleteEmployee(id);
    if (deletedEmployee === null) {
      next(new AppError('Something was wrong!', 400));
    }

    res.status(200).json({
      ok: true,
      msg: 'The employee has been deleted'
    });
  }
);


export const getEmployeeData = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { id } = req.params;

    const employee = await getEmployee(id);
    if (employee === null) {
      next(new AppError('Something was wrong!', 400));
    }

    res.status(200).json({
      ok: true,
      employee
    });
  }
);