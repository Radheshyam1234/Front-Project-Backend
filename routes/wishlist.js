const express = require("express");
const router = express.Router();

const {
  createOrGetWishlist,
  populateWishlist,
  addProductToWishlist,
  removeProductFromWishlist,
} = require("../controllers/wishlistController");
const requireLogin = require("../middleware/requireLogin");

// The router.use() function uses the specified middleware function or functions. It basically mounts middleware for the routes which are being served by the specific router.
router.use(requireLogin);
router.use(createOrGetWishlist);

router
  .route("/")
  .get(populateWishlist)
  .post(addProductToWishlist)
  .delete(removeProductFromWishlist);

module.exports = router;
