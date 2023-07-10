import { type Request, type Response, type NextFunction } from 'express';
import {
  create,
  deleteOne,
  getAll,
  getById,
  getOneByName,
  update
} from '../services/combo';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';

export const createCombo = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name } = req.body;
    const combo = await getOneByName(name);
    if (combo != null) {
      next(new AppError('There is already a combo with that name.', 409));
      return;
    }
    const newCombo = { ...req.body };
    await create(newCombo);
    res.status(201).json({
      ok: true,
      newCombo
    });
  }
);

export const getComboDetails = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const combo = await getById(id);
    if (combo == null) {
      next(new AppError('There is no combo with that id', 404));
      return;
    }
    res.status(200).json({
      ok: true,
      combo
    });
  }
);

export const getCombos = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const combos = await getAll();
    res.status(200).json({
      ok: true,
      combos
    });
  }
);

export const updateCombo = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const combo = await getById(id);
    if (combo == null) {
      next(new AppError('There is no combo with that id', 404));
      return;
    }
    const comboToEdit = { ...req.body };
    const query = await update(id, comboToEdit);
    if (query == null) {
      next(new AppError('Something was wrong!', 400));
      return;
    }
    res.status(200).json({
      ok: true,
      query
    });
  }
);

export const deleteCombo = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const comboToDelete = await deleteOne(id);
    if (comboToDelete == null) {
      next(new AppError('There is no combo with that id', 404));
      return;
    }
    res.status(200).json({
      ok: true,
      msg: 'The combo was removed successfully'
    });
  }
);
