import { RandomStringGenerator, removeFile } from "../hooks/helper.js";
import { generateToken } from "../library/token.js";
import userModel from "../model/user.js";
import bcrypt from "bcrypt";

const signIn = async ({ body }) => {
  try {
    let user = await userModel.findOne({ email: body.email });

    if (!user) {
      return { status: 404, data: { message: "User not found" } };
    }

    // const match = true
    const match = await bcrypt.compare(body.password, user.password);

    if (!match) {
      return { status: 401, data: { message: "Invalid credentials" } };
    }

    user.tokenCode = RandomStringGenerator();
    await user.save();

    const token = generateToken(user._id, user.tokenCode);

    user = { ...user.toObject() };
    user.token = token;
    delete user.password;
    delete user.tokenCode;

    return { status: 200, data: { user, token } };
  } catch (error) {
    console.error(error);
    return { status: 500, data: { message: "Error Signing In" } };
  }
};

const signUp = async ({ body }) => {
  try {
    let existingUser = await userModel.findOne({ email: body.email });

    if (existingUser) {
      return { status: 409, data: { message: "Email already exists" } };
    }

    const password = await bcrypt.hash(body.password, 10);

    await userModel.create({
      name: body.name,
      email: body.email,
      password,
    });

    return { status: 200, data: null };
  } catch (error) {
    console.error(error);
    return { status: 500, data: { message: "Error Signing In" } };
  }
};

const updateProfilePic = async ({ body, user }) => {
  try {
    const filename = user.profilePic.split("/").pop();
    if (filename !== "default.png") {
      await removeFile(filename);
    }

    await userModel.findByIdAndUpdate(user._id, {
      profilePic: body.profilePic,
    });

    return { status: 200, data: null };
  } catch (error) {
    console.error(error);
    return { status: 500, data: { message: "Error Signing In" } };
  }
};

const logout = async ({ user }) => {
  try {
    await userModel.findByIdAndUpdate(user._id, {
      tokenCode: null,
    });

    return { status: 200, data: null };
  } catch (error) {
    console.error(error);
    return { status: 500, data: { message: "Error Signing In" } };
  }
};

const getUserById = async ({ params }) => {
  try {
    const user = await userModel.findById(params.id);

    if (!user) {
      return { status: 404, data: { message: "User not found" } };
    }

    return { status: 200, data: user.toObject() };
  } catch (error) {
    console.error(error);
    return { status: 500, data: { message: "Error Getting User" } };
  }
};

const view = {
  signIn,
  signUp,
  updateProfilePic,
  logout,
  getUserById,
};

export default view;
