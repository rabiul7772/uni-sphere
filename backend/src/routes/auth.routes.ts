import { Router } from 'express';
import {
  signup,
  login,
  logout,
  checkAuth
} from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const authRouter = Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.get('/check-auth', protect, checkAuth);

export default authRouter;
