import Item from "../models/Item.js";
import { logError } from "../util/logging.js";

const getItems = async (req, res) => {
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

export default getItems;
