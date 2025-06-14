import express from "express";
import { loginUser } from "../controllers/loginUser.js";
import { registerUser } from "../controllers/registerUser.js";
import { validateRegisterInput } from "../middleware/validateRegisterInput.js";
import { validateLoginInput } from "../middleware/validateLoginInput.js";
import deleteUser from "../controllers/deleteUser.js";
import validateDeleteRequest from "../middleware/validateDeleteRequest.js";
import authUser from "../middleware/authUser.js";
import { forgotPasswordController } from "../controllers/user.js";

const router = express.Router();

router.post("/register", validateRegisterInput, registerUser);
router.post("/login", validateLoginInput, loginUser);
router.delete("/delete", validateDeleteRequest, authUser, deleteUser);
router.post("/forgot-password", forgotPasswordController);

export default router;
