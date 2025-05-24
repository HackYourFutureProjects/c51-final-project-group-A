import Item from "../models/Item.js";
import { logError } from "../util/logging.js";

export const getItems = async (req, res) => {
  try {
    const limit = parseInt(req.query?.limit) || 10;
    const page = parseInt(req.query?.page) || 1;
    const offset = (page - 1) * limit;

    const items = await Item.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(offset);

    res.status(200).json({ success: true, result: items });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get items, try again later" });
  }
};
