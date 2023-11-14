import express from 'express';
import { QualificationDistribution, qualificationDistributionByEmployee, reportAverageCalificationsByYear, reportMostSelledProducts, reportNewCustomersByMonth, reportSelledByCategory, salesByDayOfWeek, salesByHourOfDay, salesReport } from '../controllers/reportController';


const router = express.Router();

router.get('/most-selled-products', reportMostSelledProducts);
router.get('/qualification-distribution', QualificationDistribution);
router.get('/qualification-distribution-by-employee/:id', qualificationDistributionByEmployee);
router.get('/sales', salesReport);
router.get('/sales-by-day-of-week', salesByDayOfWeek);
router.get('/sales-by-hour-of-day', salesByHourOfDay);
router.get('/qualification-avg-employee/:year', reportAverageCalificationsByYear);
router.get('/total-selled-by-category', reportSelledByCategory);
router.get('/new-users-by-month/:year', reportNewCustomersByMonth);
export default router;
