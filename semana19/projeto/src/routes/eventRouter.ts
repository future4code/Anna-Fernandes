import express from "express";
import { EventController } from "../controller/EventController";

export const eventRouter = express.Router();

const eventController = new EventController();

eventRouter.post("/ticket", eventController.createTicket);
eventRouter.post("/photo", eventController.addPhoto);
eventRouter.post("/buy", eventController.buyTicket);
eventRouter.get("/:event", eventController.getEvent);