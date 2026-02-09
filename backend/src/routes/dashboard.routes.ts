import { Router } from 'express';
import {
  getDashboardStats,
  getRecentClasses,
  getChartData
} from '../controllers/dashboard.controller.js';

const router = Router();

router.get('/stats', getDashboardStats);
router.get('/recent-classes', getRecentClasses);
router.get('/charts', getChartData);

export default router;
