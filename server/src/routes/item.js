import express from "express";
import { getItems, getItemById, getItemImages } from "../controllers/item.js";

const itemRouter = express.Router();

itemRouter.get("/", getItems);
itemRouter.get("/:id", getItemById);
itemRouter.get("/:id/images", getItemImages);

export default itemRouter;
