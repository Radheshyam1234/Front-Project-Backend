const Video = require("../models/VideoModel");

const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.status(200).json({ response: videos });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went Wrong",
      error,
    });
  }
};

const getVideoById = async (req, res) => {
  try {
    const { videoId } = req.params;
    const video = await Video.findById(videoId);

    if (video) {
      res.status(200).json({ response: video });
    } else return res.status(404).json({ message: "Video not found" });
  } catch (error) {
    res.status(500).json({
      message: "Request failed",
      error,
    });
  }
};

const getVideoByCategory = async (req, res) => {
  try {
    const { videoCategory } = rq.params;
    let videos = await Video.find({ category: videoCategory });
    res.status(200).json({ response: videos });
  } catch (error) {
    res.status(500).json({
      message: "Request failed",
      error,
    });
  }
};

const addNewVideo = async (req, res) => {
  try {
    const newVideo = new Video({ ...req.body });
    const addedVideo = await newVideo.save();
    res.status(201).json({ response: addedVideo });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Request failed please check errorMessage key for more details",
      errorMessage: error.message,
    });
  }
};

module.exports = {
  getAllVideos,
  getVideoById,
  addNewVideo,
  getVideoByCategory,
};
