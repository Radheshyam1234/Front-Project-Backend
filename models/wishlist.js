const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const WishlistSchema = new mongoose.Schema({
  products: [
    {
      type: ObjectId,
      ref: "Product",
    },
  ],
  belongingUser: {
    type: ObjectId,
    ref: "User",
  },
});

const Wishlist = mongoose.model("Wishlist", WishlistSchema);
module.exports = Wishlist;
