import jwt from "jsonwebtoken";

// Middleware to verify JWT token and attach user info to request
// This middleware checks for the presence of a token in the Authorization header,
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return res.status(401).json({ success: false, msg: "No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ success: false, msg: "Invalid token." });
  }
};

export default verifyToken;
