import { type Request, type Response, type NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import {
  create,
  getAll,
  getByCategory,
  getByName,
  getOne,
  update
} from '../services/product';
import AppError from '../utils/appError';

export const createProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name } = req.body;
    const findProduct = await getByName(name);
    if (findProduct != null) {
      next(new AppError('There is already a product with that name.', 409));
      return;
    }
    const newProduct = { ...req.body };
    await create(newProduct);
    res.status(201).json({
      ok: true,
      newProduct
    });
  }
);

export const getAllProducts = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const products = await getAll();
    res.status(200).json({
      ok: true,
      products
    });
  }
);

export const getProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const product = await getOne(id);
    if (product == null) {
      next(new AppError('Something was wrong!', 400));
      return;
    }
    res.status(200).json({
      ok: true,
      product
    });
  }
);

export const getProductsByCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const products = await getByCategory(id);
    if (products.length === 0) {
      res.status(200).json({
        ok: true,
        msg: 'There are no products registered in this category.'
      });
    }
    res.status(200).json({
      ok: true,
      products
    });
  }
);

export const updateProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const productToEdit = { ...req.body };
    if (id === '') {
      next(new AppError('Id parameter is missing', 400));
      return;
    }
    const query = await update(id, productToEdit);
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
