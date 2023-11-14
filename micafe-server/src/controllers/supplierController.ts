import { NextFunction, Response, Request } from 'express';
import catchAsync from '../utils/catchAsync';
import { validationResult } from 'express-validator';
import {
  createSupplier,
  deleteSupplier,
  getAllSupplier,
  getOneSupplier,
  updateSupplier
} from '../services/supplier';
import AppError from '../utils/appError';

export const createNewSupplier = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const supplier = { ...req.body };
    const newSupplier = await createSupplier(supplier);
    if (newSupplier === null) {
      next(new AppError('Something was wrong.', 409));
      return;
    }
    res.status(201).json({
      ok: true,
      supplier: newSupplier
    });
  }
);

export const getSupplier = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { id } = req.params;
    const supplier = await getOneSupplier(id);
    if (supplier === null) {
      next(new AppError('Something was wrong', 409));
      return;
    }
    res.status(201).json({
      ok: true,
      supplier
    });
  }
);

export const getAll = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const supplierList = await getAllSupplier();
    if (supplierList.length === 0) {
      next(new AppError('There are no suppliers registered', 409));
      return;
    }
    res.status(201).json({
      ok: true,
      supplier: supplierList
    });
  }
);

export const updateSupplierData = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { id } = req.params;
    const data = { ...req.body };
    const supplierUpdated = await updateSupplier(id, data);
    if (supplierUpdated === null) {
      next(new AppError('Something was wrong', 409));
      return;
    }
    res.status(201).json({
      ok: true,
      supplier: supplierUpdated
    });
  }
);

export const deleteSupplierData = catchAsync(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      const { id } = req.params;
      
      const supplierDeleted = await deleteSupplier(id);
      if (supplierDeleted === null) {
        next(new AppError('Something was wrong', 409));
        return;
      }
      res.status(201).json({
        ok: true,
        supplier: supplierDeleted
      });
    }
  );