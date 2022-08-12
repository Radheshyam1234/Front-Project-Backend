const express = require("express");
const router = express.Router();

const {
  getAllVideos,
  getVideoByCategory,
  getVideoById,
  addNewVideo,
} = require("../controllers/videosController");

router.route("/").get(getAllVideos).post(addNewVideo);
router.route("/:videoId").get(getVideoById);
router.route("/category/:videoCategory").get(getVideoByCategory);

module.exports = router;
