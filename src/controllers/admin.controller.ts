import { Request, Response } from "express";
import { Role, UserModel } from "../models/user.model";
import { addEmailToQueue } from "../services/queue/queue";
import { getDelay, getISTtime, isTimeWithinRange } from "../utils/time";

export const updateRole = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;
        const { role } = req.body;

        if (!Object.values(Role).includes(role)) {
            res.status(400).send({ status: false, error: "Invalid role" });
            return;
        }

        const updatedUser = await UserModel.findByIdAndUpdate(user_id, { role }, { new: true });

        if (!updatedUser) {
            res.status(404).send({ status: false, message: "User not found" });
            return;
        }

        res.send({
            status: true,
            message: "User role updated successfully",
            data: updatedUser,
        });
    } catch (error: any) {
        res.status(400).send({ status: false, error: error.message });
    }
}

export const sendNotification = async (req: Request, res: Response) => {
    try {
        const { recipients, message, is_critical } = req.body;

        // Ensure required fields exist and are valid
        if (!recipients?.length || !message || typeof is_critical !== "boolean") {
            res.status(400).json({ error: "Missing or invalid required fields." });
            return
        }

        // Fetch recipients' email
        const users = await UserModel.find(
            { _id: { $in: recipients } },
            { email: 1, availability_time: 1 }
        );

        if (!users.length) {
            res.status(404).json({ error: "No valid recipients found." });
            return;
        }

        const currentTime = getISTtime().toISOString().slice(11, 16); // HH:mm format

        const emailTasks = users.map(async (user) => {
            if (!user.availability_time?.length || !user.email) return;

            const emailPayload = {
                email_id: user.email,
                subject: "New Notification",
                body: `<p>${message}</p>`,
            };

            // Check if the user is available now
            const isAvailable = user.availability_time.some(
                (slot) => isTimeWithinRange(currentTime, slot.start, slot.end)
            );

            if (isAvailable || is_critical) {
                return addEmailToQueue({ delay: 0, email_details: emailPayload });
            }

            // Find the nearest future available time
            const nearestTime = user.availability_time
                .map(slot => slot.start)
                .sort()
                .find(time => time > currentTime);

            if (nearestTime) {
                return addEmailToQueue({ delay: getDelay(nearestTime, currentTime), email_details: emailPayload });
            }
        });

        await Promise.all(emailTasks);

        res.status(200).json({ success: true, message: "Notifications processed successfully." });
    } catch (error) {
        console.error("Error sending notification:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};