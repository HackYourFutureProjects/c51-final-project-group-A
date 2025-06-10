import Item from "../models/Item.js";
import { logError } from "../util/logging.js";
import mongoose from "mongoose";

export const getItems = async (req, res) => {
  const filters = req.aggr;
  try {
    const response = await Item.aggregate(filters);

    if (response[0].data.length <= 0) {
      return res.status(400).json({ success: false, msg: "No items found." });
    }

    res.status(200).json({
      success: true,
      pagination: response[0].pagination,
      result: response[0].data,
    });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: error.message || "Unable to get items, try again later.",
    });
  }
};

export const getItemById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, msg: "Invalid item ID Format" });
  }

  try {
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ success: false, msg: "Item not found" });
    }

    return res.status(200).json({ success: true, result: item });
  } catch (error) {
    logError(error);
    return res.status(500).json({ success: false, msg: "Server error" }); // only shows generic message to user
  }
};
export const borrowItemController = async (req, res) => {
  const { id } = req.params;
  const { borrowedUntil } = req.body;

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
  } catch (error) {
    logError(error);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};
