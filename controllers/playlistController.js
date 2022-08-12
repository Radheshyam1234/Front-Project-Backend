const Playlist = require("../models/PlaylistModel");

const createOrGetPlaylists = async (req, res) => {
  try {
    // constbelongingUser:req.user._id = req.user._id;

    let playlists = await Playlist.find(
      { belongingUser: req.user._id }
      //{belongingUser:req.user._id: 0 }
    ).populate({
      path: "videos.video",
    });

    if (playlists.length === 0) {
      let watchlaterPlaylist = new Playlist({
        belongingUser: req.user._id,
        type: "watchlater",
        videos: [],
      });
      let historyPlaylist = new Playlist({
        belongingUser: req.user._id,
        type: "history",
        videos: [],
      });
      let likedPlaylist = new Playlist({
        belongingUser: req.user._id,
        type: "liked",
        videos: [],
      });
      await Playlist.insertMany([
        watchlaterPlaylist,
        historyPlaylist,
        likedPlaylist,
      ]);
      // watchlaterPlaylist.userId = undefined;
      // historyPlaylist.userId = undefined;
      // likedPlaylist.userId = undefined;
      res.status(201).json({
        response: {
          watchlaterPlaylist,
          historyPlaylist,
          likedPlaylist,
          customPlaylist: [],
        },
      });
      return;
    }

    const historyPlaylist = playlists.find((item) => item.type === "history");
    const likedPlaylist = playlists.find((item) => item.type === "liked");
    const watchlaterPlaylist = playlists.find(
      (item) => item.type === "watchlater"
    );
    const customPlaylist = playlists.filter((item) => item.type === "custom");

    res.status(200).json({
      response: {
        watchlaterPlaylist,
        historyPlaylist,
        likedPlaylist,
        customPlaylist,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
      errorMessage: error.message,
    });
  }
};

const createNewPlaylist = async (req, res) => {
  try {
    let newPlaylist = req.body;
    const belongingUser = req.user._id;
    newPlaylist = new Playlist({ ...newPlaylist, belongingUser });
    newPlaylist = await newPlaylist.save();
    newPlaylist = await newPlaylist.populate({
      path: "videos.video",
      select:
        "title category thumbnail videoId channelName channelImageUR description publishDate  viewCount",
    });
    //newPlaylist.userId = undefined;
    res.status(201).json({ response: newPlaylist });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
      errorMessage: error.message,
    });
  }
};

const getPlaylist = async (req, res, next, playlistId) => {
  try {
    const playlist = await Playlist.findOne({
      _id: playlistId,
      belongingUser: req.user._id,
    });

    if (!playlist) {
      res
        .status(404)
        .json({ message: "Playlist is not associated with the user" });
    }
    req.playlist = playlist;
    next();
  } catch (error) {
    console.error(error);
    res.status(404).json({
      message: "Something went wrong",
      errorMessage: error.message,
    });
  }
};

const addVideoToPlaylist = async (req, res) => {
  try {
    let { playlist } = req;
    const VideoToAdd = req.body;

    playlist.videos.push(VideoToAdd);
    playlist = await playlist.save();
    playlist = await playlist.populate({
      path: "videos.video",
      select:
        "title category thumbnail videoId channelName channelImageURL description publishDate  viewCount",
    });
    // playlist.userId = undefined;
    res.status(201).json({ response: playlist });
  } catch (error) {
    console.log(error);
  }
};

const removeVideoFromPlaylist = async (req, res) => {
  try {
    let { playlist } = req;
    const VideoToRemove = req.body;

    let updatedVideos = playlist.videos.filter(
      (video) => video.video._id != VideoToRemove.video._id
    );

    playlist.videos = updatedVideos;
    playlist = await playlist.save();

    playlist = await playlist.populate({
      path: "videos.video",
      select:
        "title category thumbnail videoId channelName channelImageURL description publishDate  viewCount",
    });

    res.status(201).json({ response: playlist });
  } catch (error) {
    console.log(error);
  }
};

// const updatePlaylist = async (req, res) => {
//   try {
//     let { playlist } = req;
//     const playlistUpdates = req.body;
//     playlist = extend(playlist, playlistUpdates);
//     playlist = await playlist.save();
//     playlist = await playlist
//       .populate({ path: "videos.video", populate: { path: "uploadedBy" } })
//       .execPopulate();
//     playlist.userId = undefined;
//     res.status(200).json({ response: playlist });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: "Something went wrong",
//       errorMessage: error.message,
//     });
//   }
// };

// const deletePlaylist = async (req, res) => {
//   try {
//     let { playlist } = req;
//     if (playlist.isDefault) {
//       throw new Error("Cannot delete default playlist");
//     }
//     await playlist.remove();
//     playlist.userId = undefined;
//     res.status(200).json({ response: playlist });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: "Something went wrong",
//       errorMessage: error.message,
//     });
//   }
// };

module.exports = {
  createOrGetPlaylists,
  createNewPlaylist,
  getPlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  removeVideoFromPlaylist,
  // updatePlaylist,
  // deletePlaylist,
  // addOrRemoveVideoFromPlaylist,
};

// const addOrRemoveVideoFromPlaylist = async (req, res) => {
//   try {
//     let playlist = req.body;
//     const videoUpdates = req.body;

//     const isVideoAlreadyAdded = playlist.videos.find(
//       (video) => video.videoId == videoUpdates.videoId
//     );

//     if (isVideoAlreadyAdded) {
//       let newvideos = playlist.videos.filter(
//         (video) => video.videoId !== videoUpdates.videoId
//       );
//       playlist.videos = newvideos;
//     } else {
//       playlist.videos.push(videoUpdates);
//     }

//     playlist = await playlist.save();
//     playlist = await playlist
//       .populate({ path: "videos.video", populate: { path: "uploadedBy" } })
//       .execPopulate();
//     // playlist.userId = undefined;
//     res.status(201).json({ response: playlist });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: "Something went wrong",
//       errorMessage: error.message,
//     });
//   }
// };
