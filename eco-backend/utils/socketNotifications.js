export const emitNotification = (io, userId, notification) => {
    io.to(`user_${userId}`).emit('new_notification', notification);
};  