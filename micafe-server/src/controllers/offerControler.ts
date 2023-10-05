import { type Request, type Response, type NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import {
  create,
  createByCategory,
  deleteOffer,
  editOffer,
  getOffersWithProducts,
  getOne
} from '../services/offerService';
import AppError from '../utils/appError';
import { getByCategory } from '../services/product';
import { validationResult } from 'express-validator';

export const createOffer = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
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

export const getOffer = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { id } = req.params;
    const offer = await getOne(id);
    if (offer === null) {
      next(new AppError('Oferta no encontrada', 400));
      return;
    }
    res.status(200).json({
      ok: true,
      offer
    });
  }
);

export const getOffers = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const offers = await getOffersWithProducts();
    if (offers.length === 0) {
      next(new AppError('No hay ofertas', 400));
      return;
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
export const updateOffer = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { id } = req.params;
    const offer = { ...req.body };
    const existingOffer = await getOne(id);

    if (existingOffer === null) {
      next(new AppError('There is no offer with that id.', 404));
    }

    if (existingOffer?.status === 'active') {
      next(new AppError('No se puede modificar una oferta activa', 400));
    }

    const query = await editOffer(id, offer);
    if (query === null) {
      next(new AppError('Something was wrong', 400));
    }

    res.status(200).json({
      ok: true,
      offer: query
    });
  }
);
export const removeOffer = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
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
