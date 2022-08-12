const Product = require("../models/productModel");

const addNewProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      image,
      category,
      brand,
      inStock,
      fastDelivery,
      rating,
    } = req.body;

    const NewProduct = new Product({
      name,
      price,
      image,
      category,
      brand,
      inStock,
      fastDelivery,
      rating,
    });
    const addedProduct = await NewProduct.save();
    res.status(201).json({ response: addedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Request failed please check errorMessage key for more details",
      errorMessage: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ response: products });
  } catch (error) {
    res.status(500).json({
      message: "Request failed",
      error,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    console.log(productId);
    const product = await Product.findById(productId);
    if (product) {
      return res.status(200).json({ response: product });
    }
    return res.status(500).json({ message: "Product not found" });
  } catch (error) {
    res.status(500).json({
      message: "Request failed",
      error,
    });
  }
};

module.exports = {
  addNewProduct,
  getAllProducts,
  getProductById,
};
