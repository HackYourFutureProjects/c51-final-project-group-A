import mongoose from "mongoose";
import Item from "../models/Item.js";
import { logError } from "../util/logging.js";

const borrowItem = async (req, res) => {
  const { id } = req.params;
  const { borrowedUntil } = req.body;
  const user = req.user;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, msg: "Invalid item ID Format" });
  }

  try {
    // Check if item exists and is available
    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ success: false, msg: "Item not found" });
    }

    if (!item.availability) {
      return res.status(400).json({
        success: false,
        msg: "Item is currently not available for borrowing",
      });
    }

    // Update item availability and borrowedUntil
    item.availability = false;
    item.borrowedUntil = borrowedUntil;

    const updatedItem = await item.save();

    res.status(200).json({
      success: true,
      msg: "Item borrowed successfully",
      result: updatedItem,
    });

    // Add borrowed item id to borrowedItems field in User object
    user.borrowedItems.push(updatedItem._id);
    await user.save();
  } catch (error) {
    logError(error);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export default borrowItem;
