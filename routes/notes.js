const express = require("express");
const router = express.Router();

const {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
} = require("../controllers/notesController");
const requireLogin = require("../middleware/requireLogin");

router.use(requireLogin);

router.route("/video/:videoId").get(getNotes);
router.route("/").post(createNote);

router.param("noteId", getNote);
router.route("/:noteId").post(updateNote).delete(deleteNote);

module.exports = router;
