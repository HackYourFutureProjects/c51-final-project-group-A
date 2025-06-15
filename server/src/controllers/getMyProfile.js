import User from "../models/User.js";
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
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
      borrowedItems: user.borrowedItems,
      ownedItems: user.ownedItems,
    });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong." });
  }
};
