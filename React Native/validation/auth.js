import * as yup from "yup";

export const LoginSchema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .email("Must be type email")
      .max(50)
      .required("Email is required"),
    password: yup.string().min(5).max(50).required("Password is required"),
  });

export const SignupSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(2)
      .max(50)
      .required("Email is required"),
    email: yup
      .string()
      .trim()
      .email("Must be type email")
      .max(50)
      .required("Email is required"),
    password: yup.string().min(5).max(50).required("Password is required"),
  });