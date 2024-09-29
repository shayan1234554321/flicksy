import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    videoURL: { type: String, required: true },
    title: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    thumbnail: { type: String, required: true },
    aiPromptUsed: { type: String },
    view: { type: Number, default: 0 },
    like: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("post", schema);
export default model;
