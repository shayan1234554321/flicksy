import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "post", required: true },
  },
  {
    timestamps: true,
  }
);

schema.index({ user: 1  });
schema.index({ post: 1  });

const model = mongoose.model("like", schema);
export default model;
