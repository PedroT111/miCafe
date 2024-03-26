import express from 'express';
import {
  QualificationDistribution,
  qualificationDistributionByEmployee,
  reportAverageCalificationsByYear,
  reportChangePriceProduct,
  reportCustomerStatistics,
  reportMostSelledProducts,
  reportNewCustomersByPeriod,
  reportSalesStatistics,
  reportSelledByCategory,
  reportTopUsers,
  reportTotalSales,
  salesByDayOfWeek,
  salesByHourOfDay,
} from '../controllers/reportController';

const router = express.Router();

router.get('/most-selled-products', reportMostSelledProducts);
router.get('/qualification-distribution', QualificationDistribution);
router.get(
  '/qualification-distribution-by-employee/:id',
  qualificationDistributionByEmployee
);
router.get('/sales-by-day-of-week', salesByDayOfWeek);
router.get('/total-sales', reportTotalSales);
router.get('/sales-by-hour-of-day', salesByHourOfDay);
router.get(
  '/qualification-avg-employee/:year',
  reportAverageCalificationsByYear
);
router.get('/total-selled-by-category', reportSelledByCategory);
router.get('/new-users-by-period', reportNewCustomersByPeriod);
router.get('/sales-statistics', reportSalesStatistics);
router.get('/customers-statistics', reportCustomerStatistics);
router.get('/top-buying-customers', reportTopUsers);
router.get('/change-price-product', reportChangePriceProduct);
export default router;
