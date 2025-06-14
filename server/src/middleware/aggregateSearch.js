// Middleware to pass an aggregation pipeline based on the request queries
const aggregateSearch = (req, res, next) => {
  // Destructure queries
  const queries = req.query;
  const {
    search,
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

  // Populate match stage with given/default values for filters and search string
  const matchStage = {};
  if (search) {
    const escapeRegExp = (string) =>
      string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escape special regex characters
    matchStage.title = { $regex: escapeRegExp(search), $options: "i" }; // case-insensitive match
  }
  category && (matchStage.category = category);
  condition && (matchStage.condition = condition);
  availability === "true" && (matchStage.availability = true);
  matchStage.borrowDuration = {
    $gte: minDuration ? parseInt(minDuration) : 0,
    $lte: maxDuration ? parseInt(maxDuration) : Number.MAX_SAFE_INTEGER,
  };
  matchStage.price = {
    $gte: minPrice ? parseFloat(minPrice) : 0,
    $lte: maxPrice ? parseFloat(maxPrice) : Number.MAX_SAFE_INTEGER,
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

  // Save aggregation pipeline
  req.aggr = [
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

  next();
};

export default aggregateSearch;
