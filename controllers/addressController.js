const Address = require("../models/addressModel");

const getUserAllAddress = async (req, res) => {
  try {
    const addresses = await Address.find({ belongingUser: req.user._id });
    return res.status(200).json({ response: addresses });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Request failed please check errorMessage key for more details",
      errorMessage: error.message,
    });
  }
};

const updateAddress = async (req, res) => {};

const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.addressId);
    await address.remove();
    const updatedAddresses = await Address.find({
      belongingUser: req.user._id,
    });
    return res.status(200).json({ response: updatedAddresses });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Request failed please check errorMessage key for more details",
      errorMessage: error.message,
    });
  }
};

const getAddress = async (req, res) => {};

const addNewAddress = async (req, res) => {
  try {
    let newAddress = new Address({ belongingUser: req.user._id, ...req.body });
    await newAddress.save();
    const updatedAddresses = await Address.find({
      belongingUser: req.user._id,
    });
    res.status(200).json({ response: updatedAddresses });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Request failed please check errorMessage key for more details",
      errorMessage: error.message,
    });
  }
};

module.exports = {
  getAddress,
  getUserAllAddress,
  updateAddress,
  deleteAddress,
  addNewAddress,
};
