import mongoose from "mongoose";

import validateAllowedFields from "../util/validateAllowedFields.js";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("users", userSchema);

export const validateUser = (userObject) => {
  const errorList = [];
  const allowedKeys = ["name", "email", "password"];

  const validatedKeysMessage = validateAllowedFields(userObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (!userObject.name?.trim()) {
    errorList.push("name is a required field");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!userObject.email?.trim()) {
    errorList.push("email is a required field");
  } else if (!emailRegex.test(userObject.email.trim())) {
    errorList.push("email format is invalid");
  }

  if (!userObject.password?.trim()) {
    errorList.push("password is a required field");
  }

  return errorList;
};

export default User;
