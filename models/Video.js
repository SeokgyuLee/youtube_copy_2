import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  videoFile: {
    type: String,
    required: "fileUrl is required"
  },
  title: {
    type: String,
    required: "Title is required"
  },
  description: String,
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "mongComment"
    }
  ]
});

const model = mongoose.model("mongVideo", VideoSchema);

export default model;
