import { Router } from 'express';
import {
  createSubject,
  getAllSubjects
} from '../controllers/subject.controller.js';

const subjectRouter = Router();

subjectRouter.get('/', getAllSubjects);

subjectRouter.post('/', createSubject);

export default subjectRouter;
