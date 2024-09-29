import express from "express";
import likeController from "../controller/like.js";
import { verifyTokenMiddleware } from "../library/token.js";

const router = express.Router();

router.post("/", verifyTokenMiddleware, likeController.likeDislikePost);

export default router;
