import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { validationResult } from 'express-validator';
import {
  getAvgCalificationsEmployeeByYear,
  getDailySalesByMonthReport,
  getMonthlySales,
  getMostSelledProducts,
  getOrderRatingDistribution,
  getOrderRatingDistributionByEmployee,
  getSaleByWeekDayReport,
  getSalesByHourOfDay,
  newCustomersByMonth,
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
    const endDate = new Date(req.query.endDate as string);
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
    const endDate = new Date(req.query.endDate as string);
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

export const salesReport = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const year = req.query.year as string;
    const view = req.query.view as string;
    const month = req.query.month as string;

    if (!year || !view) {
      next(new AppError('Year and view are required query parameters', 400));
      return;
    }

    if (view === 'monthly') {
      const monthlySales = await getMonthlySales(year);

      if (monthlySales === null) {
        next(new AppError('Something was wrong!', 400));
        return;
      }

      res.status(200).json({
        ok: true,
        sales: monthlySales
      });
    } else if (view === 'daily') {
      if (!month) {
        next(new AppError('Month is required for daily view', 400));
        return;
      }

      const dailySales = await getDailySalesByMonthReport(year, month);

      if (dailySales === null) {
        next(new AppError('Something was wrong!', 400));
        return;
      }

      res.status(200).json({
        ok: true,
        sales: dailySales
      });
    }
  }
);

export const salesByDayOfWeek = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const year = req.query.year as string;
    const month = req.query.month as string;

    const dailySales = await getSaleByWeekDayReport(year, month);
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
    const endDate = new Date(req.query.endDate as string);

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

export const reportNewCustomersByMonth = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { year } = req.params;

    const newCustomers = await newCustomersByMonth(year);
    if (newCustomers === null) {
      next(new AppError('Something was wrong!', 400));
    }

    res.status(200).json({
      ok: true,
      newCustomers
    });
  }
);
