const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const CategorySchema = new mongoose.Schema({
  image: { type: String, require: "Image of the category is required" },
  name: {
    type: String,
    require: "Name of the category is required",
    unique: "category name should be unique",
  },

  quizzes: [{ type: ObjectId, ref: "Quiz" }],
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
