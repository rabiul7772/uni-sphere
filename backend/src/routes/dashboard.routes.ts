import { Router } from 'express';
import {
  getDashboardStats,
  getRecentClasses,
  getChartData
} from '../controllers/dashboard.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/stats', protect, getDashboardStats);
router.get('/recent-classes', protect, getRecentClasses);
router.get('/charts', protect, getChartData);

export default router;
