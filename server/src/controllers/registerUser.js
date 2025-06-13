import bcrypt from "bcrypt";
import User from "../models/User.js";

// Register Controller
export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: email.trim() });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    //  Hash password
    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    // Create new user
    const newUser = new User({
      email: email.trim(),
      password: hashedPassword,
    });

    //  Save to database
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
