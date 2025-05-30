import Item from "../models/Item.js";
import { logError } from "../util/logging.js";
import mongoose from "mongoose";

export const getItems = async (req, res) => {
  const filters = filterSearch(req.query);

  try {
    const response = await Item.aggregate(filters);
    res.status(200).json({
      success: true,
      pagination: response[0].pagination,
      result: response[0].data,
    });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get items, try again later" });
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
/*
  Returns an aggregation pipeline based on the request queries
  Queries that have fallback default values [
    limit=10, 
    page=1, 
    minDuration=0, 
    maxDuration=Infinite, 
    minPrice=0, 
    maxPrice=Infinite
  ]
  Optional queries [
    category=["Electronics", "Home Appliances", "Vehicles"],
    condition=["Excellent", "Good", "Fair"],
    availability=[true, false]
  ]
*/
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
  availability === "true" && (matchStage.availability = true);
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
  const limitStage = parseInt(limit) || 10;
  const currentPage = parseInt(page) || 1;
  const skipStage = (currentPage - 1) * limitStage;

  // Returns aggregation pipeline with pagination
  return [
    { $match: matchStage },
    { $sort: sortStage },
    {
      $facet: {
        pagination: [
          { $count: "totalItems" },
          {
            $addFields: {
              currentPage,
              totalPages: { $ceil: { $divide: ["$totalItems", limitStage] } },
            },
          },
        ],
        data: [{ $skip: skipStage }, { $limit: limitStage }],
      },
    },
  ];
};
