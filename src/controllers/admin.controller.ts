import { Request, Response } from "express";
import { Role, UserModel } from "../models/user.model";
import { sendEmail } from "../services/send-email";

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
            return res.status(400).send({ error: "Missing required fields." });
        }

        // Fetch recipient availability & email
        const users = await UserModel.find(
            { _id: { $in: recipients } },
            { email: 1, available_time: 1 }
        );

        const currentTime = new Date().toISOString().slice(11, 16); // HH:mm format

        const emailTasks = users.map((user) => {
            const isAvailable = user.available_time.some(
                (slot) => currentTime >= slot.start && currentTime <= slot.end
            );

            if (isAvailable || is_critical) {
                return sendEmail({
                    email_id: user.email,
                    subject: "New Notification",
                    body: `<p>${message}</p>`,
                });
            } else {
                // Find the nearest available time and schedule the email
                const nearestTime = user.available_time
                    .map((slot) => slot.start)
                    .sort()
                    .find((time) => time > currentTime);

                // if (nearestTime) {
                //     const [hours, minutes] = nearestTime.split(":").map(Number);
                //     cron.schedule(`${minutes} ${hours} * * *`, () => {
                //         sendEmail({
                //             email_id: user.email,
                //             subject: "New Notification",
                //             body: `<p>${message}</p>`,
                //         });
                //     });
                // }
            }
        });

        await Promise.all(emailTasks);

        res.status(200).send({ success: true, message: "Notifications processed successfully." });
    } catch (error) {
        console.error("Error sending notification:", error);
        res.status(500).send({ error: "Internal server error." });
    }
};