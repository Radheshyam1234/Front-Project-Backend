const QuizAttempt = require("../models/UserQuizAttemptModel");

const getAttemptDetailsForQuizOfUser = async (req, res) => {
  try {
    const { quizId } = req.params;
    const user = req.get("user");
    const userAttempts = await QuizAttempt.find(
      {
        user,
        quiz,
      },
      { score: 1, createdAt: 1 }
    );
    res.status(200).json({ response: userAttempts });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Request failed please check errorMessage key for more details",
      errorMessage: error.message,
    });
  }
};

const addAttempts = async (req, res) => {
  try {
    const attemptDetails = req.body;
    const newAttempt = new QuizAttempt(attemptDetails);
    await newAttempt.save();
    res.json({ response: newAttempt });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Request failed please check errorMessage key for more details",
      errorMessage: error.message,
    });
  }
};

module.exports = { getAttemptDetailsForQuizOfUser, addAttempts };
