import express from "express";
import { loginUser } from "../controllers/loginUser.js";
import { registerUser } from "../controllers/registerUser.js";
import { validateRegisterInput } from "../middleware/validateRegisterInput.js";
import { validateLoginInput } from "../middleware/validateLoginInput.js";
import deleteUser from "../controllers/deleteUser.js";
import validateDeleteRequest from "../middleware/validateDeleteRequest.js";
import authUser from "../middleware/authUser.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", validateRegisterInput, registerUser);
router.post("/login", validateLoginInput, loginUser);
router.delete("/delete", validateDeleteRequest, authUser, deleteUser);
router.get("/me", authUser, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("borrowedItems")
      .populate("ownedItems");
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      borrowedItems: user.borrowedItems,
      ownedItems: user.ownedItems,
    });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong." });
  }
});

export default router;
