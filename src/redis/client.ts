// import { createClient } from 'redis';
// import { config } from '../config/env';

// const redisClient = createClient({
//     url: config.redisUrl
// });

// redisClient.on('error', (err) => {
//     console.log('Redis Client Error', err);
// });

// // Connect to Redis
// const connectToRedis = async () => {
//     try {
//         await redisClient.connect();
//         console.log('Connected to Redis successfully');
//     } catch (error) {
//         console.error('Could not connect to Redis', error);
//     }
// };

// connectToRedis()

// export default redisClient;