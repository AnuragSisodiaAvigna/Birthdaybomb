const winston = require("winston");

// Loggers
const transports = [];
if (process.env.NODE_ENV != "dev" && process.env.NODE_ENV != "staging") {
  transports.push(
    new winston.transports.File({
      filename: "infos.log",
      level: "info",
    }),
    new winston.transports.File({
      filename: "errors.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "warnings.log",
      level: "warn",
    })
  );
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat()
      ),
    })
  );
}

const loggerInstance = () =>
  winston.createLogger({
    level: "",
    levels: winston.config.npm.levels,
    format: winston.format.combine(
      winston.format.simple({
        format: "abc",
      }),
      winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      winston.format.json()
    ),
    transports,
  });

module.exports = { loggerInstance };
