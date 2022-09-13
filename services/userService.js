"use strict";

const multer = require("multer");

const Users = require("../models/index").Users;
const Groups = require("../models/index").Groups;
const Songs = require("../models/index").Songs;
const path = require("path");
const sequelize = require("sequelize");
const { Jwt } = require("../apps/jwt");

// Get users by email
class Userservice {
  static async getUserByContact(contact_no) {
    try {
      const user = await Users.findOne({
        where: { contact_no: contact_no },
        include: [{ model: Groups, as: "groups" }],
      });
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  //Add user
  static async signUp(req) {
    try {
      const { name, contact_no, email, gender, age, address } = req.body;
      await Users.create({
        name: name,
        contact_no: contact_no,
        email: email,
        age: age,
        gender: gender,
        address: address,
      });
      return `Welcome ${name}.`;
    } catch (error) {
      console.log(error);
    }
  }

  //Login user
  static async logIn(req, res) {
    try {
      const { contact_no, password } = req.body;
      const data = await Users.findOne({ where: { contact_no: contact_no } })
      if (data) {
        const user_id = data.user_id
        const loginToken = new Jwt().createToken({
          user_id: user_id,
        });
        if (data.password == password) {
          data.update({
            login_token: loginToken,
          })
          return "User authorised " + "Login Token:" + loginToken
        } else {
          return "User is not authorised "
        }
      } else {
        return "No user found"
      }
    } catch (error) {
      console.log(error);
    }
  }


  //log Out user
  static async logOut(req, res) {
    try {
      const user_id = req.user.user_id;
      console.log("22222222222222", user_id);
      const user = await Users.findOne({ where: { user_id: user_id } })
      if (user) {
        await user.update({ login_token: null });
        return `${user.name} Log Out successfully`
      } else {
        return "No User Found"
      }
    } catch (error) {
      console.log(error);
    }
  }

  //Get user
  static async getUser(req, res) {
    try {
      const user_id = req.user.user_id;
      const data = await Users.findOne({ where: { user_id: user_id } })
      const name = data.name
      return `Welcome ${name}`;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Userservice;
