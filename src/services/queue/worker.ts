import { Worker, QueueEvents } from "bullmq";
import { redis } from "../../config/redis";
import { sendEmail } from "../send-email";

const emailQueueEvents = new QueueEvents("emailQueue", {
    connection: redis.duplicate(),
});

const emailWorker = new Worker(
    "email-queue",
    async (job) => {
        try {
            const { email_id, subject, body } = job?.data;
            await sendEmail({ email_id, subject, body });
        } catch (err) {
            throw err;
        }
    },
    {
        connection: redis.duplicate(),
    }
);

emailQueueEvents.on("completed", ({ jobId }) => {
    console.log("completed Job", { jobId });
});

emailQueueEvents.on("failed", ({ jobId, failedReason }) => {
    console.error("error", { jobId, failedReason });
});

export { emailWorker };