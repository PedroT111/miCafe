import { type Request, type Response, type NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import {
  findOneByName,
  createOne,
  findAll,
  detail,
  update,
  deleteOne
} from '../services/categoryProduct';
import { validationResult } from 'express-validator';

export const createCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name } = req.body;
    const category = await findOneByName(name);
    if (category !== null) {
      next(new AppError('There is already a category with that name.', 409));
      return;
    }
    const newCategory = req.body;
    await createOne(newCategory);
    res.status(201).json({
      ok: true,
      newCategory
    });
  }
);

export const getCategories = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const categories = await findAll();
    if (categories.length === 0) {
      next(new AppError('Something was wrong', 400));
      return;
    }
    res.status(200).json({
      ok: true,
      categories
    });
  }
);

export const getOne = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const category = await detail(id);
    if (category == null) {
      next(new AppError('Something was wrong!', 400));
      return;
    }
    res.status(200).json({
      ok: true,
      category
    });
  }
);

export const updateCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const categoryToEdit = { ...req.body };
    const query = await update(id, categoryToEdit);
    if (query == null) {
      next(new AppError('Something was wrong', 400));
      return;
    }
    res.status(200).json({
      ok: true,
      query
    });
  }
);

export const deleteCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { id } = req.params;
    const categoryDelete = await detail(id);
    if (categoryDelete === null) {
      next(new AppError('There is no category with that id', 404));
      return;
    }
    const query = await deleteOne(categoryDelete);
    if (query == null) {
      next(new AppError('Something was wrong', 400));
      return;
    }
    res.status(200).json({
      ok: true,
      msg: 'the category was removed'
    });
  }
);
