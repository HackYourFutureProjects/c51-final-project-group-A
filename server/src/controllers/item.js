import Item from "../models/Item.js";
import { logError } from "../util/logging.js";

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

// Function that returns an aggregation pipeline based on the request queries
const filterSearch = (queries) => {
  const {
    category,
    condition,
    maxDuration,
    minDuration,
    availability,
    minPrice,
    maxPrice,
    sortBy,
    sortOrder,
    limit,
    page,
  } = queries;

  // Populate match stage with given/default values for filtering
  const matchStage = {};
  category && (matchStage.category = category);
  condition && (matchStage.condition = condition);
  availability && (matchStage.availability = availability);
  matchStage.borrowDuration = {
    $gte: minDuration ? parseInt(minDuration) : 0,
    $lte: maxDuration ? parseInt(maxDuration) : Infinity,
  };
  matchStage.price = {
    $gte: minPrice ? parseFloat(minPrice) : 0,
    $lte: maxPrice ? parseFloat(maxPrice) : Infinity,
  };

  // Sort results by the given query strings
  // On default sorts by creation time
  const sortStage =
    sortBy && sortOrder
      ? {
          [sortBy]: sortOrder === "desc" ? -1 : 1,
        }
      : {
          createdAt: -1,
        };

  // Provide pagination with limit and skip
  const limitStage = parseInt(limit);
  const skipStage = (parseInt(page) - 1) * limitStage;

  // Returns a total count of items for th
  return [
    { $match: matchStage },
    { $sort: sortStage },
    {
      $facet: {
        totalItems: [{ $count: "count" }],
        data: [{ $skip: skipStage }, { $limit: limitStage }],
      },
    },
  ];
};
