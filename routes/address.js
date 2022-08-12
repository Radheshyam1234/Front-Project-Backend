const express = require("express");
const router = express.Router();
const {
  getUserAllAddress,
  updateAddress,
  deleteAddress,
  getAddress,
  addNewAddress,
} = require("../controllers/addressController");
const requireLogin = require("../middleware/requireLogin");

router.use(requireLogin);

router.route("/").get(getUserAllAddress).post(addNewAddress);

//router.param("addressId", getAddress);
router.route("/:addressId").post(updateAddress).delete(deleteAddress);

module.exports = router;
