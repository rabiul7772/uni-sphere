import { Router } from 'express';
import {
  getClasses,
  createClass,
  getClassById,
  updateClass
} from '../controllers/class.controller.js';
import { protect, authorize } from '../middlewares/auth.middleware.js';

const classRouter = Router();

classRouter.get('/', protect, getClasses);
classRouter.get('/:id', protect, getClassById);
classRouter.post('/', protect, authorize('admin', 'teacher'), createClass);
classRouter.put('/:id', protect, authorize('admin', 'teacher'), updateClass);

export default classRouter;
