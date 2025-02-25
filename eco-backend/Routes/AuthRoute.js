import { Router } from 'express';
import { authenticated, logIn, logOut, signUp } from '../controllers/authController.js';
import { verifyToken } from '../Middleware/authMiddleware.js';

const authRouter = Router();

// User Registration / route -> /api/v1/auth/signUp
authRouter.post('/signUp', signUp);

// User Log In / route -> /api/v1/auth/logIn
authRouter.post('/logIn', logIn);

// User log Out / route -> /api/v1/auth/logIn
authRouter.get('/logout', logOut)

authRouter.get("/me", verifyToken, authenticated)

export default authRouter;
