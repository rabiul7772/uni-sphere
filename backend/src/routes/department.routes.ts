import { Router } from 'express';
import {
  createDepartment,
  getAllDepartments
} from '../controllers/department.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const departmentRouter = Router();

departmentRouter.get('/', getAllDepartments);

departmentRouter.post('/', protect, createDepartment);

export default departmentRouter;
