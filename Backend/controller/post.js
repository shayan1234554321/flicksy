import * as yup from "yup";
import {
  createPostBodyValidation,
  incrementPostViewBodyValidation,
  latestPostsQueryValidation,
  postTitleParamsValidation,
  userPostsParamsValidation,
} from "../validation/post.js";
import view from "../view/post.js";

const createPost = async (req, res) => {
  const { body, user } = req;
  try {
    await createPostBodyValidation.validate(body);

    const result = await view.createPost({ body, user });
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

const latestPosts = async (req, res) => {
  const { query, user } = req;
  try {
    await latestPostsQueryValidation.validate(query);

    const result = await view.latestPosts({ query, user });
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

const incrementPostView = async (req, res) => {
  const { body } = req;
  try {
    await incrementPostViewBodyValidation.validate(body);

    const result = await view.incrementPostView({ body });
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

const mostLikedPosts = async (req, res) => {
  try {
    const result = await view.mostLikedPosts();
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

const postTitle = async (req, res) => {
  const { params, user } = req;

  try {
    await postTitleParamsValidation.validate(params);

    const result = await view.postTitle({ params, user });
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

const userPosts = async (req, res) => {
  const { params, user } = req;

  try {
    await userPostsParamsValidation.validate(params);

    const result = await view.userPosts({ params, user });
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

const userLikedPosts = async (req, res) => {
  const { user } = req;

  try {
    const result = await view.userLikedPosts({ user });
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
  createPost,
  latestPosts,
  incrementPostView,
  mostLikedPosts,
  postTitle,
  userPosts,
  userLikedPosts,
};

export default controller;
