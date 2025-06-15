import express from "express";
import { loginUser } from "../controllers/loginUser.js";
import { registerUser } from "../controllers/registerUser.js";
import { validateRegisterInput } from "../middleware/validateRegisterInput.js";
import { validateLoginInput } from "../middleware/validateLoginInput.js";
import deleteUser from "../controllers/deleteUser.js";
import authUser from "../middleware/authUser.js";

const authRouter = express.Router();

authRouter.post("/register", validateRegisterInput, registerUser);
authRouter.post("/login", validateLoginInput, loginUser);
authRouter.delete("/delete", authUser, deleteUser);

export default authRouter;
