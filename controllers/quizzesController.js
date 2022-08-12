const Quiz = require("../models/quizModel");
const Category = require("../models/quizCategoryModel");

const getQuizFromDb = async (req, res) => {
  try {
    const { quizId } = req.params;

    const quiz = await Quiz.findById(quizId)
      .lean()
      .populate({ path: "highScore.user", select: "firstName lastName" })
      .populate({ path: "category", select: "name" });

    if (!quiz) {
      return res
        .status(404)
        .json({ message: "Quiz associated with this id not found" });
    }

    const normalizedData = {
      ...quiz,
      category: quiz.category.name,
      highScore: quiz.highScore.map((item) => {
        const userName = item?.user?.firstname
          ? item?.user?.firstName + " " + item?.userId?.lastName
          : "Unknown";
        return {
          ...item,
          user: userName,
        };
      }),
    };

    res.status(200).json({ response: normalizedData });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Request failed please check errorMessage key for more details",
      errorMessage: error.message,
    });
  }
};

const createQuizAndUpdateCategory = async (req, res) => {
  try {
    const quizDetails = req.body;

    const categoryId = quizDetails.category;
    const categoryDetails = await Category.findById(categoryId);

    console.log(categoryDetails);

    if (!categoryDetails) {
      return res.status(404).json({ message: "category is invalid" });
    }
    let newQuiz = new Quiz(quizDetails);
    newQuiz = await newQuiz.save();

    categoryDetails.quizzes.push(newQuiz._id);
    await categoryDetails.save();

    res.status(200).json({ response: newQuiz });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Request failed please check errorMessage key for more details",
      errorMessage: error.message,
    });
  }
};

module.exports = {
  createQuizAndUpdateCategory,
  getQuizFromDb,
};
