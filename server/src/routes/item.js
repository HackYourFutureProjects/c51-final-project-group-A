import express from "express";
import { getItems, getItemById } from "../controllers/item.js";

const itemRouter = express.Router();

itemRouter.get("/", getItems);
itemRouter.get("/:id", getItemById);

export default itemRouter;
