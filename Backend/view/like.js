import postModel from "../model/post.js";
import likeModel from "../model/like.js";

const likeDislikePost = async ({ body, user }) => {
  try {
    const post = await postModel.findById(body.postId);

    if (!post) {
      return { status: 404, data: { message: "Post not found" } };
    }

    const like = await likeModel.find({
      user: user._id,
      post: body.postId,
    });

    if (like.length === 0) {
      await likeModel.create({ user: user._id, post: body.postId });
      post.like = post.like + 1;
      await post.save();
    } else {
      await likeModel.deleteOne({ user: user._id, post: body.postId });
      post.like = post.like - 1;
      await post.save();
    }

    const allLikes = await likeModel.find({ post: body.postId }).select("user");

    return { status: 200, data: allLikes };
  } catch (error) {
    console.error(error);
    return { status: 500, data: { message: "Error Liking Post" } };
  }
};

const view = {
  likeDislikePost,
};

export default view;
