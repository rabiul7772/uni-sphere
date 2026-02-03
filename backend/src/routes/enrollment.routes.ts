import { Router } from 'express';
import { enrollInClass } from '../controllers/enrollment.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const enrollmentRouter = Router();

enrollmentRouter.post('/', protect, enrollInClass);

export default enrollmentRouter;
