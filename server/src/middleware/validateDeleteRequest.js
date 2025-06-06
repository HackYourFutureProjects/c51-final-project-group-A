import { Types } from "mongoose";
import validateAllowedFields from "../util/validateAllowedFields.js";
import validationErrorMessage from "../util/validationErrorMessage.js";

// Middleware to validate Delete Account request
function validateDeleteRequest(req, res, next) {
  const deleteObject = req.body;
  const errorList = [];
  const allowedKeys = ["id", "password"];
  const validatedKeysMessage = validateAllowedFields(deleteObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  // Check if password is valid
  if (
    !deleteObject.password ||
    typeof deleteObject.password !== "string" ||
    deleteObject.password.trim() === ""
  ) {
    errorList.push("Password is a required field");
  }

  // Check if id is a valid ObjectId
  if (!Types.ObjectId.isValid(deleteObject.id)) {
    errorList.push("Invalid ID format");
  }

  if (errorList.length > 0) {
    return res.status(400).json({ error: validationErrorMessage(errorList) });
  }

  next();
}

export default validateDeleteRequest;
