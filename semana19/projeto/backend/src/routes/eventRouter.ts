import express from "express";
import { EventController } from "../controller/EventController";

export const eventRouter = express.Router();

const eventController = new EventController();

eventRouter.post("/ticket", eventController.createTicket);
eventRouter.get("/ticket/all", eventController.getAllTickets);
eventRouter.post("/addPhoto", eventController.addPhoto);
eventRouter.post("/buy", eventController.buyTicket);
eventRouter.get("/userTickets", eventController.getTicketByUser);
eventRouter.get("/all", eventController.getAllEvents);
eventRouter.get("/:eventId", eventController.getEvent);