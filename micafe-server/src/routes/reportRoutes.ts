import express from 'express';
import { QualificationDistribution, qualificationDistributionByEmployee, reportMostSelledProducts, salesByDayOfWeek, salesByHourOfDay, salesReport } from '../controllers/reportController';


const router = express.Router();

router.get('/most-selled-products', reportMostSelledProducts);
router.get('/qualification-distribution', QualificationDistribution);
router.get('/qualification-distribution-by-employee/:id', qualificationDistributionByEmployee);
router.get('/sales', salesReport);
router.get('/sales-by-day-of-week', salesByDayOfWeek);
router.get('/sales-by-hour-of-day', salesByHourOfDay);
export default router;
