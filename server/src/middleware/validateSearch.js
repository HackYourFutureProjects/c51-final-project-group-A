import validateAllowedFields from "../util/validateAllowedFields.js";
import validationErrorMessage from "../util/validationErrorMessage.js";

// Middleware to validate item search request
function validateSearch(req, res, next) {
  const queries = req.query;
  const errorList = [];
  const allowedKeys = [
    "search",
    "category",
    "condition",
    "maxDuration",
    "minDuration",
    "availability",
    "minPrice",
    "maxPrice",
    "sortBy",
    "sortOrder",
    "limit",
    "page",
  ];
  const validatedKeysMessage = validateAllowedFields(queries, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  // Check if search text is valid
  if (queries.search && queries.search.trim() === "") {
    errorList.push("Invalid search text");
  }

  // Check if category is valid
  const allowedCategories = [
    "Electronics",
    "Tools",
    "Transportation",
    "Gaming",
    "Books",
    "Media",
    "Clothing",
    "Musical Instruments",
  ];
  if (queries.category && !allowedCategories.includes(queries.category)) {
    errorList.push("Invalid category parameter");
  }

  // Check if condition is valid
  const allowedConditions = ["Excellent", "Good", "Fair"];
  if (queries.condition && !allowedConditions.includes(queries.condition)) {
    errorList.push("Invalid condition parameter");
  }

  // Check if availability is valid
  if (queries.availability && queries.availability !== "true") {
    errorList.push("Invalid availability parameter");
  }

  // Check if max && min filters are valid
  const minMaxParams = ["minPrice", "maxPrice", "minDuration", "maxDuration"];
  minMaxParams.forEach((param) => {
    if (
      (queries[param] && isNaN(Number(queries[param]))) ||
      Number(queries[param]) < 0
    ) {
      errorList.push(`Invalid ${param} parameter`);
    }
  });

  // Check if sortOrder is valid
  const allowedSortOrder = ["desc", "asc"];
  if (queries.sortOrder && !allowedSortOrder.includes(queries.sortOrder)) {
    errorList.push("Invalid sortOrder parameter");
  }

  // Check if sortBy is valid
  const allowedSortBy = ["createdAt", "price", "duration", "averageRating"];
  if (queries.sortBy && !allowedSortBy.includes(queries.sortBy)) {
    errorList.push("Invalid sortBy parameter");
  }

  // Check if limit is valid
  const allowedLimit = ["5", "10", "15", "20"];
  if (queries.limit && !allowedLimit.includes(queries.limit)) {
    errorList.push("Invalid limit parameter");
  }

  // Check if page is valid
  if (
    (queries.page && isNaN(Number(queries.page))) ||
    Number(queries.page) < 1
  ) {
    errorList.push("Invalid page parameter");
  }

  if (errorList.length > 0) {
    return res.status(400).json({ error: validationErrorMessage(errorList) });
  }

  next();
}

export default validateSearch;
