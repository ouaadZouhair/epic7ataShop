import Notification from "../Models/Notification.js";


export const getAllNotifications = async (req, res) => {
    try {
        const userId = req.user.id;
        const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json({
            status: "success",
            notifications
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
}


export const getUnreadCount = async (req, res) => {
    try {
        const userId = req.user.id;
        const count = await Notification.countDocuments({ 
            user: userId, 
            isRead: false 
        });
        
        res.status(200).json({
            status: "success",
            count
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
}

export const clearNotifications = async (req, res) => {
    try {
        const userId = req.user.id;
        await Notification.deleteMany({ user: userId }); 
        res.status(200).json({
            status: "success",
            message: "All notifications cleared successfully"
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
}

export const markAsRead = async (req, res) => {
    try {
        const { notificationId } = req.body;
        const userId = req.user.id;

        const notification = await Notification.findOneAndUpdate(
            { _id: notificationId, user: userId },
            { isRead: true },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({
                status: "error",
                message: "Notification not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Notification marked as read",
            notification
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
}