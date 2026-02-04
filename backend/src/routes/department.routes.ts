import { Router } from 'express';
import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment
} from '../controllers/department.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const departmentRouter = Router();

departmentRouter.get('/', getAllDepartments);
departmentRouter.get('/:id', getDepartmentById);

departmentRouter.post('/', protect, createDepartment);
departmentRouter.patch('/:id', protect, updateDepartment);

export default departmentRouter;
