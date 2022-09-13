const UserService = require("../services/userService");
const Users = require("../models/index").Users;
const { Jwt } = require("../apps/jwt");
const winston = require("winston");

// const loggerInstance = require("../logger/logger");
const {
  unauthorizedResponse,
  badRequestResponse,
  okResponse,
} = require("../helpers/customMessage");
const { raw } = require("body-parser");

//code usermanagement controller here
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
const loggerInstance = winston.createLogger({
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

// Add user
exports.signUp = async (req, res) => {
  try {
    const data = await UserService.signUp(req, res);
    if (data) {
      loggerInstance.info(data);
      return okResponse(req, res, data);
    } else {
      return badRequestResponse(req, res, "Something went wrong, try again");
    }
  } catch (e) {
    console.log(e);
  }
};

// Login User
exports.logIn = async (req, res) => {
  try {
    const data = await UserService.logIn(req, res);
    if (data) {
      loggerInstance.info(data);
      return okResponse(req, res, data);
    } else {
      return badRequestResponse(req, res, "Something went wrong, try again");
    }
  } catch (e) {
    console.log(e);
  }
};

// Log out User
exports.logOut = async (req, res) => {
  try {
    const data = await UserService.logOut(req, res);
    if (data) {
      loggerInstance.info(data);
      return okResponse(req, res, data);
    } else {
      return badRequestResponse(req, res, "Something went wrong, try again");
    }
  } catch (e) {
    console.log(e);
  }
};

// get user
exports.getUser = async (req, res) => {
  try {
    const data = await UserService.getUser(req, res);
    if (data) {
      loggerInstance.info(data);
      return okResponse(req, res, data);
    } else {
      return badRequestResponse(req, res, "Something went wrong, try again");
    }
  } catch (e) {
    console.log(e);
  }
};
