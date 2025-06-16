import Item from "../models/Item.js";
import { logError } from "../util/logging.js";
import mongoose from "mongoose";

const getItemById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, msg: "Invalid item ID Format" });
  }

  try {
    const item = await Item.findById(id).populate("ownerId");
    if (!item) {
      return res.status(404).json({ success: false, msg: "Item not found" });
    }

    // Remove unused information
    // eslint-disable-next-line no-unused-vars
    const { _id, __v, visibility, createdAt, ...safeItem } = item._doc;

    return res.status(200).json({
      success: true,
      result: {
        ...safeItem,
        ownerId: {
          firstName: safeItem.ownerId.firstName,
          lastName: safeItem.ownerId.lastName,
          city: safeItem.ownerId.city,
          email: safeItem.ownerId.email,
          phone: safeItem.ownerId.phone,
        },
      },
    });
  } catch (error) {
    logError(error);
    return res.status(500).json({ success: false, msg: "Server error" }); // only shows generic message to user
  }
};

export default getItemById;
