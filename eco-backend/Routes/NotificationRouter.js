import Router from 'express';
import { getAllNotifications, clearNotifications, markAsRead, getUnreadCount } from '../controllers/notificationController.js';
import { verifyToken } from '../Middleware/authMiddleware.js';

const NotificationRouter = Router();

NotificationRouter.get('/', verifyToken, getAllNotifications);
NotificationRouter.get('/count', verifyToken, getUnreadCount);
NotificationRouter.patch('/:id/read', verifyToken, markAsRead);
NotificationRouter.delete('/', verifyToken, clearNotifications);

export default NotificationRouter;