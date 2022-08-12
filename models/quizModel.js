const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const OptionSchema = new mongoose.Schema({
  text: { type: String, required: "option is required" },
  isCorrect: {
    type: Boolean,
    required: true,
  },
});

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: "Question is required",
  },
  image: String,
  // text: String,
  points: { type: Number, required: "Points for the question is required" },
  negativePoints: { type: Number, default: 0 },
  options: [OptionSchema],
});

const UserScoreSchema = {
  user: {
    type: ObjectId,
    ref: "User",
    required: "userId is required",
  },
  score: { type: Number, required: "score of the highscorer user is required" },
};

const QuizSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: { type: String, required: true },
  questions: [questionSchema],
  category: {
    type: ObjectId,
    ref: "Category",
    required: "Category id of the Quiz is required",
  },
  highScore: [UserScoreSchema],
});
const Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = Quiz;
