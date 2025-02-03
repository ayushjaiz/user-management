import Redis from "ioredis";
import { envConfig } from "./env";

const redis = new Redis(envConfig.redisUrl, { maxRetriesPerRequest: null });

export { redis };