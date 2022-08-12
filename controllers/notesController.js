const Note = require("../models/noteModel");

const getNotes = async (req, res) => {
  try {
    const { videoId } = req.params;
    // console.log(videoId);
    const notes = await Note.find({
      belongingUser: req.user._id,
      video: videoId,
    });

    res.status(200).json({ response: notes });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: " Something went wrong",
      errorMessage: error.message,
    });
  }
};

const getNote = async (req, res, next, noteId) => {
  try {
    const note = await Note.findOne({
      _id: noteId,
      belongingUser: req.user._id,
    });

    if (!note) {
      res.status(404).json({ message: "Note is not associated with the user" });
      return;
    }

    req.note = note;
    next();
  } catch (error) {
    console.error(error);
    res.status(404).json({
      message: "Something went wrong",
      errorMessage: error.message,
    });
  }
};

const createNote = async (req, res) => {
  try {
    let newNote = new Note({ ...req.body, belongingUser: req.user._id });
    newNote = await newNote.save();
    res.status(201).json({ response: newNote });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: " Something went wrong",
      errorMessage: error.message,
    });
  }
};

const updateNote = async (req, res) => {
  try {
    const updatedData = req.body;
    let { note } = req;
    note.title = updatedData.title;
    note.description = updatedData.description;
    note = await note.save();
    res.status(200).json({ response: note });
  } catch (error) {
    console.error(error);
    res.status(404).json({
      message: "Something went wrong",
      errorMessage: error.message,
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    let { note } = req;
    note = await note.remove();
    res.status(200).json({ response: note });
  } catch (error) {
    console.error(error);
    res.status(404).json({
      message: "Something went wrong",
      errorMessage: error.message,
    });
  }
};

module.exports = {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
};
