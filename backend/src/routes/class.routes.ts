import { Router } from 'express';
import { getClasses, createClass } from '../controllers/class.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const classRouter = Router();

classRouter.get('/', protect, getClasses);
classRouter.post('/', protect, createClass);

export default classRouter;
