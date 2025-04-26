import { Router } from 'express'
import { authorizeRoles, verifyToken } from '../Middleware/authMiddleware.js';
import { calTotalRev, countOrders, countProducts, countUersClient } from '../controllers/analyticsController.js';

const analyticsRouter = Router();

analyticsRouter.get('/orders/count', verifyToken, authorizeRoles('admin'), countOrders);

analyticsRouter.get('/products/count', verifyToken, authorizeRoles('admin'), countProducts);

analyticsRouter.get('/client/count', verifyToken, authorizeRoles('admin'), countUersClient);

analyticsRouter.get('/revenue', verifyToken, authorizeRoles('admin'), calTotalRev);

export default analyticsRouter;

