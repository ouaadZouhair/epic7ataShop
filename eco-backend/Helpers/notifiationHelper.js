import Notification from "../Models/Notification.js";
import User from "../Models/User.js";
import { emitNotification } from '../utils/socketNotifications.js';


export const createNotification = async (io, userId, message, type, link = '') => {
    try {
        const notification = new Notification({
            user: userId,
            message,
            type,
            link
        });
        await notification.save();
        
        // Emit socket event
        // const io = req.app.get('io');
        if (io) {
            emitNotification(io, userId, notification);
        }
        
        return notification;
    } catch (error) {
        console.error("Error creating notification:", error);
    }
};

export const notifyAdmin = async (io, message, type, link = '') => {
    try {
        // Find all admin users
        const admins = await User.find({ role: 'admin' });
        
        // Create notifications for each admin
        const notificationPromises = admins.map(admin => 
            createNotification(io, admin._id, message, type, link)
        );
        
        await Promise.all(notificationPromises);
    } catch (error) {
        console.error("Error notifying admins:", error);
    }
};