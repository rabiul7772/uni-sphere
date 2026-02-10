import { Router } from 'express';
import {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject
} from '../controllers/subject.controller.js';
import { protect, authorize } from '../middlewares/auth.middleware.js';

const subjectRouter = Router();

subjectRouter.get('/', getAllSubjects);
subjectRouter.get('/:id', getSubjectById);

subjectRouter.patch(
  '/:id',
  protect,
  authorize('admin', 'teacher'),
  updateSubject
);

subjectRouter.post('/', protect, authorize('admin', 'teacher'), createSubject);

export default subjectRouter;
