const { createClient } = require("redis");
const logger = require("./logger"); 

// Create Redis client
const redisClient = createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,
});

// Handle Redis client events
redisClient.on("error", (err) => logger.error("Redis Client Error", err));

redisClient
  .connect()
  .then(() => logger.info("Connected to Redis"))
  .catch((err) => logger.error("Redis Connection Error", err));

module.exports = redisClient;
