import { Router } from 'express';
import {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject
} from '../controllers/subject.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const subjectRouter = Router();

subjectRouter.get('/', getAllSubjects);
subjectRouter.get('/:id', getSubjectById);

subjectRouter.patch('/:id', protect, updateSubject);

subjectRouter.post('/', protect, createSubject);

export default subjectRouter;
