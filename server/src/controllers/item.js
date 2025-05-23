import Item from "../models/Item.js";
import { logError } from "../util/logging.js";

export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json({ success: true, result: items });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get items, try again later" });
  }
};
