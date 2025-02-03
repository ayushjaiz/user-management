import { Queue, JobsOptions } from "bullmq";
import { redis } from "../../config/redis";
import { emailPayload } from "../send-email";

const emailQueue = new Queue("email-queue", {
    connection: redis.duplicate(),
});

emailQueue.on("error", (err: Error) => {
    console.error("Queue Error:", err.message);
});

const getEmailQueueOptions = (jobDelay: number): JobsOptions => {
    return {
        removeOnComplete: {
            age: 3600, // Keep completed jobs for 1 hour
            count: 1000, // Keep up to 1000 completed jobs
        },
        removeOnFail: {
            age: 24 * 3600, // Keep failed jobs for 24 hours
        },
        delay: jobDelay,
        attempts: 3, // Retry up to 3 times
        backoff: {
            type: "exponential",
            delay: 1000, // 1s, 2s, 4s exponential backoff
        },
    };
};

export interface JobPayload {
    delay: number;
    email_details: emailPayload;
}

const addEmailToQueue = async (payload: JobPayload) => {
    try {
        const job = await emailQueue.add("email", payload.email_details, getEmailQueueOptions(payload.delay));
        console.log(`✅ Email job added successfully! Job ID: ${job.id} with delay ${payload.delay}`);
        return job;
    } catch (error) {
        console.error(`❌ Failed to add email job:`, error);
        throw error;
    }
};

export { addEmailToQueue };