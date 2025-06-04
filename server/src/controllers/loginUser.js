import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Login Controller
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    //  Check if user exists
    const user = await User.findOne({ email: email.trim() });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    // Ensure password is provided
    if (!password || typeof password !== "string" || password.trim() === "") {
      return res.status(400).json({ error: "Password is required" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    //  Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    //  Return token and user info
    return res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
