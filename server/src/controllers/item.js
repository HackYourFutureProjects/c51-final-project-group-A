import Item from "../models/Item.js";
import { logError, logInfo } from "../util/logging.js";

export const getItems = async (req, res) => {
  const filters = filterSearch(req.query);

  try {
    const items = await Item.aggregate(filters);
    res.status(200).json({ success: true, result: items });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get items, try again later" });
  }
};

const filterSearch = (queries) => {
  const { category, condition, maxDuration, minDuration, availability, minPrice, maxPrice, sortBy, sortOrder, limit, page } = queries;

  const matchStage = {};
  category && (matchStage.category = category);
  condition && (matchStage.condition = condition);
  availability && (matchStage.availability = availability);
  matchStage.borrowDuration = {
    $gte: minDuration ? parseFloat(minDuration) : 0,
    $lte: maxDuration ? parseFloat(maxDuration) : Infinity
  };
  matchStage.price = {
    $gte: minPrice ? parseFloat(minPrice) : 0,
    $lte: maxPrice ? parseFloat(maxPrice) : Infinity
  };
  logInfo(matchStage, "matchStage")

  const sortStage = (sortBy && sortOrder) ? {
    [sortBy]: (sortOrder === "desc") ? -1 : 1
  } : {
    createdAt: -1
  };
  logInfo(sortStage, "sortStage")
  const limitStage = parseInt(limit);
  logInfo(limitStage, "limitStage")
  const skipStage = (parseInt(page) - 1) * limitStage;
  logInfo(skipStage, "skipStage")
  return [
    { $match: matchStage },
    { $sort: sortStage },
    { $skip: skipStage },
    { $limit: limitStage }
  ];
}
