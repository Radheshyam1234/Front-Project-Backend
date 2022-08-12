const express = require("express");
const router = express.Router();

const {
  createQuizAndUpdateCategory,
  getQuizFromDb,
} = require("../controllers/quizzesController");

router.route("/").post(createQuizAndUpdateCategory);
router.route("/:quizId").get(getQuizFromDb);

module.exports = router;
