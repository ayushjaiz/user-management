import { Request, Response } from "express";
import { Role, UserModel } from "../models/user.model";
import { sendEmail } from "../services/send-email";
import { addEmailToQueue } from "../services/queue/queue";

export const updateRole = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;
        const { role } = req.body; // Expected "user" or "admin"

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

        if (!recipients || !message || !is_critical) {
            res.status(400).send({ error: "Missing required fields." });
            return;
        }

        // Fetch recipient availability & email
        const users = await UserModel.find(
            { _id: { $in: recipients } },
            { email: 1, available_time: 1 }
        );

        const currentTime = new Date().toISOString().slice(11, 16); // HH:mm format

        const emailTasks = users.map(async (user) => {
            const emailPayload = {
                email_id: user.email,
                subject: "New Notification",
                body: `<p>${message}</p>`,
            }

            const isAvailable = user.available_time.some(
                (slot) => currentTime >= slot.start && currentTime <= slot.end
            );

            if (isAvailable || is_critical) {
                return sendEmail(emailPayload);
            } else {
                // Find the nearest available time and schedule the email
                const nearestTime = user.available_time
                    .map((slot) => slot.start)
                    .sort()
                    .find((time) => time > currentTime);

                if (nearestTime) {
                    const [hours, minutes] = nearestTime.split(":").map(Number);

                    // Calculate delay in milliseconds until the nearest available time
                    const delay =
                        (hours * 60 + minutes - parseInt(currentTime.slice(0, 2)) * 60 - parseInt(currentTime.slice(3, 5))) * 60000;

                    // Add job to the queue for scheduling at the nearest available time
                    const jobPayload = {
                        delay,
                        email_details: emailPayload
                    }

                    await addEmailToQueue(jobPayload);
                }
            }
        });

        await Promise.all(emailTasks);

        res.status(200).send({ success: true, message: "Notifications processed successfully." });
    } catch (error) {
        console.error("Error sending notification:", error);
        res.status(500).send({ error: "Internal server error." });
    }
};