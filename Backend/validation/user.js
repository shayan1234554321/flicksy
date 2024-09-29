import yup from "yup";
import { checkUnknownValues } from "./helper.js";

export const signInBodyValidation = yup
  .object()
  .shape({
    email: yup.string().required().min(3).email().max(100),
    password: yup.string().required().min(1).max(100),
  })
  .test(
    "custom-validation",
    "Custom validation failed",
    checkUnknownValues(["email", "password"])
  );

export const signUpBodyValidation = yup
  .object()
  .shape({
    name: yup.string().required().min(2).max(100),
    email: yup.string().required().min(3).email().max(100),
    password: yup.string().required().min(1).max(100),
  })
  .test(
    "custom-validation",
    "Custom validation failed",
    checkUnknownValues(["name","email", "password"])
  );

export const updateProfilePicBodyValidation = yup
  .object()
  .shape({
    profilePic: yup.string().required().min(3).max(100),
  })
  .test(
    "custom-validation",
    "Custom validation failed",
    checkUnknownValues(["profilePic"])
  );

export const getUserByIdParamsValidation = yup
  .object()
  .shape({
    id: yup
      .string()
      .trim()
      .matches(/^[0-9a-fA-F]{24}$/, "Invalid Id")
      .required("Id is required"),
  })
  .test(
    "custom-validation",
    "Custom validation failed",
    checkUnknownValues(["id"])
  );
