const express = require("express");
const router = express.Router();
const {
  createOrGetCart,
  populateCart,
  addProductToCart,
  removeProductFromCart,
  updateQuantity,
} = require("../controllers/cartCotroller");
const requireLogin = require("../middleware/requireLogin");

router.use(requireLogin);
router.use(createOrGetCart);
router
  .route("/")
  .get(populateCart)
  .post(addProductToCart)
  .delete(removeProductFromCart)
  .patch(updateQuantity);

module.exports = router;
