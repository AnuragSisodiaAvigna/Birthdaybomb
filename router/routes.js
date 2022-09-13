"use strict";

const express = require("express");
const router = express.Router();
const userManagementController = require("../controllers/userManagement");
const jwt_authentication = require("../apps/jwt_auth");

//Code routes here

//Route for Sign Up
router.post("/sign-up", userManagementController.signUp);

//Route for Login
router.post("/login", userManagementController.logIn);

//Route for Log Out
router.post("/logout", jwt_authentication, userManagementController.logOut);

//Route for get user
router.get("/get-user", jwt_authentication, userManagementController.getUser);

module.exports = router;
