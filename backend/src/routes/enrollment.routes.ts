import { Router } from 'express';
import { enrollInClass } from '../controllers/enrollment.controller.js';
import { protect, authorize } from '../middlewares/auth.middleware.js';

const enrollmentRouter = Router();

enrollmentRouter.post('/', protect, authorize('student'), enrollInClass);

export default enrollmentRouter;
