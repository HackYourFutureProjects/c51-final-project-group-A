// Middleware to validate login input
// This middleware checks if the email and password fields are present and valid in the request body
export function validateLoginInput(req, res, next) {
  const { email, password } = req.body;
  const errorList = [];

  if (!email || typeof email !== "string" || email.trim() === "") {
    errorList.push("Email is required");
  }

  if (!password || typeof password !== "string" || password.trim() === "") {
    errorList.push("Password is required");
  }

  if (errorList.length > 0) {
    return res.status(400).json({ error: errorList });
  }

  return next();
}
