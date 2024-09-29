import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "/assets/default.png" },
    tokenCode: { type: String },
  },
  {
    timestamps: true,
  }
);

schema.index({ email: 1 });

const model = mongoose.model("user", schema);
export default model;
