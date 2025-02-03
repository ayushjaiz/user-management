import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { addEmailToQueue } from "../services/queue/queue";
import { sendEmail } from "../services/send-email";

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const id = req?.user?.id;

        const updatedUser = await UserModel.findByIdAndUpdate((id), req);

        if (!updatedUser) {
            res.status(404).send({ status: false, message: "User not found" });
            return;
        }

        res.send({
            status: true,
            message: "Profile updated sucessfully",
            data: updatedUser,
        });
    } catch (error: any) {
        res.status(400).send({ status: false, error: error.message });
    }
};

export const sendNotification = async (req: Request, res: Response) => {
    try {
        const { recipients, message } = req.body;

        if (!recipients || !message) {
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

            if (isAvailable) {
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