import * as yup from "yup";
import view from "../view/user.js";
import {
  getUserByIdParamsValidation,
  signInBodyValidation,
  signUpBodyValidation,
  updateProfilePicBodyValidation,
} from "../validation/user.js";

const signIn = async (req, res) => {
  const { body } = req;
  try {
    await signInBodyValidation.validate(body);

    const result = await view.signIn({ body });
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

const signUp = async (req, res) => {
  const { body } = req;
  try {
    await signUpBodyValidation.validate(body);

    const result = await view.signUp({ body });
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

const updateProfilePic = async (req, res) => {
  const { body, user } = req;
  try {
    await updateProfilePicBodyValidation.validate(body);

    const result = await view.updateProfilePic({ body, user });
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

const logout = async (req, res) => {
  const { user } = req;
  try {
    const result = await view.logout({ user });
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

const getUserByToken = async (req, res) => {
  const { user } = req;
  let finalUser = user

  delete finalUser.password;
  delete finalUser.tokenCode;

  try {
    res.status(200).send(finalUser);
  } catch (validationError) {
    res.status(500).send("Error getting user");
  }
};

const getUserById = async (req, res) => {
  const { params } = req;
  try {
    await getUserByIdParamsValidation.validate(params);

    const result = await view.getUserById({ params });
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
  signIn,
  signUp,
  updateProfilePic,
  logout,
  getUserByToken,
  getUserById,
};

export default controller;
