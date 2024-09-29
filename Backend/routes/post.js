import express from "express";
import postController from "../controller/post.js";
import { verifyTokenMiddleware } from "../library/token.js";

const router = express.Router();

router.post("/create", verifyTokenMiddleware, postController.createPost);

router.get("/latest", verifyTokenMiddleware, postController.latestPosts);
router.post("/view", verifyTokenMiddleware, postController.incrementPostView);
router.get("/mostLiked", verifyTokenMiddleware, postController.mostLikedPosts);
router.get("/title/:title", verifyTokenMiddleware, postController.postTitle);
router.get("/user/:userId", verifyTokenMiddleware, postController.userPosts);
router.get(
  "/liked",
  verifyTokenMiddleware,
  postController.userLikedPosts
);

export default router;
