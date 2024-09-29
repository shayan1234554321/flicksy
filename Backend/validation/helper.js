import * as yup from "yup";

export const checkUnknownValues = (allowedKeys, optionalKeys = []) => (value) => {
  const unknownKeys = value ? Object.keys(value).filter(
    (key) => !allowedKeys.includes(key) && !optionalKeys.includes(key)
  ) : []

  if (unknownKeys.length > 0) {
    throw new yup.ValidationError(
      `Unknown properties: ${unknownKeys.join(", ")}`,
      value,
      "custom-validation"
    );
  }

  return true;
};