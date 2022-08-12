const express = require("express");
const router = express.Router();

const {
  createOrGetPlaylists,
  createNewPlaylist,
  getPlaylist,
  updatePlaylist,
  deletePlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
} = require("../controllers/playlistController");

const requireLogin = require("../middleware/requireLogin");
router.use(requireLogin);

router.route("/").get(createOrGetPlaylists).post(createNewPlaylist);

router.param("playlistId", getPlaylist);
router
  .route("/:playlistId/videos")
  .post(addVideoToPlaylist)
  .delete(removeVideoFromPlaylist);

//router.route("/:playlistId").post(updatePlaylist).delete(deletePlaylist);

module.exports = router;
