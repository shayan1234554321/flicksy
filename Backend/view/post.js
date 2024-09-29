import postModel from "../model/post.js";
import likeModel from "../model/like.js";
import mongoose from "mongoose";

const createPost = async ({ body, user }) => {
  try {
    const post = await postModel.create({
      videoURL: body.videoURL,
      title: body.title,
      user: user._id,
      thumbnail: body.thumbnail,
      aiPromptUsed: body.aiPromptUsed || null,
    });

    return { status: 200, data: post };
  } catch (error) {
    console.error(error);
    return { status: 500, data: { message: "Error Liking Post" } };
  }
};

const latestPosts = async ({ query, user }) => {
  try {
    const { skip = 0 } = query;
    const limit = 5;

    const skipValue = Math.max(0, parseInt(skip, 10) || 0);

    let posts = await postModel
      .find()
      .sort({
        createdAt: -1,
      })
      .populate("user", "-password -tokenSecret")
      .skip(skipValue);

    const postIds = posts.map((post) => post._id);
    if (posts.length > 0) {
      let likes = await likeModel.find({ post: { $in: postIds } });
      posts = posts.map((post) => {
        const like = likes.find(
          (like) =>
            like.post.toString() === post._id.toString() &&
            like.user.toString() === user._id.toString()
        );
        return { ...post.toObject(), liked: like ? true : false };
      });
    }

    return { status: 200, data: posts };
  } catch (error) {
    console.error(error);
    return { status: 500, data: { message: "Error Liking Post" } };
  }
};

const incrementPostView = async ({ body }) => {
  try {
    await postModel.findByIdAndUpdate(body.postId, {
      $inc: { view: 1 },
    });

    return { status: 200, data: null };
  } catch (error) {
    console.error(error);
    return { status: 500, data: { message: "Error Incrementing View" } };
  }
};

const mostLikedPosts = async () => {
  try {
    const posts = await postModel
      .find()
      .populate("user", "-password -tokenSecret")
      .sort({ like: -1 })
      .limit(5);

    return { status: 200, data: posts };
  } catch (error) {
    console.error(error);
    return { status: 500, data: { message: "Error Most Liked Post" } };
  }
};

const postTitle = async ({ params, user }) => {
  try {
    let posts = await postModel
      .find({
        title: { $regex: params.title, $options: "i" },
      })
      .limit(5)
      .populate("user", "-password -tokenSecret");

    const postIds = posts.map((post) => post._id);
    if (posts.length > 0) {
      let likes = await likeModel.find({ post: { $in: postIds } });
      posts = posts.map((post) => {
        const like = likes.find(
          (like) =>
            like.post.toString() === post._id.toString() &&
            like.user.toString() === user._id.toString()
        );
        return { ...post.toObject(), liked: like ? true : false };
      });
    }

    return { status: 200, data: posts };
  } catch (error) {
    console.error(error);
    return { status: 500, data: { message: "Error Getting Posts" } };
  }
};

const userPosts = async ({ params, user }) => {
  try {
    let posts = await postModel
      .find({
        user: new mongoose.Types.ObjectId(params.userId),
      })
      .populate("user", "-password -tokenSecret");

    const postIds = posts.map((post) => post._id);
    if (posts.length > 0) {
      let likes = await likeModel.find({ post: { $in: postIds } });
      posts = posts.map((post) => {
        const like = likes.find(
          (like) =>
            like.post.toString() === post._id.toString() &&
            like.user.toString() === user._id.toString()
        );
        return { ...post.toObject(), liked: like ? true : false };
      });
    }

    return { status: 200, data: posts };
  } catch (error) {
    console.error(error);
    return { status: 500, data: { message: "Error Getting Posts" } };
  }
};

const userLikedPosts = async ({ user }) => {
  try {
    const likes = await likeModel
      .find({
        user: user._id.toString(),
      })
      .populate({
        path: "post",
        populate: {
          path: "user",
          select: "-password -tokenSecret",
        },
      });

    let posts = likes.map((like) => like.post);
    posts = posts.map((post) => {
      return { ...post.toObject(), liked: true };
    });

    return { status: 200, data: posts };
  } catch (error) {
    console.error(error);
    return { status: 500, data: { message: "Error Getting Posts" } };
  }
};

const view = {
  createPost,
  latestPosts,
  incrementPostView,
  mostLikedPosts,
  postTitle,
  userPosts,
  userLikedPosts,
};

export default view;
