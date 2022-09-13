"use strict";
const UserService = require("../services/UserService");
const Users = require("../models/index").Users;
const { Jwt } = require("./jwt");

class Token {
  async authenticate(req, res, next) {
    const bearerHearder = req.headers["authorization"];

    if (typeof bearerHearder != "undefined") {
      try {
        const bearer = bearerHearder.split(" ");
        const bearerToken = bearer[1];
        const decode = await new Jwt().verifyToken(bearerToken);
        const users = await Users.findOne({
          where: { user_id: decode.user_id },
        });
        // const users = await UserService.getUserByContact(decode.contact_no);

        req.user = decode;

        if (users.login_token === null) {
          return res.status(401).send(`User is unauthorised.`);
        } else if (users.login_token == bearerToken) {
          next();
        } else {
          return res.status(401).send(`you have been logged out`);
        }
      } catch {
        return res.status(401).send(`Your token is expired.`);
      }
    } else {
      return res.status(401).send("A token is required for authentication.");
    }
  }
}

module.exports = new Token().authenticate;
