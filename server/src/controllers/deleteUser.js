import { logError } from "../util/logging.js";

const deleteUser = async (req, res) => {
  const user = req.user;

  try {
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
