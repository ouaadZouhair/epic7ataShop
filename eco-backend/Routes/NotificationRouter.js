import Router from 'express';
import { getAllNotifications, clearNotifications, markAsRead, markAllAsRead, getUnreadCount } from '../controllers/notificationController.js';
import { verifyToken } from '../Middleware/authMiddleware.js';

const NotificationRouter = Router();

NotificationRouter.get('/', verifyToken, getAllNotifications);
NotificationRouter.get('/count', verifyToken, getUnreadCount);
NotificationRouter.patch('/markAsRead', verifyToken, markAsRead);
NotificationRouter.patch('/allMarkAsRead', verifyToken, markAllAsRead)
NotificationRouter.delete('/', verifyToken, clearNotifications);

export default NotificationRouter;