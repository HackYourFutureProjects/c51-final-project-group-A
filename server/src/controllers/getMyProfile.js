import User from "../models/User.js";
import { logError } from "../util/logging.js";

const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id.toString())
      .populate("borrowedItems")
      .populate("ownedItems")
      .lean();

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      city: user.city,
      borrowedItems: user.borrowedItems,
      ownedItems: user.ownedItems,
    });
  } catch (err) {
    logError(err);
    res.status(500).json({ error: "Something went wrong." });
  }
};

export default getMyProfile;
