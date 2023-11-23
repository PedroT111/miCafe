import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { validationResult } from 'express-validator';
import {
  getAvgCalificationsEmployeeByYear,
  getCustomerStatistics,
  getMostSelledProducts,
  getOrderRatingDistribution,
  getOrderRatingDistributionByEmployee,
  getSaleByWeekDayReport,
  getSalesByHourOfDay,
  getSalesStatistics,
  getTopBuyingUsers,
  getTotalSaleByDay,
  newCustomersByPeriod,
  productPriceVariation,
  totalSelledByCategory
} from '../services/reports';
import AppError from '../utils/appError';

export const reportMostSelledProducts = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const startDate = new Date(req.query.startDate as string);
    startDate.setUTCHours(0, 0, 0, 0);
    const endDate = new Date(req.query.endDate as string);
    endDate.setUTCHours(23, 59, 59, 999);
    const mostSelledProducts = await getMostSelledProducts(startDate, endDate);
    if (mostSelledProducts === null) {
      next(new AppError('Something was wrong!', 400));
    }

    res.status(200).json({
      ok: true,
      products: mostSelledProducts
    });
  }
);

export const QualificationDistribution = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const startDate = new Date(req.query.startDate as string);
    startDate.setUTCHours(0, 0, 0, 0);
    const endDate = new Date(req.query.endDate as string);
    endDate.setUTCHours(23, 59, 59, 999);
    const qualifications = await getOrderRatingDistribution(startDate, endDate);
    if (qualifications === null) {
      next(new AppError('Something was wrong!', 400));
    }

    res.status(200).json({
      ok: true,
      distribution: qualifications
    });
  }
);

export const qualificationDistributionByEmployee = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { id } = req.params;
    const qualifications = await getOrderRatingDistributionByEmployee(id);
    if (qualifications === null) {
      next(new AppError('Something was wrong!', 400));
    }

    res.status(200).json({
      ok: true,
      distribution: qualifications
    });
  }
);

export const salesByDayOfWeek = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const startDate = new Date(req.query.startDate as string);
    startDate.setUTCHours(0, 0, 0, 0);
    const endDate = new Date(req.query.endDate as string);
    endDate.setUTCHours(23, 59, 59, 999);

    const dailySales = await getSaleByWeekDayReport(startDate, endDate);
    if (dailySales === null) {
      next(new AppError('Something was wrong!', 400));
    }

    res.status(200).json({
      ok: true,
      sales: dailySales
    });
  }
);

export const reportTotalSales = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const startDate = new Date(req.query.startDate as string);
    startDate.setUTCHours(0, 0, 0, 0);
    const endDate = new Date(req.query.endDate as string);
    endDate.setUTCHours(23, 59, 59, 999);
    const groupBy = req.query.groupBy as string;

    const dailySales = await getTotalSaleByDay(startDate, endDate, groupBy);
    if (dailySales === null) {
      next(new AppError('Something was wrong!', 400));
    }

    res.status(200).json({
      ok: true,
      sales: dailySales
    });
  }
);

export const salesByHourOfDay = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const startDate = new Date(req.query.startDate as string);
    startDate.setUTCHours(0, 0, 0, 0);
    const endDate = new Date(req.query.endDate as string);
    endDate.setUTCHours(23, 59, 59, 999);

    const hourSales = await getSalesByHourOfDay(startDate, endDate);
    if (hourSales === null) {
      next(new AppError('Something was wrong!', 400));
    }

    res.status(200).json({
      ok: true,
      sales: hourSales
    });
  }
);

export const reportAverageCalificationsByYear = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { year } = req.params;

    const avg = await getAvgCalificationsEmployeeByYear(year);
    if (avg === null) {
      next(new AppError('Something was wrong!', 400));
    }

    res.status(200).json({
      ok: true,
      avg
    });
  }
);

export const reportSelledByCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const startDate = new Date(req.query.startDate as string);
    startDate.setUTCHours(0, 0, 0, 0);
    const endDate = new Date(req.query.endDate as string);
    endDate.setUTCHours(23, 59, 59, 999);

    const categories = await totalSelledByCategory(startDate, endDate);
    if (categories === null) {
      next(new AppError('Something was wrong!', 400));
    }

    res.status(200).json({
      ok: true,
      categories
    });
  }
);

export const reportSalesStatistics = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const startDate = new Date(req.query.startDate as string);
    startDate.setUTCHours(0, 0, 0, 0);
    const endDate = new Date(req.query.endDate as string);
    endDate.setUTCHours(23, 59, 59, 999);

    const statistics = await getSalesStatistics(startDate, endDate);

    res.status(200).json({
      ok: true,
      statistics
    });
  }
);

export const reportNewCustomersByPeriod = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const startDate = new Date(req.query.startDate as string);
    startDate.setUTCHours(0, 0, 0, 0);
    const endDate = new Date(req.query.endDate as string);
    endDate.setUTCHours(23, 59, 59, 999);
    const groupBy = req.query.groupBy as string;

    const newCustomers = await newCustomersByPeriod(
      startDate,
      endDate,
      groupBy
    );
    if (newCustomers === null) {
      next(new AppError('Something was wrong!', 400));
    }

    res.status(200).json({
      ok: true,
      newCustomers
    });
  }
);

export const reportCustomerStatistics = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const startDate = new Date(req.query.startDate as string);
    startDate.setUTCHours(0, 0, 0, 0);
    const endDate = new Date(req.query.endDate as string);
    endDate.setUTCHours(23, 59, 59, 999);

    const statistics = await getCustomerStatistics(startDate, endDate);

    res.status(200).json({
      ok: true,
      statistics
    });
  }
);

export const reportTopUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const startDate = new Date(req.query.startDate as string);
    startDate.setUTCHours(0, 0, 0, 0);
    const endDate = new Date(req.query.endDate as string);
    endDate.setUTCHours(23, 59, 59, 999);

    const customers = await getTopBuyingUsers(startDate, endDate);

    res.status(200).json({
      ok: true,
      customers
    });
  }
);

export const reportChangePriceProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    /*const startDate = new Date(req.query.startDate as string);
    startDate.setUTCHours(0, 0, 0, 0);
    const endDate = new Date(req.query.endDate as string);
    endDate.setUTCHours(23, 59, 59, 999);*/
    const year = req.query.year as string;
    const id = req.query.productId as string;
    console.log(id)
    const changePrices = await productPriceVariation( year, id);

    res.status(200).json({
      ok: true,
      changePrices
    });
  }
);
