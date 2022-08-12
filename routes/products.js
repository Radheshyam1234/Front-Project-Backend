const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  addNewProduct,
} = require("../controllers/productsController");

router.route("/").get(getAllProducts).post(addNewProduct);
router.route("/:productId").get(getProductById);
module.exports = router;
