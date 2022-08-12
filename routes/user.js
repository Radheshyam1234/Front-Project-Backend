const express = require("express");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin");

const {
  createNewUser,
  AuthenticateUser,
  getUserDetailsFromDb,
  editUserProfile,
} = require("../controllers/userController");

router.post("/", createNewUser);

router.route("/authenticate").post(AuthenticateUser);
router.route("/myprofile").get(requireLogin, getUserDetailsFromDb);
router.route("/editprofile").post(requireLogin, editUserProfile);

module.exports = router;
