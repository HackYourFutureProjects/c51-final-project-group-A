import express from "express";
import { getItems } from "../controllers/item.js";

const itemRouter = express.Router();

itemRouter.get("/", getItems);

export default itemRouter;
