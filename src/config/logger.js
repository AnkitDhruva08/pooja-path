const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, colorize } = format;

// Custom log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Create the logger
const logger = createLogger({
  level: "info", // Default log level
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Add timestamp
    colorize(), // Add colors for console logs
    logFormat // Custom log format
  ),
  transports: [
    new transports.Console(), // Log to console
    new transports.File({ filename: "logs/error.log", level: "error" }), // Log errors to a file
    new transports.File({ filename: "logs/combined.log" }) // Log all messages to a file
  ],
});

module.exports = logger;
