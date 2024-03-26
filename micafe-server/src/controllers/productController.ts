/* eslint-disable @typescript-eslint/no-base-to-string */
import { type Request, type Response, type NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import {
  create,
  createChangePriceHistory,
  deleteOne,
  getAll,
  getByCategory,
  getByName,
  getOfferProducts,
  getOne,
  productsNoSale,
  update,
  updatePrices
} from '../services/product';
import AppError from '../utils/appError';
import { sendDataEmail } from '../helpers/sendEmail';
import { getAllCustomers } from '../services/user';
import { validationResult } from 'express-validator';

export const createProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { name } = req.body;
    const findProduct = await getByName(name);
    if (findProduct != null) {
      next(new AppError('There is already a product with that name.', 409));
      return;
    }
    const newProduct = { ...req.body };
    await create(newProduct);
    const userList = await getAllCustomers();
    await sendDataEmail(
      userList,
      newProduct,
      'd-a189e85da6af47539966278c3b6f9881'
    );
    res.status(201).json({
      ok: true,
      product: newProduct
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

export const getProductsOnSale = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const productsOnSale = await getOfferProducts();
    if (productsOnSale.length === 0) {
      res.status(200).json({
        ok: true,
        msg: 'There are no products on sale.'
      });
    }
    res.status(200).json({
      ok: true,
      products: productsOnSale
    });
  }
);

export const getProductsNoSale = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const noSaleProducts = await productsNoSale();
    if (noSaleProducts.length === 0) {
      res.status(200).json({
        ok: true,
        msg: 'There are no products no sale.'
      });
    }
    res.status(200).json({
      ok: true,
      products: noSaleProducts
    });
  }
);

export const updateProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { id } = req.params;
    const productToEdit = { ...req.body };
    const findProduct = await getOne(id);
    if (findProduct != null && findProduct._id.toString() !== id) {
      next(new AppError('There is already a product with that name.', 409));
      return;
    }

    const query = await update(id, productToEdit);
    if (query == null) {
      next(new AppError('Something was wrong!', 400));
      return;
    }

    if (
      productToEdit.price !== null &&
      findProduct !== null &&
      productToEdit.price !== findProduct.price
    ) {
      const changePrice = await createChangePriceHistory(
        id,
        findProduct.price,
        productToEdit.price
      );
      if (changePrice == null) {
        next(new AppError('Something was wrong!', 400));
        return;
      }
    }
    res.status(200).json({
      ok: true,
      product: query
    });
  }
);

export const updatePricesByCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { categoryId, percentage } = req.body;
    if (categoryId == null || percentage == null) {
      next(new AppError('missing parameters', 400));
    }
    const productsInCategory = await getByCategory(categoryId);
    if (productsInCategory.length === 0) {
      throw new AppError('No products found in the category', 404);
    }

    const pricesBeforeUpdate = productsInCategory.map((p) => p.price);

    const query = await updatePrices(categoryId, percentage);
    if (query == null) {
      next(new AppError('Something was wrongggg!', 400));
    }
    const pricesAfterUpdate = query?.map((p) => p.price);
    /* if (pricesAfterUpdate !== undefined && pricesBeforeUpdate !== undefined) {
      for (let i = 0; i < productsInCategory.length; i++) {
        const changePrice = await createChangePriceHistory(
          productsInCategory[i]._id.toString(),
          pricesBeforeUpdate[i],
          pricesAfterUpdate[i]
        );
      }
    } */
    res.status(200).json({
      ok: true,
      msg: 'Precios actualizados correctamente'
    });
  }
);

export const deleteProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { id } = req.params;
    const product = await getOne(id);
    if (product == null) {
      next(new AppError('Something was wrong!', 400));
    }
    const deletedProduct = await deleteOne(id);
    if (deletedProduct == null) {
      next(new AppError('Something was wrong!', 400));
    }
    res.status(200).json({
      ok: true,
      product: deletedProduct
    });
  }
);
