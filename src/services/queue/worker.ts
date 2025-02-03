import { Worker, QueueEvents } from "bullmq";
import { redis } from "../../config/redis";
import { sendEmail } from "../send-email";

const emailQueueEvents = new QueueEvents("email-queue", {
    connection: redis.duplicate(),
});

// Worker to process email jobs
// Function to initialize the worker
export const initializeWorker = () => {
    const emailWorker = new Worker(
        "email-queue",
        async (job) => {
            try {
                const { email_id, subject, body } = job?.data; 

                await sendEmail({ email_id, subject, body });

                console.log(`✅ Email sent successfully to ${email_id}`);
            } catch (err) {
                console.error("❌ Error sending email:", err);
            }
        },
        {
            connection: redis.duplicate(),
        }
    );

    // Handle queue events
    emailQueueEvents.on("completed", ({ jobId }) => {
        console.log(`🎉 Job Completed: ${jobId}`);
    });

    emailQueueEvents.on("failed", ({ jobId, failedReason }) => {
        console.error(`⚠️ Job Failed: ${jobId}, Reason: ${failedReason}`);
    });
}
