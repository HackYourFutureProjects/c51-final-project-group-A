import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { logError } from "../util/logging.js";

// Middleware to authorize and authenticate User
const authUser = async (req, res, next) => {
  const authHeader = req.get("Authorization");

  try {
    if (!authHeader) {
      throw new Error("Missing Authorization header");
    }

    const [scheme, token] = authHeader.split(" ");
    if (!scheme || scheme !== "Bearer") {
      throw new Error("Malformed Authorization header");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!user.active) {
      return res.status(403).json({ error: "Account is disabled" });
    }

    req.user = user;
    next();
  } catch (err) {
    logError(err);
    return res.status(401).json({ error: "Unauthorized access" });
  }
};

export default authUser;
