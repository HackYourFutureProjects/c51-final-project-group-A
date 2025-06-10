import express from "express";
import {
  getItems,
  getItemById,
  borrowItemController,
} from "../controllers/item.js";
import aggregateSearch from "../middleware/aggregateSearch.js";
import validateSearch from "../middleware/validateSearch.js";

const itemRouter = express.Router();

itemRouter.get("/", validateSearch, aggregateSearch, getItems);
itemRouter.get("/:id", getItemById);
itemRouter.put("/:id/borrow", borrowItemController);

export default itemRouter;
