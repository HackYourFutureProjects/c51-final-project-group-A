import express from "express";
import {
  getItems,
  getItemById,
  borrowItemController,
} from "../controllers/item.js";

const itemRouter = express.Router();

itemRouter.get("/", getItems);
itemRouter.get("/:id", getItemById);
itemRouter.put("/:id/borrow", borrowItemController);

export default itemRouter;
