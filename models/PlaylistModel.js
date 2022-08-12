const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const PlaylistSchema = new mongoose.Schema(
  {
    belongingUser: {
      type: ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    thumbnail: {
      type: String,
      default:
        "https://i.postimg.cc/TwsBcV04/jess-bailey-l3-N9-Q27z-ULw-unsplash.jpg",
    },

    type: {
      type: String,
      enum: ["liked", "watchlater", "history", "custom"],
      default: "custom",
    },

    videos: [
      {
        video: { type: ObjectId, ref: "Video" },
        date: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Playlist = mongoose.model("Playlist", PlaylistSchema);
module.exports = Playlist;
