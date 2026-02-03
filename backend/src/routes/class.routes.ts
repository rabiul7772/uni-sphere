import { Router } from 'express';
import {
  getClasses,
  createClass,
  getClassById,
  updateClass
} from '../controllers/class.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const classRouter = Router();

classRouter.get('/', protect, getClasses);
classRouter.get('/:id', protect, getClassById);
classRouter.post('/', protect, createClass);
classRouter.put('/:id', protect, updateClass);

export default classRouter;
