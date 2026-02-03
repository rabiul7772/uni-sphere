import { Router } from 'express';
import {
  createSubject,
  getAllSubjects
} from '../controllers/subject.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const subjectRouter = Router();

subjectRouter.get('/', getAllSubjects);

subjectRouter.post('/', protect, createSubject);

export default subjectRouter;
