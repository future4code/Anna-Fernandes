import express from "express";
import { ShowController } from "../controller/ShowController";

export const showRouter = express.Router();

const showController = new ShowController();

showRouter.post("/add", showController.addShow);
showRouter.get("/weekday", showController.getShowByWeekDay);
showRouter.get("/:showId", showController.getShowById);