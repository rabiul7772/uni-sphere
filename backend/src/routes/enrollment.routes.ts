import { Router } from 'express';
import { enrollInClass } from '../controllers/enrollment.controller.js';

const router = Router();

router.post('/', enrollInClass);

export default router;
