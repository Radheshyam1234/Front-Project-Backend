const Wishlist = require("../models/wishlist");

const createOrGetWishlist = async (req, res, next) => {
  try {
    let wishlist = await Wishlist.findOne({ belongingUser: req.user._id });
    if (!wishlist) {
      wishlist = new Wishlist({ products: [], belongingUser: req.user._id });
      wishlist = await wishlist.save();
    }
    req.wishlist = wishlist;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Request failed in create or get wishlist",
      error,
    });
  }
};

const populateWishlist = async (req, res) => {
  try {
    let wishlist = req.wishlist;

    wishlist = await wishlist.populate({
      path: "products",
      select: "name price image category brand inStock fastDelivery discount",
    });
    console.log(wishlist.products);

    res.status(200).json({ response: wishlist.products });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Request failed in Populate wishlist",
      error,
    });
  }
};

const addProductToWishlist = async (req, res) => {
  try {
    const { product } = req.body;
    const wishlist = req.wishlist;

    console.log(product);
    wishlist.products.push(product);

    let updatedWishlist = await wishlist.save();

    updatedWishlist = await wishlist.populate({
      path: "products",
      select: "name price image category brand inStock fastDelivery discount",
    });

    res.status(200).json({ response: updatedWishlist.products });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Request failed in add or remove from wishlist",
      error,
    });
  }
};

const removeProductFromWishlist = async (req, res) => {
  try {
    const { product } = req.body;
    const wishlist = req.wishlist;

    await wishlist.products.pull({ _id: product._id });

    let updatedWishlist = await wishlist.save();

    updatedWishlist = await wishlist.populate({
      path: "products",
      select: "name price image category brand inStock fastDelivery discount",
    });

    res.status(200).json({ response: updatedWishlist.products });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Request failed in add or remove from wishlist",
      error,
    });
  }
};

module.exports = {
  createOrGetWishlist,
  populateWishlist,
  addProductToWishlist,
  removeProductFromWishlist,
};
