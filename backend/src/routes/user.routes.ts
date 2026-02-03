import { Router } from 'express';
import { getUsers } from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter.get('/', protect, getUsers);

export default userRouter;
