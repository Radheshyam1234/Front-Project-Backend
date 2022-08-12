const mongoose = require("mongoose");

const VideoUploaderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Uploader name is required",
  },
  image: { type: String },
});

const VideoUploader = mongoose.model("VideoUploader", VideoUploaderSchema);
module.exports = VideoUploader;
