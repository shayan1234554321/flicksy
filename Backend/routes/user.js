import express from "express";
import userController from "../controller/user.js";
import { verifyTokenMiddleware } from "../library/token.js";

const router = express.Router();

router.post("/signin", userController.signIn);
router.post("/signup", userController.signUp);
router.post(
  "/updateProfilePic",
  verifyTokenMiddleware,
  userController.updateProfilePic
);
router.post("/logout", verifyTokenMiddleware, userController.logout);
router.get(
  "/getUserByToken",
  verifyTokenMiddleware,
  userController.getUserByToken
);
router.get(
  "/getUserById/:id",
  verifyTokenMiddleware,
  userController.getUserById
);

export default router;
