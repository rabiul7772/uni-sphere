import { Router } from 'express';
import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment
} from '../controllers/department.controller.js';
import { protect, authorize } from '../middlewares/auth.middleware.js';

const departmentRouter = Router();

departmentRouter.get('/', getAllDepartments);
departmentRouter.get('/:id', getDepartmentById);

departmentRouter.post(
  '/',
  protect,
  authorize('admin', 'teacher'),
  createDepartment
);
departmentRouter.patch(
  '/:id',
  protect,
  authorize('admin', 'teacher'),
  updateDepartment
);

export default departmentRouter;
