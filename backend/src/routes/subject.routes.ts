import { Router } from 'express';
import { getAllSubjects } from '../controllers/subject.controller.js';

const subjectRouter = Router();

subjectRouter.get('/', getAllSubjects);

export default subjectRouter;
