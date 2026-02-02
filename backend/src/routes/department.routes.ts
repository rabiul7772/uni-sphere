import { Router } from 'express';
import {
  createDepartment,
  getAllDepartments
} from '../controllers/department.controller.js';

const departmentRouter = Router();

departmentRouter.get('/', getAllDepartments);

departmentRouter.post('/', createDepartment);

export default departmentRouter;
