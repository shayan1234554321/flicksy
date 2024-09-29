import * as yup from "yup";
import { likeDislikePostBodyValidation } from "../validation/like.js";
import view from "../view/like.js";

const likeDislikePost = async (req, res) => {
  const { body, user } = req;
  try {
    await likeDislikePostBodyValidation.validate(body);

    const result = await view.likeDislikePost({ body, user });
    res
      .status(result.status || 200)
      .set("Content-Type", result.contentType || "application/json")
      .send(result.data || null);
  } catch (validationError) {
    if (validationError instanceof yup.ValidationError) {
      res.status(400).json({ error: validationError.message });
    } else {
      res.status(500).send("Error getting user");
    }
  }
};

const controller = {
  likeDislikePost,
};

export default controller;
