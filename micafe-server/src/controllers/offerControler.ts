import { type Request, type Response, type NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import {
  create,
  createByCategory,
  deleteOffer,
  getOffersWithProducts
} from '../services/offerService';
import AppError from '../utils/appError';
import { getByCategory, getOne } from '../services/product';

export const createOffer = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const newOffer = await create({ ...req.body });
    if (newOffer == null) {
      next(new AppError('Something was wrong!', 400));
    }
    res.status(200).json({
      ok: true,
      offer: newOffer
    });
  }
);

export const getOffers = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const offers = await getOffersWithProducts();
    if (offers.length === 0) {
      res.status(200).json({
        ok: true,
        msg: 'There are no offers.'
      });
    }
    res.status(200).json({
      ok: true,
      offers
    });
  }
);

export const createOffersByCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { categoryId, value, startSale, endSale } = req.body;
    const listProducts = await getByCategory(categoryId);
    if (listProducts == null || listProducts.length === 0) {
      next(new AppError('No hay productos en la categoria seleccionada', 400));
    }
    const newOffers = await createByCategory(
      categoryId,
      value,
      startSale,
      endSale
    );
    if (newOffers == null) {
      next(new AppError('Something was wrong!', 400));
    }
    res.status(200).json({
      ok: true,
      offer: newOffers
    });
  }
);

export const deleteOfferByProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const deletedOffer = await deleteOffer(id);

    if (deletedOffer == null) {
      next(new AppError('Something was wrong!', 400));
    }

    res.status(200).json({
      ok: true,
      msg: 'Oferta eliminada correctamente'
    });
  }
);
