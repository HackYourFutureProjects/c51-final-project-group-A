import express from "express";
import { loginUser } from "../controllers/loginUser.js";
import { registerUser } from "../controllers/registerUser.js";
import { validateRegisterInput } from "../middleware/validateRegisterInput.js";
import { validateLoginInput } from "../middleware/validateLoginInput.js";

const router = express.Router();

router.post("/register", validateRegisterInput, registerUser);
router.post("/login", validateLoginInput, loginUser);

export default router;
