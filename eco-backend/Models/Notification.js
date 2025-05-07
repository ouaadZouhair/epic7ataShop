import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    link: { type: String, required: false },
    type: { type: String, enum: ['info', 'warning', 'success', 'error'] },
    createdAt: { type: Date, default: Date.now },
})

const Notification = mongoose.model("Notification", NotificationSchema);
export default Notification;