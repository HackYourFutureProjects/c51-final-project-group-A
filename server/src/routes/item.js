import express from "express";
import { getItems, getItemById } from "../controllers/item.js";
import aggregateSearch from "../middleware/aggregateSearch.js";
import validateSearch from "../middleware/validateSearch.js";

const itemRouter = express.Router();

itemRouter.get("/", validateSearch, aggregateSearch, getItems);
itemRouter.get("/:id", getItemById);

export default itemRouter;
