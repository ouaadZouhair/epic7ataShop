import { Router } from 'express';
import { logIn, signUp } from '../controllers/authController.js';

const authRouter = Router();

// User Registration / route -> /api/v1/auth/signUp
authRouter.post('/signUp', signUp);

// User Log In / route -> /api/v1/auth/logIn
authRouter.post('/logIn', logIn);

export default authRouter;
