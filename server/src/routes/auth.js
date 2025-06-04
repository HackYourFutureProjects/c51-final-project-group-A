import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { validateUser } from "../models/User.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // 1. Check if all fields are provided
  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // 2. Validate allowed fields (e.g., no extra keys)
  const validationErrors = validateUser(req.body);
  if (validationErrors.length > 0) {
    return res.status(400).json({ error: validationErrors });
  }

  try {
    // 3. Check if user already exists
    const existingUser = await User.findOne({ email: email.trim() });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // 4. Hash the password
    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    // 5. Save new user to database
    const newUser = new User({
      name: name.trim(),
      email: email.trim(),
      password: hashedPassword,
    });
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email?.trim() || !password?.trim()) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // 1. Find user by email
    const user = await User.findOne({ email: email.trim() });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // 2. Compare passwords
    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // 3. Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

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
});

export default router;
