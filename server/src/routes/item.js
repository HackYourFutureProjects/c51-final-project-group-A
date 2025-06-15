import express from "express";
import aggregateSearch from "../middleware/aggregateSearch.js";
import validateSearch from "../middleware/validateSearch.js";
import authUser from "../middleware/authUser.js";
import addItem from "../controllers/addItem.js";
import borrowItem from "../controllers/borrowItem.js";
import getItemById from "../controllers/getItemById.js";
import getItems from "../controllers/getItems.js";

const itemRouter = express.Router();

itemRouter.get("/", validateSearch, aggregateSearch, getItems);
itemRouter.get("/:id", getItemById);
itemRouter.put("/:id/borrow", authUser, borrowItem);
itemRouter.post("/", authUser, addItem);

export default itemRouter;
