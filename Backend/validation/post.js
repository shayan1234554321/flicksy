import yup from "yup";
import { checkUnknownValues } from "./helper.js";

export const createPostBodyValidation = yup
  .object()
  .shape({
    title: yup.string().required().min(1).max(100),
    videoURL: yup.string().required().min(5).max(200),
    thumbnail: yup.string().required().min(5).max(200),
    aiPromptUsed: yup.string().max(200),
  })
  .test(
    "custom-validation",
    "Custom validation failed",
    checkUnknownValues(["title", "videoURL", "thumbnail"], ["aiPromptUsed"])
  );

export const latestPostsQueryValidation = yup
  .object()
  .shape({
    skip: yup.string().min(1).max(50),
  })
  .test(
    "custom-validation",
    "Custom validation failed",
    checkUnknownValues([], ["skip"])
  );

export const incrementPostViewBodyValidation = yup
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

export const postTitleParamsValidation = yup
  .object()
  .shape({
    title: yup.string().required().min(1).max(100),
  })
  .test(
    "custom-validation",
    "Custom validation failed",
    checkUnknownValues(["title"])
  );

export const userPostsParamsValidation = yup
  .object()
  .shape({
    userId: yup
      .string()
      .trim()
      .matches(/^[0-9a-fA-F]{24}$/, "Invalid Id")
      .required("Id is required"),
  })
  .test(
    "custom-validation",
    "Custom validation failed",
    checkUnknownValues(["userId"])
  );
