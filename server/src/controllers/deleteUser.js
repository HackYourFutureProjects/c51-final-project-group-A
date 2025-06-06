import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const deleteUser = async (req, res) => {
  const { email, password } = req.body;
  const authHeader = req.get("Authorization");

  // Ensure authorization header is provided
  if (!authHeader) {
    return res.status(401).json({ error: "Missing Authorization header" });
  }

  // Ensure authorization header has a valid format
  const [scheme, token] = authHeader.trim().split(" ");
  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "Authorization header malformed" });
  }

  try {
    // Ensure password is provided
    if (!password || typeof password !== "string" || password.trim() === "") {
      return res.status(400).json({ error: "Password is required" });
    }

    //  Check if user exists
    const user = await User.findOne({ email: email.trim() });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (user._id.toString() !== decoded.id) {
      return res.status(401).json({ error: "User and token mismatch" });
    }

    // Soft delete user
    user.active = false;
    await user.save();
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export default deleteUser;
