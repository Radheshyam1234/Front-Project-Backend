const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const NoteSchema = new mongoose.Schema({
  video: {
    type: ObjectId,
    ref: "Video",
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  time: {
    type: String,
  },
  belongingUser: {
    type: ObjectId,
    ref: "User",
  },
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
