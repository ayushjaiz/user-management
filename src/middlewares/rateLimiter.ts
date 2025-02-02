// import { Request, Response, NextFunction } from "express";
// import redisClient from "../redis/client";

// interface RateLimiterOptions {
//     windowInSeconds: number;
//     maxRequests: number;
// }

// const getClientIp = (req: Request): string => {
//     return (req.headers['x-forwarded-for'] as string || req.socket.remoteAddress || '').split(',')[0].trim();
// };

// const rateLimiter = ({ windowInSeconds, maxRequests }: RateLimiterOptions) => {
//     return async (req: Request, res: Response, next: NextFunction) => {
//         const clientIp = getClientIp(req);
//         const requestUrl = req.url;
//         const rateLimitKey = `rate-limit:${clientIp}:${requestUrl}`;
//         const now = Date.now();

//         // Define the start of current window
//         const currentTimeWindowStart = now - windowInSeconds * 1000;

//         // Remove timestamps that are outside the current window
//         await redisClient.zRemRangeByScore(rateLimitKey, 0, currentTimeWindowStart);

//         const requestCount = await redisClient.zCard(rateLimitKey);

//         if (requestCount >= maxRequests) {
//             res.status(429).json({ status: "Too many requests" });
//             return;
//         }

//         // Add the current timestamp
//         await redisClient.zAdd(rateLimitKey, [{ score: now, value: now.toString() }]);

//         // Set expiry on the key
//         await redisClient.expire(rateLimitKey, windowInSeconds);

//         next();
//     };
// };

// export { rateLimiter };