import { Router } from 'express';
import { getUsers, getUserById } from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter.get('/', protect, getUsers);
userRouter.get('/:id', protect, getUserById);

export default userRouter;
