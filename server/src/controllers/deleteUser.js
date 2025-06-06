import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const deleteUser = async (req, res) => {
  const { email, password, token } = req.body;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: email.trim() });

    //  Check if user exists
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Check if token and user matches
    if (user._id !== decoded._id) {
      return res.status(401).json({ error: "User and token mismatch" });
    }

    // Ensure password is provided
    if (!password || typeof password !== "string" || password.trim() === "") {
      return res.status(400).json({ error: "Password is required" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export default deleteUser;
