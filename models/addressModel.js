const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const addressSchema = new mongoose.Schema({
  belongingUser: {
    type: ObjectId,
    ref: "User",
  },

  name: String,
  street: String,
  city: String,
  state: String,
  country: String,
  pinCode: String,
  mobileNumber: String,
});

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;
