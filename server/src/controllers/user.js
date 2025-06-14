import User, { validateUser } from "../models/User.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, result: users });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get users, try again later" });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = req.body?.user;

    if (typeof user !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'user' object. Received: ${JSON.stringify(
          user,
        )}`,
      });

      return;
    }

    const errorList = validateUser(user);

    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    } else {
      const newUser = await User.create(user);

      res.status(201).json({ success: true, user: newUser });
    }
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to create user, try again later" });
  }
};

export const forgotPasswordController = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, msg: "Email is required" });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, msg: "User with this email not found" });
    }

    // Here, normally we generate a reset token and send an email.
    // But for now, just success response.

    return res.status(200).json({
      success: true,
      msg: "Password reset link sent (simulated)",
    });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to process forgot password request, try again later",
    });
  }
};
