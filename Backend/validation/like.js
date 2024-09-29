import yup from "yup";
import { checkUnknownValues } from "./helper.js";

export const likeDislikePostBodyValidation = yup
  .object()
  .shape({
    postId: yup
      .string()
      .trim()
      .matches(/^[0-9a-fA-F]{24}$/, "Invalid Id")
      .required("Id is required"),
  })
  .test(
    "custom-validation",
    "Custom validation failed",
    checkUnknownValues(["postId"])
  );
