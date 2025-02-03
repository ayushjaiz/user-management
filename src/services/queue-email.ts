// import { Queue, Worker, QueueScheduler } from 'bullmq';
// import { sendEmail } from "../utils/email";
// import { Redis } from 'ioredis';

// // Connect to Redis server
// const redis = new Redis({
//     host: "localhost", // Redis server address
//     port: 6379,        // Redis port
// });

// // Create a BullMQ queue for notification tasks
// const notificationQueue = new Queue('notificationQueue', {
//     redis: {
//         host: 'localhost',
//         port: 6379,
//     }
// });

// // Scheduler for jobs that may not be executed right away
// const scheduler = new QueueScheduler('notificationQueue', {
//     redis: {
//         host: 'localhost',
//         port: 6379,
//     }
// });

// // Worker to process notification jobs from the queue
// const notificationWorker = new Worker('notificationQueue', async (job) => {
//     const { email, message } = job.data;
//     try {
//         await sendEmail({
//             email_id: email,
//             subject: "New Notification",
//             body: `<p>${message}</p>`,
//         });
//     } catch (error) {
//         console.error('Error sending email in worker:', error);
//     }
// }, {
//     redis: {
//         host: 'localhost',
//         port: 6379,
//     }
// });
