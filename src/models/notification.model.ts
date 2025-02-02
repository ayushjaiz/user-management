import mongoose, { Document, Schema } from "mongoose";

export enum NotificationStatus {
    DELIVERED = "DELIVERED",
    QUEUED = "QUEUED",
}

export interface INotification {
    recipients: mongoose.Types.ObjectId[]; // Array of user IDs
    message: string;
    is_critical: boolean;
    status: NotificationStatus;
}

export interface INotificationDocument extends INotification, Document { }

const NotificationSchema = new Schema<INotificationDocument>(
    {
        recipients: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
        ],
        message: {
            type: String,
            required: true,
            trim: true,
        },
        is_critical: {
            type: Boolean,
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(NotificationStatus),
            default: NotificationStatus.QUEUED,
        }
    },
    { timestamps: { createdAt: "createdAt", updatedAt: false } }
);

export const NotificationModel = mongoose.model<INotificationDocument>(
    "Notification",
    NotificationSchema
);
