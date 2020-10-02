import express from "express";
import { ShowController } from "../controller/ShowController";

export const showRouter = express.Router();

const showController = new ShowController();

showRouter.put("/add", showController.addShow);
showRouter.get("/day", showController.getShowByDay);
showRouter.get("/:showId", showController.getShowById);