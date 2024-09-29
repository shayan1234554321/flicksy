import express from "express";
import userRoute from "./user.js";
import assetRoute from "./asset.js";
import likeRoute from "./like.js";
import postRoute from "./post.js";

const router = express.Router();

router.use("/user", userRoute);
router.use("/asset", assetRoute);
router.use("/like", likeRoute);
router.use("/post", postRoute);

export default router;
