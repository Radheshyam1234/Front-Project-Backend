const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Product = require("./productModel");
const User = require("./userModel");

const CartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: ObjectId,
        ref: "Product",
      },
      quantity: Number,
    },
  ],
  belongingUser: {
    type: ObjectId,
    ref: "User",
  },
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
