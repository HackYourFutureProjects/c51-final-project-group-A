import bcrypt from "bcrypt";
import { logError } from "../util/logging.js";

const deleteUser = async (req, res) => {
  const { password } = req.body;
  const user = req.user;

  try {
    // Check if password is correct
    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Soft delete user
    user.active = false;
    await user.save();
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    logError(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default deleteUser;
