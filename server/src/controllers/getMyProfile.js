import { logError } from "../util/logging.js";

export const getMyProfile = async (req, res) => {
  try {
    const { _id, email, name } = req.user; // req.user comes from authUser middleware

    res.status(200).json({
      success: true,
      profile: {
        id: _id,
        email,
        name,
      },
    });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get profile, try again later",
    });
  }
};
