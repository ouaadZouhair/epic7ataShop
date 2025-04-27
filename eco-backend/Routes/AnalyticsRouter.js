import { Router } from 'express'
import { authorizeRoles, verifyToken } from '../Middleware/authMiddleware.js';
import { calTotalRev, countOrders, countProducts, countUersClient, getMonthlyRevenue, getDailyRevenue } from '../controllers/analyticsController.js';

const analyticsRouter = Router();

analyticsRouter.get('/orders/count', verifyToken, authorizeRoles('admin'), countOrders);

analyticsRouter.get('/products/count', verifyToken, authorizeRoles('admin'), countProducts);

analyticsRouter.get('/client/count', verifyToken, authorizeRoles('admin'), countUersClient);

analyticsRouter.get('/revenue', verifyToken, authorizeRoles('admin'), calTotalRev);

analyticsRouter.get('/revenue/monthly', verifyToken, authorizeRoles('admin'), getMonthlyRevenue);

analyticsRouter.get('/revenue/daily', verifyToken, authorizeRoles('admin'), getDailyRevenue);

export default analyticsRouter;

