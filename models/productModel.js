const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  image: {
    type: String,
  },

  category: {
    type: String,
    required: true,
  },

  brand: {
    type: String,
  },

  inStock: {
    type: Boolean,
    default: true,
  },

  fastDelivery: {
    type: Boolean,
    default: false,
  },
  discount: {
    type: Number,
    default: 0,
  },

  rating: {
    starRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
  },
  // avilableQty: {
  //   type: Number,
  //   required: true,
  // },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
