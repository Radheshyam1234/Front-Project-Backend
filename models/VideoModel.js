const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  videoId: {
    type: String,
    required: true,
  },
  channelName: {
    type: String,
    required: true,
  },
  channelImageURL: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  publishDate: {
    type: String,
    required: true,
  },
  viewCount: {
    type: Number,
    required: true,
  },
});

const Video = mongoose.model("Video", VideoSchema);
module.exports = Video;
