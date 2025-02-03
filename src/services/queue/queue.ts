import { delay, Queue } from "bullmq";
import { redis } from "../../config/redis";
import { emailPayload } from "../send-email";

const emailQueue = new Queue("email-queue", {
    connection: redis.duplicate(),
});

emailQueue.on("error", (err: any) => {
    console.log(err.message);
});

const emailQueueOptions = (delay: number) => {
    return {
        removeOnComplete: {
            age: 3600, // keep up to 1 hour
            count: 1000, // keep up to 1000 jobs
        },
        removeOnFail: {
            age: 24 * 3600, // keep up to 24 hours 24 * 3600
        },
        delay,
        // Add a job that will be delayed by at least 5 seconds.
        // delay: 5000,
        // Backoff function with a 1-second delay as a seed value,
        // so it will retry at most 3 times spaced after 1 second, 2 seconds, and 4 seconds respectively
        attempts: 3,
        backoff: {
            type: "exponential",
            delay: 1000,
        },
    }
};

interface jobPayload {
    delay: number;
    email_details: emailPayload;
}

const addEmailToQueue = (payload: jobPayload) => {
    return emailQueue.add("email", payload.email_details, emailQueueOptions(payload.delay));
};

export { addEmailToQueue };