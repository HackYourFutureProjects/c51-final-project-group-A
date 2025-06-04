// Middleware to validate Register input
// This middleware checks if the name, email, and password fields are present and valid in the request body
import validateAllowedFields from "../util/validateAllowedFields.js";

export function validateRegisterInput(req, res, next) {
  const userObject = req.body;
  const errorList = [];
  const allowedKeys = ["name", "email", "password"];
  const validatedKeysMessage = validateAllowedFields(userObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (!userObject.name?.trim()) {
    errorList.push("Name is a required field");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!userObject.email?.trim()) {
    errorList.push("Email is a required field");
  } else if (!emailRegex.test(userObject.email.trim())) {
    errorList.push("Email format is invalid");
  }

  if (!userObject.password?.trim()) {
    errorList.push("Password is a required field");
  }

  if (errorList.length > 0) {
    return res.status(400).json({ error: errorList });
  }

  next();
}
