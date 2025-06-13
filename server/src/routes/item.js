import express from "express";
import {
  getItems,
  getItemById,
  borrowItemController,
  addItem,
} from "../controllers/item.js";
import aggregateSearch from "../middleware/aggregateSearch.js";
import validateSearch from "../middleware/validateSearch.js";
import verifyToken from "../middleware/verifyToken.js";

const itemRouter = express.Router();

itemRouter.get("/", validateSearch, aggregateSearch, getItems);
itemRouter.get("/:id", getItemById);
itemRouter.put("/:id/borrow", borrowItemController);
itemRouter.post("/", verifyToken, addItem);

export default itemRouter;
