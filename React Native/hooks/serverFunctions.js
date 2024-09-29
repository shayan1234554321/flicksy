import axios from "axios";
import API from "../utility/api";

export const getAllPosts = async (token) => {
  try {
    const response = await axios.get(API.post.latest, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return (await response.data) || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getLatestPosts = async (token) => {
  try {
    const response = await axios.get(API.post.mostLiked, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return (await response.data) || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createVideoPost = async (form, user) => {
  try {
    const title = form.title;
    const videoURL = await uploadAsset(form.video, user.token);
    const thumbnail = await uploadAsset(form.thumbnail, user.token);
    const aiPromptUsed = form.prompt || "";

    await axios.post(
      API.post.create,
      {
        title,
        videoURL,
        thumbnail,
        aiPromptUsed,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const uploadAsset = async (asset, token) => {
  try {
    const { mimeType, ...rest } = asset;
    const file = { type: mimeType, ...rest };
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(API.asset.upload, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.url;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserPosts = async (token, userId) => {
  try {
    const response = await axios.get(API.post.user(userId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return (await response.data) || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const signOut = async (token) => {
  try {
    await axios.get(API.user.logout, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateProfilePic = async (token, profilePic) => {
  try {
    await axios.post(
      API.user.updateProfilePic,
      { profilePic },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const searchPosts = async (token, title) => {
  try {
    const response = await axios.get(API.post.title(title), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return (await response.data) || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getUserById = async (token, userId) => {
  try {
    const response = await axios.get(API.user.getUserById(userId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const userLikedPosts = async (token) => {
  try {
    const response = await axios.get(API.post.liked, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const incrementView = async (token, postId) => {
  try {
    const response = await axios.post(
      API.post.view,
      { postId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const incrementLike = async (token, postId) => {
  try {
    const response = await axios.post(
      API.like.like,
      { postId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
