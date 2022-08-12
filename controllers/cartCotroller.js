const Cart = require("../models/CartModel");

const createOrGetCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ belongingUser: req.user._id });
    if (!cart) {
      cart = new Cart({ products: [], belongingUser: req.user._id });
      cart = await cart.save();
    }
    req.cart = cart;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Request failed in create or get cart",
      error,
    });
  }
};

const populateCart = async (req, res) => {
  try {
    let cart = req.cart;

    cart = await cart.populate({
      path: "products.product",
      select: "name price image inStock discount",
    });

    res.status(200).json({ response: cart.products });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Request failed in Populate cart",
      error,
    });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const { product } = req.body;

    const cart = req.cart;
    cart.products.push({ product, quantity: 1 });

    let updatedcart = await cart.save();
    updatedcart = await cart.populate({
      path: "products.product",
      select: "name price image inStock discount",
    });
    res.status(200).json({ response: updatedcart.products });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Request failed in add or remove from cart",
      error,
    });
  }
};

const removeProductFromCart = async (req, res) => {
  try {
    const { product } = req.body;
    const cart = req.cart;

    const productObj = cart.products.find((prod) => {
      return prod.product._id == product._id;
    });
    console.log(productObj);

    await cart.products.pull({ _id: productObj._id });

    let updatedcart = await cart.save();
    updatedcart = await cart.populate({
      path: "products.product",
      select: "name price image inStock discount",
    });

    res.status(200).json({ response: updatedcart.products });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Request failed in add or remove from cart",
      error,
    });
  }
};

const updateQuantity = async (req, res) => {
  try {
    const { product, increase } = req.body;

    const cart = req.cart;
    // cart.products.push({ product, quantity: 1 });

    cart.products.find((prod) => {
      if (prod.product._id == product._id) {
        increase ? (prod.quantity += 1) : (prod.quantity -= 1);
        console.log(prod);
      }
    });

    let updatedcart = await cart.save();

    updatedcart = await cart.populate({
      path: "products.product",
      select: "name price image inStock discount",
    });

    // res.status(200).json({ response: updatedcart });
    res.status(200).json({ response: updatedcart.products });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Request failed in add or remove from cart",
      error,
    });
  }
};

module.exports = {
  createOrGetCart,
  populateCart,
  addProductToCart,
  removeProductFromCart,
  updateQuantity,
};
