import { Router } from 'express';
import { getAllDepartments } from '../controllers/department.controller.js';

const departmentRouter = Router();

departmentRouter.get('/', getAllDepartments);

export default departmentRouter;
