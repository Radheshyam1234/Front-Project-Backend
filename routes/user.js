const express = require("express");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin");

const {
  createNewUser,
  AuthenticateUser,
} = require("../controllers/userController");

router.post("/", createNewUser);

router.route("/authenticate").post(AuthenticateUser);

module.exports = router;
